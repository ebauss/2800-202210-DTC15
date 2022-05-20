// Showing NavBar, Footer and FooterNavBar throughout the page
function loadSkeleton(){
    $('#navbarPlaceholder').load("./skeletons/navBar.html");
    $('#footerPlaceholder').load("./skeletons/footer.html");
    $('#floatingBarPlaceholder').load("./skeletons/floatingBar.html");
}

loadSkeleton(); 