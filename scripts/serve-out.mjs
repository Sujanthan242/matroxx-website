import http from "node:http";
import handler from "serve-handler";

/**
 * Serve the static export (out/) the way GitHub Pages serves it: under the
 * /matroxx-website basePath. Plain `serve out/` would put the files at the
 * root, so the basePath-prefixed asset URLs would 404 and Playwright would
 * test a broken page. This tiny server strips the /matroxx-website prefix
 * before handing the request to serve-handler. Local / CI e2e use only —
 * never deployed.
 */
const port = Number(process.env.PORT ?? 4173);
const BASE = "/matroxx-website";

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname === BASE || url.pathname === `${BASE}/`) {
    req.url = "/";
  } else if (url.pathname.startsWith(`${BASE}/`)) {
    req.url = url.pathname.slice(BASE.length) + url.search;
  }
  handler(req, res, { directoryListing: false, public: "out" });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving out/ under ${BASE}/ at http://127.0.0.1:${port}${BASE}/`);
});
