$(function() {

	$('#play').on('click', function() {

		$('main').slideToggle(1000, function() {
			$(this).html('<div style="height:300px; width:100%; padding: 10px; background:#fff" id="gameBoard"><div style="height:120px; width:80%; margin: 10px auto; background:#000; display:inline-block; vertical-align: middle;" id="movie1" class="clearfix"></div><div style="height:120px; width:80%; margin: 10px auto; background:#000; display:inline-block; vertical-align: middle;" id="movie2" class="clearfix"></div></div>')
			$(this).slideToggle(1000);
		});

	});

	// make the api request
	$.get('http://data.fixer.io/api/latest?access_key=3e95437b3ad0e0208372ddfeed6587c3', function(response) {
		console.log(response.rates.USD);
	})

})
