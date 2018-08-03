/* eslint-disable */
"use strict";

import { Router } from "./router.js";

var router = new Router();
router.start();

router.events.on("channel", () => {
	// Don't reset the button if it's just a subpage change
	if (!!document.querySelectorAll("#notify-me-button").length && document.querySelector("#notify-me-button").getAttribute("channel") === getChannelName()) return;
	// Remove older buttons
	if (!!document.querySelectorAll("#notify-me-button").length) [...document.querySelectorAll("#notify-me-button")].map(n => n.remove());

	(getLayout() === null ? router.loadFirst("channel").then(() => layout(getLayout())) : layout(getLayout()))

	function layout (layout) {
		const channelBanner = (layout === 1 ?
			document.querySelector('[data-target="channel-header-right"]') :
			document.querySelector('.side-nav-channel-info__info-wrapper')
		);

		let notifyBtn = document.createElement("button");
		notifyBtn.classList = (layout === 1 ? "tw-button tw-button--hollow" : "tw-button tw-button--full-width tw-button--hollow");
		if (layout === 2) notifyBtn.style = "margin-top: 10px;"
		notifyBtn.id = "notify-me-button";
		notifyBtn.setAttribute("channel", "notify-me-button");

		let notifyBtnText = document.createElement("span");
		notifyBtnText.classList = "tw-button__text";
		notifyBtnText.innerText = "Notify.me";
		notifyBtn.appendChild(notifyBtnText);

		notifyBtn.onclick = function() {
			alert(getChannelName());
		};

		if (layout === 1) channelBanner.insertBefore(notifyBtn, channelBanner.childNodes[0]);
		if (layout === 2) channelBanner.appendChild(notifyBtn);
	}
});

function getChannelName() { return window.location.pathname.split("/")[1]; }
function getLayout() {
	let layout = null;
	if (!!document.querySelector(".channel-header__user-avatar img")) layout = 1;
	if (!!document.querySelector("[data-test-selector='side-nav-channel-info__root'] img.tw-image")) layout = 2;
	return layout
}