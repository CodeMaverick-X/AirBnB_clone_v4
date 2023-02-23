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
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		method: 'POST',
		data: JSON.stringify({}),
		contentType: 'application/json',
		success: function(result) {
			for (place of result) {
				const article = 
`<article>
   <div class="title_box">
   <h2>${place.name}</h2>
   <div class="price_by_night">${place.price_by_night}</div>
   </div>
   <div class="information">
      <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>
      <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''}</div>
      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>
   </div>
   <div class="user">
   </div>
   <div class="description">
      ${place.description}
   </div>
</article>`;
				$('section.places').append(article);
			}
		}
	});
})
