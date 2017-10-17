
window.addEventListener("load", function(){
    
var searchInput = document.getElementsByClassName("js_search_input")[0];
var suggest = document.getElementById("placeholder");
var precog ="";
var arr =["javascript", "java", "lolJavascript", "Javascript for the win", "javascript rulez"];
var searchMovie = "";
searchInput.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        searchMovie = precog;
        console.log("Search movie is : " + precog); /*not working for mouse select/overwrite */
    } else if (event.key === "Backspace") {
        precog = precog.slice(0, precog.length-1); 
        
    } else {
        precog +=event.key;
    }
    if (precog.length > 2) {
        // console.log(precog);
        for (var i=0; i<arr.length; i++) {
            if (arr[i].toLowerCase().includes(precog)) {    
                suggest.innerHTML = arr[i];
                i=arr.length;
            }
        }
    }
    console.log(precog);
    // console.log(event.key);

});
});
