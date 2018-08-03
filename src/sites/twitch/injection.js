/* eslint-disable */
'use strict';

var inject = document.createElement('script');
inject.src = chrome.extension.getURL(`sites/twitch/run.js`);
document.body.appendChild(inject);
