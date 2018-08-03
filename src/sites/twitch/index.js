/* eslint-disable */
"use strict";

import { Router } from "./router.js";

var router = new Router();
router.start();

router.events.on("channel", () => {
	// Remove older buttons
	if (document.querySelectorAll("#notify-me-button")) [...document.querySelectorAll("#notify-me-button")].map(n => n.remove());

	const channelBanner = document.querySelector('[data-target="channel-header-right"]');

	let notifyBtn = document.createElement("button");
	notifyBtn.classList = "tw-interactive tw-button-icon tw-button-icon--hollow";
	notifyBtn.id = "notify-me-button";

	let notifyBtnText = document.createElement("span");
	notifyBtnText.classList = "tw-button__text";
	notifyBtnText.innerText = "Notify.me";
	notifyBtn.appendChild(notifyBtnText);

	notifyBtn.onclick = function() {
		alert(window.location.pathname.split("/")[1]);
	};

	channelBanner.insertBefore(notifyBtn, channelBanner.childNodes[0]);
});
