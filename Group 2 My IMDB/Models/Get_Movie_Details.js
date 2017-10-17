/* global $ */
function MovieDetails() {
    this.reqMovie = {};
}
MovieDetails.prototype.getDetails = function(id) {
    var self=this;
    var root = "https://ancient-caverns-16784.herokuapp.com/movies/" + id;
    return $.get(root).then(initMovie);
    function initMovie(response) {
        self.reqMovie = response;
        return self;
    }

};