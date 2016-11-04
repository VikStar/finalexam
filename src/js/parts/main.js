( function( $ ) {

	var slider = $('.slider').bxSlider({
		pager: false,
		touchEnabled: false,
		auto: true,
		speed: 650
	});

	var apiConfig = {
		key: '3675637-f39511c97213fc22b10f986ba',
		q: 'happiness',
		image_type: 'photo',
		orientation: 'horizontal',
		min_width: 620,
		min_height: 310,
		per_page: 7
	};

	var firstRun = true;

	function getImages(needle) {
		apiConfig.q = (!firstRun && needle) ? needle : apiConfig.q;
		
		$.ajax({
			dataType: "json",
			url: 'https://pixabay.com/api/',
			data: apiConfig,
			success: function ( data ) {
				if (data.totalHits < 7) { requestError(); return; }

				$('.error').removeClass('shown').slideUp('fast');
				
				if ( firstRun ) { addImages( data.hits ) }
				else { updateImages( data.hits ); }
			}
		});
	}

	function addImages( data ) {
		var activities = $('#activities');

		for (var i = data.length - 1; i >= 0; i--) {
			activities.append(format(data[i].webformatURL, data[i].tags));
		}

		activities.masonry({
		  itemSelector: '.activity_wrapper'
		});

		firstRun = false;
	}

	function updateImages(data) {
		var activityList = $('#activities').find('.activity');
		// console.log(activityList);
		for (var i = activityList.length - 1; i >= 0; i--) {
			$(activityList[i]).find('img').attr('src', data[i].webformatURL);
			$(activityList[i]).find('.activity_text').text(data[i].tags)
		}
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

	function requestError() {
		$('.error').addClass('shown').slideDown('fast');
	}

	getImages();

	$('#find-activity').submit(function(e) {
		e.preventDefault();

		var needle = $('.search_field', this).val().trim().split(' ').join('+');
		getImages( needle );

		this.reset();
	});

} )( jQuery );