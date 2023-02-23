$(function() {
	let checked = {};
	$('input').each(function() {
		let attr_id = $(this).attr("data-id");
		let attr_name = $(this).attr("data-name");
		if ($(this).is(':checked')) {
			checked[attr_name] = attr_id;
		} else {
			delete checked.attr_name			
		}
	});
	
	let count = 0;
	for (amenity in checked) {
		if (count === 0) {
			$('div.amenities h4').append(amenity);
		} else {
			$('div.amenities h4').append(', ', amenity);
		}
		count++;
	}

	$('div#api_status').removeClass('available');
	$.get('http://0.0.0.0:5001/api/v1/status/', function(data, status) {

		if (data.status === 'OK') {
			$('div#api_status').addClass('available');
		}
	})


	$.ajax({
		type: 'POST',
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		data: {},
		contentType: 'application/json',
		success: function(result) {
			console.log(result);
			}
	});
})
