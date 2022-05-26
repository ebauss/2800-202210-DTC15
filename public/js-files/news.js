
function showDetails() {
    let params = new URL(document.location.search); ///creates a URL object
    var title = params.searchParams.get("title")
    console.log("MY name:" + title + "myparams: " + params
}

showDetails();
