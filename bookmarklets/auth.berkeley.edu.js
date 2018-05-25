function checkToSubmit() {
    if (document.getElementById("password").value !== "" && document.getElementById("username") !== "") {
        document.getElementsByName("submit")[0].click();
    } else {
        setTimeout(function(){checkToSubmit();}, 1000);
    }
}
checkToSubmit();