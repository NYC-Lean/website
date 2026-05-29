# lean.nyc — NYC Lean website

The website for **NYC Lean**, a community for the [Lean](https://lean-lang.org)
theorem prover and formal mathematics in New York City.

🔗 Live at **[lean.nyc](https://lean.nyc)**

## What this is

A single-page static site — plain HTML and CSS, no build step. It's served
directly by GitHub Pages, so editing is as simple as changing a file and
pushing.

```
.
├── index.html        # the page itself (content lives here)
├── assets/
│   ├── style.css      # all styling
│   └── favicon.svg
├── CNAME              # custom domain (lean.nyc) — don't delete
└── .nojekyll          # tell Pages to serve files as-is (no Jekyll build)
```

## Editing the site

Everything visible on the page is in `index.html`; all styling is in
`assets/style.css`. To change copy, links, or sections, edit `index.html`.
A few things to keep current:

- **Meetup info** lives in the `#meetups` section.
- **Join links** (Zulip, Google Group, GitHub) live in the `#join` section —
  update the `href`s if any of these move.

## Running it locally

No tooling required — just open `index.html` in a browser. Or serve it so
relative paths behave exactly like production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

GitHub Pages serves the `main` branch automatically. To enable it the first time:

1. Push this repo to the `NYC-Lean` org.
2. **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
   branch `main`, folder `/ (root)`.
3. Under **Custom domain**, enter `lean.nyc` (the `CNAME` file already sets this).
4. Point the domain's DNS at GitHub Pages:
   - Four `A` records for the apex `@` →
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optionally) a `CNAME` for `www` → `nyc-lean.github.io`
5. Once DNS resolves, tick **Enforce HTTPS**.

## License

Content & code: feel free to reuse. Contributions welcome — open a PR.
