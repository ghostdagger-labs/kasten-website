import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { extname, resolve, sep } from 'node:path'

const publicRoot = fileURLToPath(new URL('../public/', import.meta.url))
const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))
const headers = Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key, value]))
const port = Number(process.env.PORT ?? 3340)
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be between 1 and 65535.')
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' }

const server = createServer(async (req, res) => {
  const send = (status, body, contentType = 'text/plain; charset=utf-8', extra = {}) => {
    res.writeHead(status, { ...headers, 'Content-Type': contentType, 'Cache-Control': 'no-store', ...extra })
    res.end(req.method === 'HEAD' ? undefined : body)
  }
  if (!['GET', 'HEAD'].includes(req.method)) return send(405, 'Method not allowed', undefined, { Allow: 'GET, HEAD' })
  try {
    const url = new URL(req.url, 'http://localhost')
    const pathname = decodeURIComponent(url.pathname)
    if (pathname.includes('\0') || pathname.includes('\\') || pathname.split('/').some(part => part.startsWith('.'))) return send(400, 'Invalid path')
    let clean = pathname
    if (pathname.endsWith('/index.html')) clean = pathname.slice(0, -10)
    else if (pathname.endsWith('.html')) clean = pathname.slice(0, -5)
    if (clean.length > 1) clean = clean.replace(/\/+$/, '')
    if (clean !== pathname) return send(308, '', undefined, { Location: encodeURI(clean) + url.search })
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1) + (extname(pathname) ? '' : '.html')
    const file = resolve(publicRoot, relative)
    if (!file.startsWith(publicRoot.endsWith(sep) ? publicRoot : publicRoot + sep)) return send(404, 'Not found')
    try {
      send(200, await readFile(file), types[extname(file)] ?? 'application/octet-stream')
    } catch (error) {
      if (!['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code)) throw error
      send(404, await readFile(resolve(publicRoot, '404.html')), types['.html'])
    }
  } catch (error) {
    if (error instanceof URIError || error instanceof TypeError) return send(400, 'Invalid request')
    console.error('Preview request failed:', error.message)
    send(500, 'Preview server error')
  }
})
server.listen(port, '127.0.0.1', () => console.log(`Kasten site: http://127.0.0.1:${port}`))
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)))
