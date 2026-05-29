# lean.nyc

Website for **NYC Lean** — a community for the [Lean](https://lean-lang.org)
theorem prover and formal mathematics in New York City.

🔗 **[lean.nyc](https://lean.nyc)**

A single static page — plain HTML/CSS, no build step. GitHub Pages serves the
`main` branch directly.

```
index.html          # all content
assets/style.css     # all styling
assets/favicon.svg
CNAME                # custom domain — don't delete
```

## Editing

All copy and links live in `index.html`; styling in `assets/style.css`.
Meetup info is the `#meetups` section; chat/mailing-list/GitHub links are in
`#join`. Edit, commit to `main`, and it deploys automatically.

Preview locally by opening `index.html`, or:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

Contributions welcome — open a PR.
