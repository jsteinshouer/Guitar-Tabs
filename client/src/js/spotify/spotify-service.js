var spotify = angular.module('spotify.service', []);


spotify.factory('Track', ['$http', '$q', function ($http, $q) {

	var Track = function (data) {
		angular.extend(this, data);
	};

	Track.search = function(trackQuery,artistQuery,cb,errcb) {

		var tracks = [];
		var q = "track:" + trackQuery;

		if (artistQuery && artistQuery !== "") {
			q = q + "+artist:" + artistQuery;
		}

		$http.get('https://api.spotify.com/v1/search?q=' + q + '"&type=track').then(function(res) {

				angular.forEach(res.data.tracks.items,function(item) {
					var track = {
						title: item.name,
						uri: item.uri,
						id: item.id,
						preview: item.preview_url,
						artist: {
							name: item.artists[0].name,
							uri: item.artists[0].uri,
							id: item.artists[0].id
						},
						album: {
							title: item.album.name,
							uri: item.album.uri
						}
					};

					track.album.image = item.album.images[1] || item.album.images[0] || undefined;

					tracks.push(track);
				});

				cb(tracks);

			},errcb);
	};

	Track.get = function(id,cb,errcb) {

			$http.get('https://api.spotify.com/v1/tracks/' + id).then(function(res) {
				var item = res.data;

				var track = {
					title: item.name,
					uri: item.uri,
					id: item.id,
					preview: item.preview_url,
					duration_ms: item.duration_ms,
					track_number: item.track_number,
					artist: {
						name: item.artists[0].name,
						uri: item.artists[0].uri,
						id: item.artists[0].id
					},
					album: {
						title: item.album.name,
						uri: item.album.uri,
						images: item.album.images
					}
				};

				cb(track,item);
			},errcb);
	};

	return Track;

}]);

spotify.factory('SpotifyArtist', ['$http', '$q', function ($http, $q) {

	var Artist = function (data) {
		angular.extend(this, data);
	};

	Artist.search = function(term,cb,errcb) {

		var artists = [];

		$http.get('https://api.spotify.com/v1/search?q=artist:"' + term + '"&type=artist').then(function(res) {

				cb(res.data.artists.items);

			},errcb);
	};

	Artist.get = function(id,cb,errcb) {

		$http.get('https://api.spotify.com/v1/artists/' + id).then(function(res) {

			var artist = {
				name: res.data.name,
				uri: res.data.uri,
				id: res.data.id,
				genres: res.data.genres,
				images: res.data.images
			};
			
			cb(artist,res.data);
		},errcb);
	};

	return Artist;

}]);