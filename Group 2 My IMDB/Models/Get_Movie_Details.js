/* global $ Movie */
function MovieDetails() {
    this.reqMovie = {};
}
MovieDetails.prototype.getDetails = function(id) {
    var self=this;
    var root = "https://ancient-caverns-16784.herokuapp.com/movies/" + id;
    return $.get(root).then(initMovie);
    function initMovie(response) {
        self.reqMovie = new Movie(response);
        console.log('inside initMovie from Get_Movie_Details.js');
        return self;
    }

};