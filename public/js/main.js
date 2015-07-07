//    Site Name
//    Website: https://
//    Author: 
//    Date Created: 

;
'use strict';

var Utils = ( function() {
  
  // used for making scroll and resize event listeners more efficient - unnecessary if using jquery
  var throttleTimeout = 50;
  
	var throttle = function( delay, fn ) {
		var last, deferTimer;
		return function() {
			var context = this, args = arguments, now = +new Date;
			if( last && now < last + delay ) {
				clearTimeout( deferTimer );
				deferTimer = setTimeout( function() { last = now; fn.apply( context, args ); }, delay );
			}
			else {
				last = now;
				fn.apply( context, args );
			}
		};
	};

  return {
    throttleTimeout:  throttleTimeout,
    throttle:         throttle
  }

})( window );

// Begin
(function(){

  // doc ready...

})();

// throttled scroll event - unnecessary if using jquery
window.addEventListener( 'scroll', Utils.throttle( Utils.throttleTimeout, function() {

}) );

// throttled resize event - unnecessary if using jquery
window.addEventListener( 'resize', Utils.throttle( Utils.throttleTimeout, function() {

}) );
