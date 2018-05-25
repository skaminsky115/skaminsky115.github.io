/*
	This is the script which you will use to load in the bookmarklets!
	Each Repo class contains the following items (In same order):
	Name (str): This is the name of the repo
	Base Url (str): This is the base url to the bookmarklets.
	Repo Info (str) [Default: 'bookmarklets_repo.js']: This file contains all the scripts.
	Repo Fn (bool): If true, will also run the custom script on the repo. Only do this if you trust the repo.
	Check Regardless (bool): This will make this repo get checked to load the script regardless of if it is in the database.

*/
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