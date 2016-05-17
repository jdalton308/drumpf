$(function(){

	var $window = $(window);
	var $body = $('body');
	var $main = $('main');
	var $tripBtn = $('.trip-btn');
	var isPortrait;


	// function checkStartPos() {
	// 	var windowHeight = window.innerHeight;
	// 	var windowWidth = window.innerWidth;
	// 	var isPortrait = (windowHeight > windowWidth);

	// 	if (isPortrait) {
	// 		$body.addClass('loaded');
	// 	} else {
	// 		$window.resize(function(){
	// 			var isNowPortrait = (window.innerHeight > window.innerWidth);

	// 			if (isNowPortrait) {
	// 				$body.addClass('loaded');
	// 				Counter.add();
	// 			}
	// 		});
	// 	}
	// }

	// checkStartPos();

	// For moobile tripping...
	function watchRotation() {
		var isPortrait = checkPortrait();
		var ready = false;

		function checkPortrait() {
			var windowHeight = window.innerHeight;
			var windowWidth = window.innerWidth;

			return (windowHeight > windowWidth);
		}

		function readyHandler() {
			console.log('readyHandler called');
			var isPortrait = checkPortrait();

			if (isPortrait) {
				$body.addClass('ready');
				$window.off('resize', readyHandler);
			}
		}
		function tripHandler() {
			console.log('tripHandler called');
			
			function next() {
				Counter.add();
				Quotes.next();
			}

			window.setTimeout(function(){
				var isPortrait = checkPortrait();

				if (isPortrait) {
					next();
				}
			}, 300);
		}

		if (isPortrait) {
			$body.addClass('ready');
		} else {
			$window.resize(readyHandler);
		}

		$window.resize(tripHandler);

	}

	watchRotation();


	// For desktop tripping...
	function setBtn() {
		var isTripped = false;

		function makeTrip() {
			$main.addClass('trip');
			isTripped = true;
			$tripBtn.text('RESET');
			Counter.add();
		}
		function resetTrip() {
			$main.removeClass('trip');
			isTripped = false;
			$tripBtn.text('TRIP');
			Quotes.next();
		}

		$tripBtn.click(function(ev){
			ev.stopPropagation();

			console.log('click');
			if (isTripped) {
				resetTrip();
			} else {
				makeTrip();
			}
		});
	}

	setBtn();


	var Quotes = (function quotes() {
		var quotes = [
			'If Ivanka weren’t my daughter, perhaps I’d be dating her.',
			'My fingers are long and beautiful, as, it has been well been documented, are various other parts of my body.',
			'I am being proven right about massive vaccinations. The doctors lied. Save our children and their future.',
			'Laziness is a trait in the blacks. Black guys counting my money! I hate it.',
			'The only kind of people I want counting my money are little short guys that wear yamakas every day.',
			'26,000 unreported sexual assaults in the military. Only 238 convictions. What did these geniuses expect when they put men & women together?',
			'If Hillary Clinton can’t satisfy her husband what makes her think she can satisfy America.',
			'You could see there was blood coming out of her eyes. Blood coming out of her wherever.',
			'Today I officially declare my candidacy for President of the United States.',
			'An ‘extremely credible source’ has called my office and told me that Barack Obama’s birth certificate is a fraud.',
			'Ariana Huffington is unattractive, both inside and out. I fully understand why her former husband left her for a man – he made a good decision.',
			'I will build a great wall – and nobody builds walls better than me, believe me – and I’ll build them very inexpensively. I will build a great, great wall on our southern border, and I will make Mexico pay for that wall. Mark my words.',
			'When Mexico sends its people, they’re not sending the best. They’re not sending you, they’re sending people that have lots of problems and they’re bringing those problems with us. They’re bringing drugs. They’re bring crime. They’re rapists… And some, I assume, are good people.',
			'All of the women on The Apprentice flirted with me – consciously or unconsciously. That’s to be expected.',
			'Our great African-American President hasn’t exactly had a positive impact on the thugs who are so happily and openly destroying Baltimore.',
			'I have never seen a thin person drinking Diet Coke.',
			'I think the only difference between me and the other candidates is that I’m more honest and my women are more beautiful.',
			'The point is, you can never be too greedy.',
			"My IQ is one of the highest — and you all know it! Please don't feel so stupid or insecure; it's not your fault.",
			'Happy #CincoDeMayo! The best taco bowls are made in Trump Tower Grill. I love Hispanics!',
			"We can't continue to allow China to rape our country"
		];
		var usedQuotes = [];
		var $quoteBox = $('.quote');
		var $quoteText = $('.quote-box'); 

		function next() {
			var nextIndex = Math.floor( Math.random()*quotes.length );
			console.log('NextIndex: '+ nextIndex);

			var nextQuote = quotes[nextIndex];
			console.log('Next quote: '+ nextQuote);

			$quoteText.text(nextQuote);

			// Show quote for 5 seconds
			$quoteBox.removeClass('hide');
			var quoteTimeout = window.setTimeout(function(){
				$quoteBox.addClass('hide');
				$body.off('click');
			}, 5000);

			$body.click(function(){
				$quoteBox.addClass('hide');
				window.clearTimeout(quoteTimeout);
			});
		}
		return {
			next: next
		};
	})();

	Quotes.next(); // called by tripHandler on first load


	var Counter = (function(){
		var $counter = $('.odometer-number');
		var currentCount = 0;

		function add() {
			currentCount++;
			$counter.text(currentCount);
		}
		function set() {
			$counter.text(currentCount);
		}
		return {
			add: add,
			set: set
		};
	})();

	Counter.add();
});