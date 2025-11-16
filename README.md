viewsite

http://www.smileycyber.com


## Local preview & smoke test

Preview the site locally (recommended before committing or pushing) by running a simple static server from the repository root. Python 3 is the easiest option and works on Windows, macOS, and Linux.

PowerShell (Windows):

```powershell
python -m http.server 8000
# open http://localhost:8000 in your browser
```

macOS / Linux (bash/zsh):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Tip: Press Ctrl+C in the terminal to stop the server. If you prefer an npm-based server, `npx serve` is another cross-platform option.

Quick smoke test

After starting a local server (or from the repo root), run the smoke test script to catch common issues before you commit:

```powershell
python tools\smoke_test.py
```

What the smoke test checks

- Required files exist (index, about, blog, contact, CSS, `robots.txt`, `sitemap.xml`).
- Each HTML page includes a `id="main"` landmark for keyboard and screen-reader navigation.
- `index.html` references a favicon.
- `robots.txt` contains a Sitemap directive and `sitemap.xml` has basic URL entries.
- Detects an invalid `<p3>` tag in the blog HTML (common from unsafe HTML injection).
- Flags any `target="_blank"` links that are missing a `rel="noopener noreferrer"` attribute.

If the script prints failures it exits with a non-zero status. Fix the reported items, re-run the test, and only commit once the checks pass.

If you'd like, I can also run these checks for you and/or create a local branch with the suggested edits so you can preview before pushing.
