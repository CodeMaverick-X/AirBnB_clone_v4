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
})
