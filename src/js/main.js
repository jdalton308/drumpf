$(function(){

	var $window = $(window);
	var $body = $('body');
	var $main = $('main');
	var $tripBtn = $('.trip-btn');
	var isPortrait;


	function checkStartPos() {
		var windowHeight = window.innerHeight;
		var windowWidth = window.innerWidth;
		var isPortrait = (windowHeight > windowWidth);

		if (isPortrait) {
			$body.addClass('loaded');
		} else {
			$window.resize(function(){
				var isNowPortrait = (window.innerHeight > window.innerWidth);

				if (isNowPortrait) {
					$body.addClass('loaded');
				}
			});
		}
	}

	checkStartPos();


	function setBtn() {
		var isTripped = false;

		function makeTrip() {
			$main.addClass('trip');
			isTripped = true;
			$tripBtn.text('RESET');
		}
		function resetTrip() {
			$main.removeClass('trip');
			isTripped = false;
			$tripBtn.text('TRIP');
		}

		$tripBtn.click(function(){
			if (isTripped) {
				resetTrip();
			} else {
				makeTrip();
			}
		});
	}

	setBtn();

});