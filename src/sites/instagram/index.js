/* eslint-disable */
"use strict";

import { Router } from "./router.js";
const { getProfileName } = require("./constants")

var router = new Router();
router.start();

router.events.on("profile", () => {
	const areOldBtns = !!document.querySelectorAll("#notify-me-button").length;
	// Don't reset the button if they open and close a photo
	if (areOldBtns && document.querySelector("#notify-me-button").getAttribute("profile") === getProfileName()) return;
	// Remove older buttons
	if (areOldBtns) [...document.querySelectorAll("#notify-me-button")].map(n => n.remove());

	const btnContainer = document.querySelector(`[title='${getProfileName()}']`).parentNode;

	let notifyBtn = document.createElement("button");
	notifyBtn.style = `
		background-color: transparent;
		border: 1px solid #dbdbdb;
		border-radius: 4px;
		color: #262626;
		padding: 0 8px;
		font-size: 14px;
		font-weight: 600;
		line-height: 26px;
		outline: none;
		margin: 0 10px;
		cursor: pointer;
	`;
	notifyBtn.id = "notify-me-button";
	notifyBtn.setAttribute("profile", getProfileName());
	notifyBtn.innerText = "Notify.me";

	notifyBtn.onclick = function (e) {
		alert(e.target.getAttribute("profile"));
	};

	btnContainer.insertBefore(notifyBtn, btnContainer.childNodes[2]);
});