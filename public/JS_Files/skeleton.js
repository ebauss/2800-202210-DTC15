// Showing NavBar, Footer and FooterNavBar throughout the page
function loadSkeleton(){
    $('#navbarPlaceholder').load("./SkeletonHTML/navBar.html");
    $('#footerPlaceholder').load("./SkeletonHTML/footer.html");
    $('#floatingBarPlaceholder').load("./SkeletonHTML/floatingBar.html");
}

loadSkeleton(); 