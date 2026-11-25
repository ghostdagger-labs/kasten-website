# Kasten public website

Standalone static pages for `getkasten.com`, published by **GHOSTDAGGER**. This repository owns the informational website. The wallet application is maintained separately in [ghostdagger-labs/kaspa-wallet](https://github.com/ghostdagger-labs/kaspa-wallet).

## Pages and content ownership

- `public/index.html`: small landing page with accurate pre-release availability.
- `public/privacy.html`: canonical privacy policy for the Chrome extension, this website, and support emails.
- `public/support.html`: troubleshooting, contact availability, and security/privacy guidance.
- `public/404.html`: missing-page fallback.
- `public/assets/site.css`: shared responsive styles. No client JavaScript, remote fonts, analytics, forms, or application cookies.

Edit the HTML directly. The store documentation links to these sources rather than maintaining a second policy. If wallet data flows, service providers, or support practices change, review and update the policy date and Chrome Web Store disclosures together.

The logo comes from the wallet repository’s [Kasten brand assets](https://github.com/ghostdagger-labs/kaspa-wallet/blob/main/packages/brand/assets/kasten-dark.svg). The self-hosted Inter font was copied from `@fontsource-variable/inter`; its license is included in `public/assets/inter-LICENSE.txt`. All assets needed to serve this site are included here.

## Local preview

Requires Node.js 20 or newer. No dependency installation or build is needed. From this repository’s root:

```sh
npm run dev
```

`npm run preview` starts the same server. Open `http://127.0.0.1:3340`. Set `PORT` to use another port. The preview server serves the clean `/privacy` and `/support` paths, redirects `.html` URLs, returns a real 404 for missing pages, and applies the response headers from `vercel.json`. It binds only to loopback and is not a production server.

## Vercel setup

Import [ghostdagger-labs/kasten-website](https://github.com/ghostdagger-labs/kasten-website) into Vercel with:

| Setting | Value |
| --- | --- |
| Root Directory | `.` (repository root; leave the default) |
| Framework Preset | Other |
| Install Command | Empty; skipped by `vercel.json` |
| Build Command | Empty; these are ready-to-serve static files |
| Output Directory | `public` |
| Environment variables | None |
| Production domain | `getkasten.com` |

The project-level Root Directory belongs in Vercel settings, not `vercel.json`. This repository is the complete static site and does not require the wallet repository. No deployment or domain configuration is performed by preparing these files.

`vercel.json` supplies clean URLs, redirects trailing slashes, disables script execution and network calls from the pages, and adds standard security headers. The public pages do not expose a support email address or mailto link. Direct contact is temporarily unavailable; a contact form is deferred. No form, email integration, or new data collection has been added.

After deployment, connect `getkasten.com` using Vercel's actual DNS instructions and verify both routes are publicly accessible without Vercel Authentication. The canonical URLs and sitemap assume the apex domain. If choosing `www.getkasten.com` instead, update those URLs and configure the apex redirect consistently.

## Publication handoff

Use these Chrome Web Store URLs **after the site is deployed and reachable**:

- Homepage: `https://getkasten.com/`
- Privacy policy: `https://getkasten.com/privacy`
- Support: `https://getkasten.com/support`

Before launch, restore a working contact route and confirm that message delivery and handling/retention match the policy. Keep the destination mailbox in server-side configuration when adding the form. Do not put it into public HTML, JavaScript, or a form action. The policy date is November 25, 2026; update it if practices change before publication. The wallet’s [security and release checklist](https://github.com/ghostdagger-labs/kaspa-wallet/blob/main/docs/extension/release-checklist.md) still applies independently of this website.

At public extension launch, replace the home page's development notice with the verified Chrome Web Store installation URL. Do not add analytics, a contact form, or another data service without updating the privacy disclosure.

## Chrome Web Store promotional assets

The [promo tile folder](marketing/chrome-web-store/README.md) contains upload-ready 440 × 280 and 1400 × 560 PNGs, original artwork, and generation notes. These assets are kept outside the deployed `public/` directory.
