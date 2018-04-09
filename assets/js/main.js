$(function() {

	// global until I find a better way
	var arrMovies = [];

	//build movies to be added to the board
	function buildMovie(num, imgPath, title, year) {

		// build movie output string
		var strMovie = `<div class="movie text-left" id="movie${num}"><img src="${imgPath}" alt="${title}"><h2>${title}</h2><h3>${year}</h3></div>`;

		return strMovie;
	}


	// start the game
	function startGame(movieArray) {

		//build movies output
		var strOutputMovies = buildMovie(1,movieArray[0].Poster,movieArray[0].Title,movieArray[0].Year); + ''
		strOutputMovies += buildMovie(2,movieArray[1].Poster,movieArray[1].Title, movieArray[1].Year);

		// toggle display and output movies to the board
		$('#gameBoard').slideToggle(500, function() {
			$(this).html(strOutputMovies);
			$(this).slideToggle(500);
		});

		// add event handler to movie
		$('#gameBoard').on('click', '.movie', function () {

			// get the title of winning movie
			var objMovieTitle = $(this).find('h2');
			var strMovieTitle = objMovieTitle[0].innerText;

			// test for
			for (var i=0; i < arrMovies.length; i++) {
        if (arrMovies[i].Title === strMovieTitle) {
        	if(arrMovies[i].Votes === undefined) {
						arrMovies[i].Votes = 1;
					} else {
						arrMovies[i].Votes += 1;
					}
        }
    	}

			console.log(arrMovies);
		});
	}


	// initilize the game
	function initGame() {

		// array to hold top 10 movies
		var arrMovieIDs = [
			'tt0033467',
			'tt0068646',
			'tt0034583',
			// 'tt0081398',
			// 'tt0045152',
			// 'tt0031381',
			// 'tt0056172',
			// 'tt0108052',
			// 'tt0052357',
			'tt0032138'
		];

		// make api calls for all movies
		for(var i=0; i<arrMovieIDs.length; i++) {

			// call api
			$.get(`http://www.omdbapi.com/?i=${arrMovieIDs[i]}&apikey=5e90d428`, function(response) {

				// add each move to the array
				arrMovies.push(response);

				// make sure we have all movies
				if (arrMovies.length === arrMovieIDs.length) {
					startGame(arrMovies);
				}
			})
		}
	}

	// event handlers
	$('#play').on('click', initGame);

})
