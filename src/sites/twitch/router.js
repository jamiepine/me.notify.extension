/* eslint-disable */
"use strict";

const { EventEmitter } = require("events");

function Router() {
	this.log(`Starting!`);

	this.router = this.getRouter();
	this.events = new EventEmitter();

	this._routes = {
		HOMEPAGE: "HOMEPAGE",
		DASHBOARD: "DASHBOARD",
		CHANNEL: "CHANNEL",
		VOD: "VOD",
		CHAT: "CHAT",
		DIRECTORY: "DIRECTORY",
		FOLLOWING: "FOLLOWING",
		FOLLOWING_LIVE: "FOLLOWING_LIVE"
	};

	this._route_paths = {
		[this._routes.HOMEPAGE]: /^\/$/i,
		[this._routes.FOLLOWING_LIVE]: /^\/directory\/following\/live$/i,
		[this._routes.FOLLOWING]: /^\/directory\/following$/i,
		[this._routes.DIRECTORY]: /^\/directory/i,
		[this._routes.CHAT]: /^(\/popout)?\/[a-z0-9-_]+\/chat$/i,
		[this._routes.VOD]: /^\/videos\/[0-9]+$/i,
		[this._routes.DASHBOARD]: /^\/[a-z0-9-_]+\/dashboard/i,
		[this._routes.CHANNEL]: /^\/[a-z0-9-_]+/i
	};
}

Router.prototype.log = function(log) {
	console.log(
		"%c Notify.me %c Router ",
		"background: #a36ad8; color: #e8e8e8; border-radius: 3px 0 0 3px;",
		"background: #6e4693; color: #e8e8e8; border-radius: 0 3px 3px 0;",
		log
	);
};

// Check if the page is loaded
Router.prototype.isLoaded = {
	channel: () => {
		return (
			(!!document.querySelector(".channel-header__user-avatar img") && !!document.querySelector('[data-target="channel-header-right"]')) ||
			!!document.querySelector("[data-test-selector='side-nav-channel-info__root'] img.tw-image")
		)
	}
};

// Wait for the page to load/timeout(15 seconds) before continuing
Router.prototype.loadFirst = function(type) {
	let timeout, interval;
	const startTime = Date.now();
	return Promise.race([
		// r is short for resolve
		new Promise(r => { timeout = setTimeout(r, 15000); }),
		new Promise(r => {
			if (this.isLoaded[type]()) { r(); return; }
			interval = setInterval(() => this.isLoaded[type]() && r(), 25);
		})
	]).then(() => {
		this.log(`It took ${Date.now() - startTime}ms to load ${type}`);
		clearTimeout(timeout);
		clearInterval(interval);
	});
};

Router.prototype.routeFromPath = function(path) {
	for (const name of Object.keys(this._route_paths)) {
		const regex = this._route_paths[name];
		if (!regex.test(path)) continue;
		return name;
	}

	return null;
};

Router.prototype.getReact = function(elm) {
	for (const key in elm) {
		if (key.startsWith("__reactInternalInstance$")) return elm[key];
	}

	return null;
};

Router.prototype.findInReact = function(elm, pred, max = 15, depth = 0) {
	try {
		if (pred(elm)) return elm;
	} catch (_) {}

	if (!elm || depth > max) return null;

	const { return: parent } = elm;
	if (parent) return this.findInReact(parent, pred, max, depth + 1);

	return null;
};

Router.prototype.getRouter = function() {
	let router;
	try {
		const node = this.findInReact(this.getReact(document.querySelector("#root div")),
			n => n.stateNode && n.stateNode.context && n.stateNode.context.router
		);
		router = node.stateNode.context.router;
	} catch (_) {}

	return router;
};

Router.prototype.start = function() {
	let cPathname;

	const routeChange = location => {
		const lPathname = cPathname;
		const path = location.pathname;
		const route = this.routeFromPath(path);

		this.log(`Loading ${location.pathname} as ${route}`);

		cPathname = path;
		if (cPathname === lPathname) return;

		switch (route) {
			case this._routes.CHANNEL:
				this.loadFirst("channel").then(() => this.events.emit("channel"));
				break;
		}
	};

	this.router.history.listen(location => routeChange(location));
	routeChange(this.router.history.location);
};

module.exports = {
	Router
};
