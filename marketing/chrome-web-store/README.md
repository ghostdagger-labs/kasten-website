# Chrome Web Store promotional tiles

Created November 25, 2026 for Kasten by GHOSTDAGGER.

Upload these final files in the Store listing tab:

| Field | File | Format |
| --- | --- | --- |
| Small promo tile | [kasten-small-promo-440x280.png](kasten-small-promo-440x280.png) | 440 × 280, 24-bit RGB PNG, no alpha |
| Marquee promo tile | [kasten-marquee-promo-1400x560.png](kasten-marquee-promo-1400x560.png) | 1400 × 560, 24-bit RGB PNG, no alpha |

The artwork uses the existing Kasten icon as a reference, the website’s forest-green palette, and the exact tagline “Your Kaspa. Your keys.” These are promotional graphics, not application screenshots.

## Source and export

Generated with the built-in image_gen tool. The full prompts are in [generation-prompts.json](generation-prompts.json). The original generated artwork and reference icon are retained in `sources/`. No API key or CLI image-generation fallback was used.

Final files were resized with macOS sips, preserving the opaque RGB format. From this directory:

```sh
sips -z 280 440 sources/small-original.png --out kasten-small-promo-440x280.png
sips -z 560 1400 sources/marquee-original.png --out kasten-marquee-promo-1400x560.png
```

Both exports were inspected at final size. PNG headers confirm exact dimensions, 8 bits per RGB channel, and color type 2 (no alpha).

These files are outside `public/`, so they are retained in this repository without being served by the website. Upload the final PNGs to the Chrome Web Store manually.
