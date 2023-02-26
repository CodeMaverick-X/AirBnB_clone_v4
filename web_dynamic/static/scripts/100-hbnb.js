$(function() {
	//handles the filter check boxes
	//called right after so that the list of already checked is displayed
	function checker() {
		let checked = {};
		$('input').each(function() {
			let attr_id = $(this).attr("data-id");
			let attr_name = $(this).attr("data-name");
			let attr_type = $(this).attr("data-type");
			if ($(this).is(':checked')) {
				checked[attr_name] = [attr_id, attr_type];
			} else {
				delete checked.attr_name			
			}
		});
	
		let count1 = 0;
		let count2 = 0;
		$('div.amenities h4').empty()
		$('div.locations h4').empty()
		for (data in checked) {
			if (checked[data][1] === 'amenity') {
				if (count1 === 0) {
					$('div.amenities h4').append(data);
				} else {
					$('div.amenities h4').append(', ', data);
				}
				count1++;
			} else if (checked[data][1] !== 'amenity') {
				if (count2 === 0) {
					$('div.locations h4').append(data);
				} else {
					$('div.locations h4').append(', ', data);
				}
				count2++;
			}

		}
		return checked;
	}
	checker();
	
	//handles the circle at the top right to indicate api status
	//removes the class fist because i could not remove it if the request fails
	//from inside the callback function
	function api_status() {
		$('div#api_status').removeClass('available');
		$.get('http://0.0.0.0:5001/api/v1/status/', function(data, status) {

			if (data.status === 'OK') {
				$('div#api_status').addClass('available');
			}
		})
	}
	api_status()

	//handles the display of all places when the page is loaded
	//the success function still needs some work
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



	//handles the search button on the filter section
	//i tried to avoid that function duplication but failed :(
	$('button').on('click', function() {
		api_status();
		const query = {};
		const checked = checker();
		let a_id = [];
		let s_id = [];
		let c_id = [];
		for (data in checked) {
			if (checked[data][1] === 'amenity') {
				a_id.push(checked[data][0]);
			} else if (checked[data][1] === 'state') {
				s_id.push(checked[data][0]);
			} else if (checked[data][1] === 'city') {
				c_id.push(checked[data][0]);
			}
		}
		//let a_id = Object.values(checked);
		query['amenities'] = a_id;
		query['states'] = s_id;
		query['cities'] = c_id;

		$.ajax({
			url: 'http://0.0.0.0:5001/api/v1/places_search/',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(query),
			success: function(result) {
                        	$('section.places article').remove();
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
	});
})
