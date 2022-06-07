#!/usr/bin/env node

import sirv from 'sirv';
import polka from 'polka';

let assets = sirv('./build', {
  extensions: ['html']
});

polka()
  .use((req, res, next) => {
    if (req.url.match(/^\/todos\/[\w-%]+$/)) {
      req.url = '/todos/_uid_';
    }
    next();
  })
  .use(assets)
  .listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on localhost:3000~!');
  });
