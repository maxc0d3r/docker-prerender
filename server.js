#!/usr/bin/env node

const prerender = require("prerender");
const cache = require("prerender-memory-cache");

const server = prerender({
  chromeLocation: "/usr/lib/chromium/chrome",
  chromeFlags: [
    "--headless",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "--hide-scrollbars",
    "--no-sandbox"
  ]
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(cache);

server.start();

