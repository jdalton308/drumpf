$(function(){

	// APP LOGIC
	//==============================

	var $window = $(window);
	var $body = $('body');
	var $main = $('main');
	var $tripBtn = $('.trip-btn');


	// Analytics
	//----------
	var Analytics = (function(){
		function trip(screen) {
			// screen = 'desktop' || 'mobile'
			return dataLayer.push({'event': 'trip', 'screen': screen});
		}
		function share(network, action, target) {
			return dataLayer.push({'event': 'social', 'network': network, 'action': action, 'target': target});
		}
		return {
			trip: trip,
			share: share
		};
	})();


	// Social Tracking
	//-------------------------
	var $twitterBtn = $('.twit-icon');
	var $fbBtn = $('.fb-icon');
	var $shareIcons = $('.share-icon');

	$shareIcons.click(function(){
		var $this = $(this);
		var type = ( $this.hasClass('twit-icon') ) ? 'twitter' : 'facebook';
		var target = $this.attr('href');
		var action = 'share';

		Analytics.share(type, action, target);
	});



	// Instructions overlay
	//-----------------------
	var beenBefore = window.localStorage.getItem('trumptripped');

	if (beenBefore !== 'true') {
		$('.instructions').addClass('show');
		window.localStorage.setItem('trumptripped', 'true');
	}


	// Overlay 'Close' Btn
	//-----------------------
	var $closeBtn = $('.close-modal');
	$closeBtn.click(function(){
		var $overlay = $(this).closest('.overlay');
		$overlay.removeClass('show').addClass('hide');
	});


	// Overlay 'Close' Btn
	//-----------------------
	var $shareTab = $('.share-tab');
	var $shareCont = $shareTab.parents('.share-icons');
	$shareTab.click(function(){
		$shareCont.toggleClass('show');
	});


	// Trip Events
	//-----------------------

	// For moobile tripping...
	function watchRotation() {
		var ready = false;

		// Utility function to check for orientation
		function checkPortrait() {
			var windowHeight = window.innerHeight;
			var windowWidth = window.innerWidth;

			return (windowHeight > windowWidth);
		}

		// Show warning if starting with phone in landscape
		function isReady() {
			$body.addClass('ready');
			ready = true;
			$window.off('resize', readyHandler);
		}
		function readyHandler() {
			var isPortrait = checkPortrait();

			if (isPortrait) {
				isReady();
			}
		}

		// For mobile tripping...
		function tripHandler() {	
			function next() {
				Counter.add();
				Quotes.next();

				Analytics.trip('Mobile');
			}

			window.setTimeout(function(){
				var isPortrait = checkPortrait();

				if (isPortrait) {
					next();
				} else {
					Quotes.hide();
				}
			}, 200);
		}

		// On load, check for portrait, and watch if not
		if (checkPortrait()) {
			isReady();
		} else {
			$window.resize(readyHandler);
		}

		// Always watch for turns
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
			Quotes.hide();

			Analytics.trip('Desktop')
		}
		function resetTrip() {
			$main.removeClass('trip');
			isTripped = false;
			$tripBtn.text('TRIP');
			Counter.add();
			Quotes.next();
		}

		$tripBtn.click(function(ev){
			ev.stopPropagation();

			if (isTripped) {
				resetTrip();
			} else {
				makeTrip();
			}
		});
	}

	setBtn();



	// Quote Module
	//-----------------------
	var Quotes = (function quotes() {
		var quotes = [
			"If Ivanka weren’t my daughter, perhaps I’d be dating her.",
			"My fingers are long and beautiful, as, it has been well been documented, are various other parts of my body.",
			"I am being proven right about massive vaccinations. The doctors lied. Save our children and their future",
			"Laziness is a trait in the blacks. Black guys counting my money! I hate it.",
			"The only kind of people I want counting my money are little short guys that wear yamakas every day.",
			"26,000 unreported sexual assaults in the military. Only 238 convictions. What did these geniuses expect when they put men & women together?",
			"If Hillary Clinton can’t satisfy her husband what makes her think she can satisfy America.",
			"You could see there was blood coming out of her eyes. Blood coming out of her wherever.",
			"Today I officially declare my candidacy for President of the United States.",
			"An ‘extremely credible source’ has called my office and told me that Barack Obama’s birth certificate is a fraud.",
			"Ariana Huffington is unattractive, both inside and out. I fully understand why her former husband left her for a man – he made a good decision.",
			"I will build a great wall – and nobody builds walls better than me, believe me – and I’ll build them very inexpensively.",
			"I will build a great, great wall on our southern border, and I will make Mexico pay for that wall. Mark my words.",
			"When Mexico sends its people, they’re not sending the best. [...] They’re bringing drugs. They’re bring crime. They’re rapists… And some, I assume, are good people.",
			"All of the women on The Apprentice flirted with me – consciously or unconsciously. That’s to be expected.",
			"Our great African-American President hasn’t exactly had a positive impact on the thugs who are so happily and openly destroying Baltimore.",
			"I have never seen a thin person drinking Diet Coke.",
			"I think the only difference between me and the other candidates is that I’m more honest and my women are more beautiful.",
			"My IQ is one of the highest — and you all know it! Please don't feel so stupid or insecure; it's not your fault.",
			"Happy #CincoDeMayo! The best taco bowls are made in Trump Tower Grill. I love Hispanics!",
			"You know, it really doesn’t matter what the media write as long as you’ve got a young, and beautiful, piece of ass.",
			"We can't continue to allow China to rape our country",
			"Never, ever, ever in my life have I seen any transaction so incompetently negotiated as our deal with Iran. And I mean never [...] Israel will not survive.",
			"Donald J. Trump is calling for a total and complete shutdown of Muslims entering the United States until our country's representatives can figure out what is going on.",
			"When you get these terrorists, you have to take out their families [...] When they say they don’t care about their lives, you have to take out their families.",
			"I would bring back waterboarding, and I would bring back a hell of a lot worse than waterboarding. You can rest assured that as commander in chief, I would use whatever enhanced interrogation methods we could to keep this country safe.",
			"I’ve gone to gay weddings. I’ve been at gay weddings. I have been against [same-sex marriage] from the standpoint of the Bible, from the standpoint of my teachings as growing up and going to Sunday school and going to church.",
			"I supported [Sen. John McCain] for president [...] But you know, he lost, so I’ve never liked him as much after that, because I don’t like losers. [...] He’s not a war hero [...] He’s a war hero because he was captured. I like people that weren’t captured.",
			"The concept of global warming was created by and for the Chinese in order to make U.S. manufacturing non-competitive.",
			"If I were running 'The View,' I'd fire Rosie [O'Donnell]. I mean, I'd look her right in that fat, ugly face of hers, I'd say, 'Rosie, you're fired."
		];
		var usedQuotes = [];
		var $quoteBox = $('.quote');
		var $quoteText = $('.quote-box'); 

		function next() {

			// Get and remember the next quote's index
			function getIndex() {
				return Math.floor( Math.random()*quotes.length );
			}
			var nextIndex = getIndex();

			while (usedQuotes.indexOf(nextIndex) !== -1) {
				nextIndex = getIndex();
			}
			usedQuotes.push(nextIndex);

			// Reset 'usedQuotes' if full
			if (usedQuotes.length == quotes.length) {
				usedQuotes = [];
			}

			// Get and set next quote
			var nextQuote = quotes[nextIndex];

			$quoteText.text(nextQuote);

			// Show quote
			$quoteBox.removeClass('hide');
		}
		function hide() {
			$quoteBox.addClass('hide');
		}
		return {
			next: next,
			hide: hide
		};
	})();

	Quotes.next(); // called by tripHandler on first load



	// Counter Module
	//-----------------------
	var Counter = (function(){

		var $counter = $('.odometer-number');
		var $sessionCounter = $('.star-text');

		var lastVal;
		var sessionTrips = 0;

		// Firebase stuff
		var fbConfig = {
			apiKey: "apiKey",
			authDomain: "trip-drumpf.firebaseapp.com",
			databaseURL: "https://trip-drumpf.firebaseio.com"
		};
		var config = {
			apiKey: "AIzaSyAep4IrgwDLSTAVA1XhE2gDSOHkBA51bY0",
			authDomain: "trip-drumpf.firebaseapp.com",
			databaseURL: "https://trip-drumpf.firebaseio.com",
			storageBucket: "trip-drumpf.appspot.com",
		};
		firebase.initializeApp(config);

		// Sign-in to firebase
		var authEmail = 'jdalton308@yahoo.com';
		var authPass  = 'triptrump';
		firebase.auth().signInWithEmailAndPassword(authEmail, authPass)
			.then(function(result){
				// console.log('logged in');
			}).catch(function(error) {
				// Handle Errors
				var errorCode = error.code;
				var errorMessage = error.message;
				
				console.error('Could not authenticate with Firebase:');
				console.error(error);
		});

		// Get firebase db
		var dataRef = firebase.database().ref('/count');

		// Set-up sync with database
		dataRef.on("value", function(snapshot) {
			// console.log('Value:');
			// console.log(snapshot.val());
			var currentCount = snapshot.val();
			sessionTrips++

			$counter.text(currentCount);
			$sessionCounter.text(sessionTrips);
			lastVal = currentCount;
		}, function (errorObject) {
			// console.log('error on value event');
			// console.log(errorObject);

			lastVal++;
			sessionTrips++;
			$counter.text(lastVal);
		});

		// Update database, and firebase automatically updates value and calls the callback above
		function add() {
			dataRef.transaction(function(dataObj) {
				return (dataObj || 0) + 1;
			});
		}
		return {
			add: add
		};
	})();


});