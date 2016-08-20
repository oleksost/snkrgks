var previous_vertical;

(function(window, document) {
    var prefix = "", _addEventListener, support;
    // detect event model
    if ( window.addEventListener ) {
    _addEventListener = "addEventListener";
}
else {
    _addEventListener = "attachEvent";
    prefix = "on";
}
// detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll";
    // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
    _addWheelListener( elem, support, callback, useCapture );
    // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
    _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
}
}
;
    function _addWheelListener( elem, eventName, callback, useCapture ) {
    elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
    !originalEvent && ( originalEvent = window.event );
    // create a normalized event object
            var event = {
    // keep a ref to the original event object
                originalEvent: originalEvent, target: originalEvent.target || originalEvent.srcElement, type: "wheel", deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1, deltaX: 0, deltaY: 0, deltaZ: 0, preventDefault: function() {
    originalEvent.preventDefault ?
                        originalEvent.preventDefault() : originalEvent.returnValue = false;
}
}
;
    // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
    event.deltaY = - 1/40 * originalEvent.wheelDelta;
    // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
}
else {
    event.deltaY = originalEvent.detail;
}
// it's time to fire the callback
            return callback( event );
}
, useCapture || false );
}
}
)(window, document);
    
    


// add color-theme-class to document
$(function () {
	var theme = ['red', 'yellow', 'green', 'blue'];
	var theme = theme[Math.floor(Math.random() * (4 - 1 + 1))];
	$('#body').addClass(theme + '-theme');
});


// Scroll animation for elements
$(function () {
	var unfixEl = document.getElementById('boana-pattern');

	$(window).scroll(function() {
		
		var screenPosition = unfixEl.getBoundingClientRect();
		if (Math.round(screenPosition.left) <= 0) {
			$('#boana-pattern').addClass('unfix');
		}
		else {
			$('#boana-pattern').removeClass('unfix');
		}
	});
});


/*
$(window).scroll(function() {
	console.log(previous_vertical);
   if($(window).scrollLeft() + $(window).innerWidth() == $(document).innerWidth()) {
       //alert("bottom!");
       //scrollConverter.deactivate();
       $("body").addClass("vertical-scroll");
       scrollConverter.deactivate();
   }
   if(($(window).scrollTop()==0)&&($(window).scrollTop()-previous_vertical<0)) {
       //alert("bottom!");
       //scrollConverter.deactivate();
       $("body").removeClass("vertical-scroll");
       scrollConverter.activate();
   }
   previous_vertical=($(window).scrollTop());

});
*/

addWheelListener( document, function( e ) {
    //console.log( e.deltaY < 0 ? "up" : "down" );
    var riched_end_main=false;
    var position = $('intro').position();
    var new_position=position.left;
    if(!($(window).scrollTop()>0)){
    	var new_position=position.left-e.deltaY;
    }

    if(new_position>0){new_position=0;} else 

    if (-new_position>=$('intro').innerWidth()-$(window).width())
    {
    	//RICHED THE END OF MAIN

      //animate header appearance
      $(".header").animate({"top": "0px"}, 500);

      //calculate new position
    	new_position=-$('intro').innerWidth()+$(window).width();
    	riched_end_main=true;

    }

    $('intro').css({left: new_position});
    if(!riched_end_main&& !($(window).scrollTop()>0)){
    e.preventDefault(); 
    }
} );


//changing background pics periodicaly
/*$(function() {
  var introduction = $('#introduction');
  var backgrounds = ['url(img/1.png)', 'url(img/2.png)'];
var current = 0;

function nextBackground() {
  introduction.animate({opacity: 0}, 'slow', function() {
        $(this)
            .css('background', backgrounds[current = ++current % backgrounds.length])
            .animate({opacity: 1});
    });
 

 setTimeout(nextBackground, 5000);
 }
 setTimeout(nextBackground, 5000);
   introduction.css('background', backgrounds[0]);
 });

*/

