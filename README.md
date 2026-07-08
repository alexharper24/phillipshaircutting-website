# Phillips Haircutting & Barber Shop — Website

A modern, mobile-friendly website for Phillips Haircutting & Barber Shop
(8266 Dixie Highway, Louisville, KY 40258), built to be fast, easy to update,
and easy for Google and customers to find.

## What's here

```
index.html      Home
services.html   Services & fresh-cuts gallery (filterable + lightbox)
about.html      Story + meet the barbers
book.html       Book online (per barber), hours, map, contact form
style.css       Shared styles — all colors/fonts set at the top
main.js         Menu, gallery, lightbox, form handling
img/            Logo emblem, storefront sign, barber photos, work photos
sitemap.xml, robots.txt, .nojekyll   SEO / hosting support
Phillips-OnePage-Preview.html        Single-file preview (see below)
```

**Multi-page site** (the files above) = the real website to host — fast, editable,
and each page has its own address for Google.
**`Phillips-OnePage-Preview.html`** = everything crammed into one file for quick
sharing/previewing (double-click to open). Slower and harder to edit — don't host this one.

## Brand

Colors and type were pulled straight from the shop's painted sign:
barber **red** `#b0392c`, **navy** `#182a44`, **cream** `#f6eeda`, with a vintage
**gold** accent. Headings use Oswald; body text uses Inter. Change any of it in one
place — the `:root` block at the top of `style.css`.

## Before it goes live — a few things to plug in

1. **Contact form.** The "Send Us a Message" form on `book.html` needs a free
   [Formspree](https://formspree.io) account. Create a form, then in `book.html`
   replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"` with
   your real ID. Until then it shows a friendly "call us" message instead of failing.
   (First submission triggers a one-time confirmation email; free tier allows 50/month.)
2. **Pricing.** Prices are intentionally not listed (they read as out of date fast).
   The Services page sends people to call. If you'd rather show a price list, send me
   the numbers and I'll add a clean one.
3. **Booking links.** These point to the current The Cut pages for Scot, JT, and
   Taylor. Update in `about.html` and `book.html` if any change.
4. **Double-check the details.** Founding year (site says 1951), the family
   relationships, and each barber's bio — tweak any wording you'd like.
5. **More photos welcome.** Drop new work photos into `img/` and add a
   `<figure class="g-item" data-cat="fade|cut|beard">` to the gallery in `services.html`.

## Publishing (free) with GitHub Pages

1. Create a GitHub repo and upload every file here (keep the folder structure).
2. Repo **Settings → Pages** → deploy from `main` branch, root folder.
3. Point the domain `www.phillipshaircutting.com` at GitHub Pages (a `CNAME`
   record) and set it as the custom domain in the Pages settings.
4. Verify the site in [Google Search Console](https://search.google.com/search-console)
   and submit `sitemap.xml`.

## Get found on Google

- Keep the **Google Business Profile** current (hours, photos, services, the website
  link) — for a local shop this matters as much as the website itself.
- Structured data (`LocalBusiness`/`HairSalon`), local-keyword page titles, Open Graph
  tags, a sitemap, and robots.txt are already built in.

## Rebuilding the one-page preview

After editing the site, regenerate the single-file preview with:

```
python build_onepage.py
```
