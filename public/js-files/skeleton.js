// Showing NavBar, Footer and FooterNavBar throughout the page
function loadSkeleton(){
    $('#navbarPlaceholder').load("./skeletons/navbar.html");
    $('#footerPlaceholder').load("./skeletons/footer.html");
    $('#floatingBarPlaceholder').load("./skeletons/floating-bar.html");
}

loadSkeleton(); 