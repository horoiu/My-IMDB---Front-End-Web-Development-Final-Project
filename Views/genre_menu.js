window.addEventListener("load", function(){
    

var genreList =document.getElementsByClassName("genre");
console.log(genreList);

var btn = document.getElementsByClassName("toggle_genre_js")[0];


var chosenGenre = [];
btn.addEventListener("click", function(){
    for (var i=0; i<genreList.length; i++){
        if (genreList[i].checked) {
            chosenGenre.push(genreList[i].value);
        }
    }
    console.log(chosenGenre);
})

})