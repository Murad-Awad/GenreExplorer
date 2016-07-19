(function () {
    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */

    var dance;
    var energy;
    var key;
    var loudness;
    var mode;
    var speechiness;
    var acousticness;
    var instrumentalness;
    var liveness;
    var valence;
    var tempo;
    var time_signature;
    var artistDataID;
    var templateSource = document.getElementById('results-template').innerHTML,
  template = Handlebars.compile(templateSource),
  resultsPlaceholder = document.getElementById('results'),
  playingCssClass = 'playing',
  audioObject = null;
    var templateSource2 = document.getElementById('genreExplorer-template').innerHTML;
    var template2 = Handlebars.compile(templateSource2);
    var resultsPlaceholder2 = document.getElementById('genreExplorer');
    var templateSource3 = document.getElementById('getsongs-template').innerHTML;
    var template3 = Handlebars.compile(templateSource3);
    var newSongsPlaceholder = document.getElementById('newSongs');
    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById('user-profile');
    var oauthSource = document.getElementById('oauth-template').innerHTML,
        oauthTemplate = Handlebars.compile(oauthSource),
        oauthPlaceholder = document.getElementById('oauth');
    var params = getHashParams();
    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;
    if (error) {
        alert('There was an error during the authentication');
    } else {
        if (access_token) {
            // render oauth info
            oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
            });
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                    $('#login').hide();
                    $('#important').show();
                    $('#loggedin').show();
                }
            });
        } else {
            // render initial screen
            $('#login').show();
            $('#loggedin').hide();
            $('#important').hide();
        }
        document.getElementById('obtain-new-token').addEventListener('click', function () {
            $.ajax({
                url: '/refresh_token',
                data: {
                    'refresh_token': refresh_token
                }
            }).done(function (data) {
                access_token = data.access_token;
                oauthPlaceholder.innerHTML = oauthTemplate({
                    access_token: access_token,
                    refresh_token: refresh_token
                });
            });
        }, false);
    }
    var getSongFeatures = function (id) {
        $.ajax({
            url: 'https://api.spotify.com/v1/audio-features/' + id,
            async: false,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                dance = response.danceability;
                energy = response.energy;
                key = response.key;
                loudness = response.loudness;
                mode = response.mode;
                speechiness = response.speechiness;
                acousticness = response.acousticness;
                instrumentalness = response.instrumentalness;
                liveness = response.liveness;
                valence = response.valence;
                tempo = response.tempo;
                time_signature = response.time_signature;
            }
        });
    }
    var searchTracks = function (query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'track'
            },
            success: function (response) {
                resultsPlaceholder.innerHTML = template(response);

            }
        });
    }
    var getNewTracks = function (a, d, e, i, k, li, lo, m, s, te, ti, v, gs) {
        $.ajax({
            url: 'https://api.spotify.com/v1/recommendations',
            async: false,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            data: {
                seed_genres: gs,
                target_acousticness: a,
                target_danceability: d,
                target_energy: e,
                target_instrumentalness: i,
                target_key: k,
                target_liveness: li,
                target_loudness: lo,
                target_mode: m,
                target_speechiness: s,
                target_tempo: te,
                target_time_signature: ti,
                target_valence: v

            },
            success: function (response) {

                newSongsPlaceholder.innerHTML = template3(response);
            },
            error: function (xhr, response, textStatus, thrownError) {
                document.write(response + JSON.stringify(xhr) + JSON.stringify(textStatus) + JSON.stringify(thrownError));
            }
        });
    }
    results.addEventListener('click', function (e) {
        var target = e.target;
        var songData = { title: target.getAttribute("songid"), artist: target.getAttribute("artistname") };
        resultsPlaceholder2.innerHTML = template2(songData);
        document.getElementById('getSongs').onclick = function () {
            getSongFeatures(songID);
            getNewTracks(acousticness, dance, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, time_signature, valence, document.getElementById("genre").value.toString());
            $('#getSongs').hide();
        };
        var songID = target.getAttribute("song-data-id");
        window.songID = songID;
        artistDataID = target.getAttribute("artistid");
        window.artistDataID = artistDataID;
    });

    document.getElementById('search').addEventListener('click', function (e) {
        e.preventDefault();
        searchTracks(document.getElementById('songtext').value.toString());
        $("#search").hide();
    }, false);

})();
