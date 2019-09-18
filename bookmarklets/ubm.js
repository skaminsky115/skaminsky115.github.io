javascript:(function(){
	function bmklt() {
		if (typeof ubm_main == "function") {
			ubm_main(false);
			return;
		}
		my_repos = [
			["skaminsky115 Repo", "https://skaminsky115.github.io/bookmarklets/", "bookmarklets_repo.js", true, true],
		];
		var script = document.createElement('script');
		script.setAttribute("onerror", "alert('couldnt load')");
		script.setAttribute("src", "http://localhost/skaminsky115%20Web%20Site/git%20repo/bookmarklets/bookmarklets_manager.js");
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	bmklt();
})();