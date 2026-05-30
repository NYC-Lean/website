#!/usr/bin/env python3
"""
Local dev server for ./site that mimics GitHub Pages behaviour:
  - clean URLs: /calendar serves calendar.html, /members serves members.html
  - serves 404.html for unknown paths

Usage:
  python3 scripts/serve.py          # http://localhost:8000
  python3 scripts/serve.py 3000     # custom port
"""
import http.server
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "site")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def _resolve_clean_url(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        fs = self.translate_path(path)
        if not os.path.exists(fs) and not path.endswith("/") and os.path.exists(fs + ".html"):
            self.path = path + ".html"

    def do_GET(self):
        self._resolve_clean_url()
        super().do_GET()

    def do_HEAD(self):
        self._resolve_clean_url()
        super().do_HEAD()

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            page = os.path.join(ROOT, "404.html")
            if os.path.exists(page):
                with open(page, "rb") as f:
                    body = f.read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
        super().send_error(code, message, explain)


if __name__ == "__main__":
    print(f"Serving ./site at http://localhost:{PORT}  (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("", PORT), Handler).serve_forever()
