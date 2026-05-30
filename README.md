# NYC Lean

The website for **NYC Lean**, a community for the [Lean](https://lean-lang.org)
theorem prover and formal methods in New York City.

Live at **[lean.nyc](https://lean.nyc)**.

## Overview

A static site built with plain HTML, CSS, and vanilla JavaScript. There is no
build step and no framework. Page motion is provided by [GSAP](https://gsap.com),
vendored locally. The site is deployed to GitHub Pages by a GitHub Actions
workflow.

## Repository structure

```
.
├── .github/workflows/deploy.yml   GitHub Pages deployment
├── .editorconfig
├── .gitignore
├── LICENSE
├── README.md
└── site/                          everything served at lean.nyc
    ├── index.html                 home page
    ├── calendar.html              served at /calendar
    ├── members.html               served at /members
    ├── 404.html
    ├── CNAME                      custom domain (do not delete)
    └── assets/
        ├── css/style.css          all styles
        ├── js/app.js              event rendering and GSAP motion
        ├── js/events.js           meetup data (edit this to add meetups)
        ├── img/                   favicon.svg, logo.svg
        └── vendor/gsap/           GSAP (gsap.min.js, ScrollTrigger.min.js)
```

## Local development

Run the dev server, which mimics GitHub Pages clean URLs so that `/calendar`
and `/members` resolve exactly as they do in production:

```bash
python3 scripts/serve.py        # http://localhost:8000
```

A plain `python3 -m http.server --directory site` also works, but it will 404
on the extensionless `/calendar` and `/members` paths.

## Editing content

### Meetups

All events live in [`site/assets/js/events.js`](site/assets/js/events.js) as a
single list. Each entry looks like:

```js
{
  date: "2026-06-07",   // YYYY-MM-DD, required
  time: "2:00 PM",       // free text, "" if unknown
  location: "Mori",      // free text, "" if none or private
  title: "Weekend meetup",
  description: "..."     // optional, shown on the calendar page
}
```

Add the next meetup at the top of the list. Order does not matter, since
entries are sorted by date. Events with a future date appear under "Upcoming";
once a date passes, they move to "Past" automatically. The home page shows the
next three upcoming events.

### Members

Edit [`site/members.html`](site/members.html). Copy a `.member` block, set the
name, optional role, and a link to a personal site (show the domain without the
`https://` prefix as the link text).

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which publishes the `site/` directory to GitHub Pages. The custom domain is
configured in the repository's Pages settings and pinned by `site/CNAME`; HTTPS
is enforced.

## Contributing

Pull requests are welcome. To add yourself to the members list or add a meetup,
edit the relevant file described above and open a PR.

## License

Released under the [MIT License](LICENSE).
