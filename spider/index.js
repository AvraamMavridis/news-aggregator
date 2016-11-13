'use strict';

const fetch = require('node-fetch');
const scrapin = require('./ingr');
let interval = null;

const start = function(){
  const _start = function()
  {
    const res = fetch('http://www.in.gr/latestarticles/')
                .then(function(res) {
                    return res.text();
                })
                .then(scrapin);
  }
  _start()

  interval = setInterval(function(){
    _start()
  },10000)
}

const close = function()
{
  clearInterval(interval);
}

module.exports = {
  start: start,
  close: close
}
