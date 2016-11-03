( function( $ ) {

	var slider = $('.slider').bxSlider({
		mode: 'fade',
		pager: false,
		touchEnabled: false,
		auto: true,
		speed: 650
	});

	var rc = {
		key: '3675637-f39511c97213fc22b10f986ba',
		q: 'traveling',
		image_type: 'photo',
		orientation: 'horizontal',
		min_width: 620,
		min_height: 310,
		per_page: 7
	};

	function getImages(data) {
		console.log(data);

		var activities = $('#activities');

		for (var i = data.hits.length - 1; i >= 0; i--) {
			activities.append(format(data.hits[i].webformatURL, data.hits[i].tags));
		}

		activities.masonry({
		  // options
		  itemSelector: '.activity_wrapper'
		});
	}

	function format(img, text) {
		var item = '<div class="activity_wrapper">'+
			'<div class="activity">'+
				'<div class="activity_image"><img src="'+ img +'"></div>'+
				'<div class="activity_text">'+ text +'</div>'+
			'</div>'+
		'</div>';

		return item;
	}

	var pb = $.ajax({
	  dataType: "json",
	  url: 'https://pixabay.com/api/',
	  data: rc,
	  success: function (data) {
	  	getImages(data)
	  }
	});

} )( jQuery );