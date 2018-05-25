// This script will load a script if it detects that the page has some custom script to load.
/*
	This is the format for the 
*/
class Repo {
	constructor(name, baseurl, repojs, repofn, alwayscheck) {
		this.name = name;
	    this.baseurl = baseurl;
	    if (repojs == ""){
	    	this.repojs = "bookmarklets_repo.js";
	    } else {
	    	this.repojs = repojs;
	    }
	    this.repofn = repofn;
	    this.alwayscheck = alwayscheck;
	}
}
//Settings
/*
	repos is all of the bookmarklet repos.
	Each Repo class contains the following items (In same order):
	Name (str): This is the name of the repo
	Base Url (str): This is the base url to the bookmarklets.
	Repo Info (str) [Default: 'bookmarklets_repo.js']: This file contains all the scripts.
	Repo Fn (bool): If true, will also run the custom script on the repo. Only do this if you trust the repo.
	Check Regardless (bool): This will make this repo get checked to load the script regardless of if it is in the database.

*/
var repos = [
	//new Repo("skaminsky115 Repo", "http://localhost/skaminsky115%20Web%20Site/git%20repo/bookmarklets/", "bookmarklets_repo.js", true, true),
	//new Repo("skaminsky115 Test Repo", "http://localhost/skaminsky115%20Web%20Site/git%20repo/bookmarklets/test/", "bookmarklets_repo.js", true, false),
	new Repo("skaminsky115 Repo", "https://skaminsky115.github.io/bookmarklets/", "bookmarklets_repo.js", true, true),
];

//--------- Helper functions ----------


/*
	This is for the repo to add a site.
*/
class Site {
	constructor(hostname) {
		this.hostname = hostname;
		this.baseurl = "";
	}
}

/*
	This is for repos to have custom settings
*/
class Repo_Settings {
	constructor(name){
		this.name = name;
	}
}

/*
	This is what runs if the script fails.
*/
function scriptfail(element, fn) {
	console.log("Failed to load element:");
	console.log(element);
	fn();
}

/*
	Make script tag and load it to page
*/
function loadScript(url, onfail) {
	var script = document.createElement('script');
	script.setAttribute("onerror", onfail);
	script.setAttribute("src", url);
	document.getElementsByTagName("head")[0].appendChild(script);
}

/*
	Concat Dictionaries
*/
function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}
//-------- END Helper functions -------

//Load Repos info
var ubm_db = {};
var ubm_alwayscheck = [];
var ubm_i = repos.length;
var ubm_loaded = true;
var ubm_lfailed = false;
var repo_sites = {};
function repo_fn(){}
var r = null;
var ubm_interval = setInterval(function(){
	if (ubm_loaded) {
		ubm_loaded = false;
		if (ubm_lfailed) {
			console.log("Could not load repo: " + ubm_lfailed);
			ubm_lfailed = false;
		}
		for (var key in repo_sites) {
			if (repo_sites.hasOwnProperty(key)) {
				repo_sites[key].baseurl = r.baseurl;
			}
		}
		ubm_db = extend(ubm_db, repo_sites);
		if (r && r.repofn) {
			repo_fn();
		}
		ubm_i--;
		if (ubm_i < 0) {
			clearInterval(ubm_interval);
			finish_load();
			return;
		}
		r = repos[ubm_i];
		repo_sites = {};
		loadScript(r.baseurl + r.repojs, `scriptfail(this, function(){ubm_loaded = true; ubm_lfailed = "` + r.name + `";})`);
		if (r.alwayscheck) {
			ubm_alwayscheck.push(r);
		}
	}
}, 5);

function finish_load(){
	//Get current url
	var thisurl = new URL(window.location.href);
	var hostname = thisurl.hostname;
	var s = ubm_db[hostname];
	if (s) {
		loadScript(s.baseurl + hostname + ".js", `scriptfail(this, function(){console.log('Could not load script from site: ` + s.baseurl + `!')})`);
	}

	for (var i = 0; i < ubm_alwayscheck.length; i++) {
		var r = ubm_alwayscheck[i];
		if(!s || r.baseurl !== s.baseurl) {
			loadScript(r.baseurl + hostname + ".js", `scriptfail(this, function(){console.log('Could not load script from site: ` + r.baseurl + `!')})`);
		}
	}
}