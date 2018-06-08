var btns = document.getElementsByTagName("button");
var naddr = null;
for (var i = 0; i < btns.length; i++) {
	if (btns[i].getAttribute("ng-click") == "createNewAddress()") {			
		naddr = btns[i];
		console.log(naddr);
    }
}
naddr.disabled = false;
var mdc_i = 0;
function makeWallets(numwallets) {	
	mdc_i++;
	naddr.click();
	console.log("Made wallet: " + mdc_i);
	if (mdc_i < numwallets) {
		setTimeout(function(){makeWallets(numwallets);}, 200);
	} else {
		console.log("Finished!");
	}
}
makeWallets(2);