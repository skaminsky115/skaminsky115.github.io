if (typeof loc === "undefined") {
  loc = ""
}
$(document).ready(function () {
    $("#footer").load( loc + "modules/footer.html", function(){
	   $("#footer").fadeIn();
    });
});