#!/usr/bin/env node

const prerender = require("prerender");
const cache = require("prerender-memory-cache");

const server = prerender({
  chromeLocation: "/usr/lib/chromium/chrome",
  chromeFlags: [
    "--headless",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "--remote-debugging-address=0.0.0.0",
    "--hide-scrollbars",
    "--no-sandbox"
  ],
  pageDoneCheckInterval: 500,
  waitAfterLastRequest: 1000,
  pageLoadTimeout: 180000
});

server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(cache);

server.start();

