"use strict";

module.exports = {
	getProfileName: function () {
		return window.location.pathname.split("/")[1].toLowerCase();
	}
}