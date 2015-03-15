describe("spotify Track", function() {

	var $http, $httpBackend, Track;
	beforeEach(module('spotify.service'));
	beforeEach(inject(function ($injector) {
		$http = $injector.get('$http');
		$httpBackend = $injector.get('$httpBackend');
		Track = $injector.get('Track');
	}));

	describe("Track.search: ", function() {

		it("should call the spotify web service and return a collection of tracks", function() {
			//fake response
			$httpBackend.whenGET('https://api.spotify.com/v1/search?q=track:"Dont Think Twice"&type=track').respond({
				tracks: {
					items: [
						{name: "Dont Think Twice", uri: "", id: "aaa", preview_url: "",artists: [{name: "Bob Dylan", uri: ""}], album: {name: "Album Title", uri: "", images: [{},{url: "",width: 100, height: 100}] } },
						{name: "Dont Think Twice", uri: "", id: "bbb", preview_url: "",artists: [{name: "Bob Dylan", uri: ""}], album: {name: "Album Title", uri: "", images: [{},{url: "",width: 100, height: 100}] } },
						{name: "Dont Think Twice", uri: "", id: "ccc", preview_url: "",artists: [{name: "Bob Dylan", uri: ""}], album: {name: "Album Title", uri: "", images: [{},{url: "",width: 100, height: 100}] } }
					]
				}
			});

			var tracks;

			Track.search('Dont Think Twice',function(data) {
				tracks = data;
			});

			//simulate response
			$httpBackend.flush();

			expect(tracks.length).toBe(3);
			expect(tracks[1].id).toBe("bbb");
		});

	});

	describe("Track.get: ", function() {

		it("should call the spotify web service and return a track", function() {

			$httpBackend.whenGET('https://api.spotify.com/v1/tracks/abc').respond({
				title: "Dont Think Twice"
			});

			var track;

			Track.get('abc',function(data) {
				track = data;
			});

			//simulate response
			$httpBackend.flush();

			expect(track).toBeDefined();
			expect(track.title).toBe("Dont Think Twice");
		});

	});

});