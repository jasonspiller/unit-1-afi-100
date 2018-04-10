$(function() {

	// global until I find a better way
	var arrMovies = [],
			arrMatches = [],
			intMatch = 0;


	// sort the array based on votes
	function sortMovieArray(a, b) {

		var votesA = a.votes;
		var votesB = b.votes;

		var comparison = 0;
		if (votesA < votesB) {
			comparison = 1;
		} else if (votesA > votesB) {
			comparison = -1;
		}
		return comparison;
	}


	// start the game
	function playGame() {

		// test to see if there are more matches
		if (intMatch < arrMatches.length) {

			// the keys to use as IDs on the
			var arrKeys = Object.keys(arrMatches[intMatch]);
			var strOutputMatch = '';

			//build movies output
			for (var i = 0; i < arrKeys.length; i++) {

				strOutputMatch += '<div class="movie text-left" id="' + arrKeys[i] +
													'"><img src="' + arrMatches[intMatch][arrKeys[i]].Poster +
													'" alt="' + arrMatches[intMatch][arrKeys[i]].Title +
													'"><h2>' + arrMatches[intMatch][arrKeys[i]].Title +
													'</h2><p>' + arrMatches[intMatch][arrKeys[i]].Year +
													'</p></div>';
			}

			// output progress
			strOutputMatch += `<div>Step ${intMatch+1} of ${arrMatches.length}</div>`;

			// toggle display and output movies to the board
			$('#gameBoard').slideToggle(500, function() {
				$(this).html(strOutputMatch);
				$(this).slideToggle(500);
			});

			// clear all event listeners
			$('#gameBoard').off('click', '.movie');

			// add event listener to movie
			$('#gameBoard').on('click', '.movie', function () {

				// get the title of winning movie
				var strMovieTitle = $(this).find('h2')[0].innerText;

				// add vote to the appropriate
				for (var i = 0; i < arrMovies.length; i++) {
					if (arrMovies[i].Title === strMovieTitle) {
						arrMovies[i].votes += 1;
					}
				}

				intMatch++;

				// call the function again and update
				playGame()

			});

		} else {

			// no more matches, sort array based on votes
			arrMovies.sort(sortMovieArray);

			// start ordered list
			var strOrderedList = '<ol>';

			for (var i = 0; i < arrMovies.length; i++) {
				strOrderedList += '<li><div class="movie text-left"><img src="' + arrMovies[i].Poster +
													'" alt="' + arrMovies[i].Title +
													'"><h2>' + arrMovies[i].Title +
													'</h2><p>' + arrMovies[i].Year +
													'</p></div></li>';
			}

			// close ordered list
			strOrderedList += '</ol>'

			// output sorted array
			$('#gameBoard').slideToggle(500, function() {
				$(this).html(strOrderedList);
				$(this).slideToggle(500);
			});
		}
	}

	// determin and store matches
	function createMatches() {

		// for loop variables
		var x = 0,
		    y = 0;

		// output all possible matches
		for (x = arrMovies.length; x--;)
		{
		  for(y = x; y--;)
		  {
		    arrMatches.push({ movie1: arrMovies[x], movie2: arrMovies[y] });
		  }
		}

		// randomize Matches
		function shuffle(array) {

		  var currentIndex = array.length,
					temporaryValue,
					randomIndex;

		  // while there remain elements to shuffle
		  while (0 !== currentIndex) {

		    // pick a remaining element
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }
		  return array;
		}

		arrMatches = shuffle(arrMatches);

		playGame();
	}


	// initilize the game
	function initGame() {

		// array to hold top 10 movies
		var arrMovieIDs = [
			'tt0033467',
			'tt0068646',
			'tt0034583',
			'tt0081398',
			'tt0045152',
			'tt0031381',
			'tt0056172',
			'tt0108052',
			'tt0052357',
			'tt0032138'
		];

		// make api calls for all movies
		for(var i = 0; i < arrMovieIDs.length; i++) {

			// call api
			$.get(`http://www.omdbapi.com/?i=${arrMovieIDs[i]}&apikey=5e90d428`, function(response) {

				// add each move to the array
				arrMovies.push(response);

				// make sure we have all movies, add vote property
				if (arrMovies.length === arrMovieIDs.length) {

					for (var i=0; i < arrMovies.length; i++) {
						arrMovies[i].votes = 0;
					}

					createMatches();
				}
			})
		}
	}

	// event handlers
	$('.play').on('click', initGame);

})
