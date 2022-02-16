FROM node:17-alpine

ENV PRERENDER_VERSION 5.18.0
ENV PRERENDER_MEM_CACHE_VERSION 1.0.2
ENV DISPLAY :99.0

WORKDIR /app

RUN addgroup -S prerender && \
    adduser -S -g prerender prerender && \
    apk add --no-cache ca-certificates && \
    apk add --no-cache chromium && \
    npm install prerender@${PRERENDER_VERSION} && \
    npm install prerender-memory-cache@${PRERENDER_MEM_CACHE_VERSION} && \
    rm -rf /var/cache/apk/*

COPY server.js /app/server.js

USER prerender

EXPOSE 3000

CMD [ "node", "server.js" ]

