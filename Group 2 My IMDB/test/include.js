/* global $ */
window.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("include-button-js");
    btn.addEventListener("click", function(e) {
        console.log(e.target);
        $(function(){
            $("#container").load("../Pages/editMovie.html");
        });
    });
})