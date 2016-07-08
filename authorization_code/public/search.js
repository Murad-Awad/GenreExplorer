var Genre = document.getElementById("genre");
var Song = document.getElementById("song");
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    searchTracks(Song.value.toString());
},
    false
    );
function run() {
    searchTracks(Song.value);
    alert("HEY");
}