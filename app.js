$(function(){
	
	//This is to remove the validation message if no poster image is present
	$('#term').focus(function() {
		var full = $('#poster').has("img").length ? true: false;
		if (full == false) {
			$('#poster').empty();
		}

	});

	var api_key = "0b3385b006ff4f8013eaff2b15006edb";
	var baseimg = "http://image.tmdb.org/t/p/w342";

	//function definition 
	var getPoster = function(){

		//Grab the movie title and store it in a variable

		var film = $('#term').val();

		//check if the user has entered anything

		if (film == '') {

			//If the input field was empty, display a message

			$('#poster').html("<h2 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</h2>");
		} else {

			//They must have entered a value, carry on with API call, first display a loading message to notify the user of activity
			$('#poster').html("<h2 class='loading'>Your poster is on its way!</h2>");

			$.getJSON("https://api.themoviedb.org/3/search/movie?query=" + escape(film) + "&api_key=" + api_key + "&callback=?",
				function(json) {
				//print returned json object to familiarize with API data structure
				// console.log(json);
				// console.log(json.results[0].poster_path);

				//TMDb is nice enough to return a message if nothing was found, so we can base our if statement on this info

					if (json.total_results) {

						//Display the poster and a message announcing the result

						$('#poster').html('<h2 class="loading">Well, gee whiz! We found you a poster, skip!</h2><img id="thePoster" src=' + baseimg + json.results[0].poster_path + ' />');
					} else {
						$.getJSON("http://api.themoviedb.org/3/search/movie?query=goonies&api_key=" + api_key, 
							function(json){
								$('#poster').html('<h2 class="loading">We\'re afraid nothing was found for that search. Perhaps you were looking for The Goonies?</h2><img id="thePoster" src='+baseimg + json.results[0].poster_path+'/>');
	                    });                 
	                }
			});
		}

		return false;	
	}

	$('#fetch form').on('submit', getPoster);
});
