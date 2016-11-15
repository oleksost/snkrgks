var riched_end_intro=false;
var backgrounds=["img/2.png","img/1.png" ];
var aChildren = $("#header .menu-container").children();
var aArray = [];
for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(".container-link a", aChild).attr('href');
        console.log(ahref);
        aArray.push(ahref);
    }

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


function header_show(){
  $("#header").css({top: 0});
}

function header_hide(){
  if ($("#header").position().top==0){
    $("#header").css({top: "-100px"});
  }


}


addWheelListener( window, function( e ) {
    if (!riched_end_intro) {

    var position = $('intro').position();
    var new_position = position.left;

        if (!($(window).scrollTop() > 0)) {
            var new_position = position.left - e.deltaY;
        }

        if (new_position > 0) {
            new_position = 0;
        } else if ((-new_position >= $('intro').innerWidth() - $(window).width()) && !riched_end_intro) {
            $("body").removeClass("horizontal-scroll");
            //calculate new position
            new_position = -$('intro').innerWidth() + $(window).width();
            $('intro').css({left: new_position});
            riched_end_intro = true;
        }
        if (!riched_end_intro) {
            $('intro').css({left: new_position});
        }
        if ((!riched_end_intro) && !($(window).scrollTop() > 0) && (e.deltaY >= 1||e.deltaX != 0)) {
            e.preventDefault();
        }
    }
}
    //,{passive: true}
);

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        if (!riched_end_intro) {

            e.preventDefault();
        }
    }
}, false);

$(window).scroll(function() {
    if (riched_end_intro) {

        var windowPos = $(window).scrollTop() + 1; // get the offset of the window from the top of page
        var main_offset =$('#main').offset().top - 100;
        if (windowPos >= main_offset) {
        header_show();
        } else if (windowPos < main_offset) {
        header_hide();
        }

        for (var i = aArray.length - 1; i >= 0; i--) {
            var theID = aArray[i];
            var divPos = Math.round($(theID).offset().top); // get the offset of the div from the top of page
            var divHeight = Math.round($(theID).height()); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $(".menu-element:has( a[href='" + theID + "'])").addClass("nav-active");
            } else {
                $(".menu-element:has( a[href='" + theID + "'])").removeClass("nav-active");
            }
        }
    }
});

function resize(){
    if(riched_end_intro){
    //set new position for the intro part if resized
    var position=$('intro').position();
    var new_position= position.left + ($( window ).width() - (position.left+$('intro').width()));
    $('intro').css({left: new_position});
  }
    if ($("#wwd-section").hasClass("altitude_expand")){
        $('html, body').animate({
        scrollTop: $("#wwd-section").offset().top - $("#header").outerHeight()-20
    }, 1000);

    }

}
$( window ).resize(function() {
  resize();
});

$(document).ready(function() {
  for (i in backgrounds){
    pfad='url('+backgrounds[i]+') no-repeat';
    $('<div />').attr('id', i).css({"background": pfad}).appendTo('#background');

  }
//changing background pics periodicaly
$(function() {
  var current = Math.floor((Math.random() * (backgrounds.length)) + 0);

  $('#'+current).css({opacity:1});
  var next=current;
function nextBackground() {
  var introduction = $('#'+current);

  if (current==backgrounds.length-1){
     current=0;
     next=0;
   }else{
    current++;
    next++;
   }
  introduction.animate({opacity: 0}, 'slow', function() {
        $('#'+next).animate({opacity: 1}, 'slow');
    });
 setTimeout(nextBackground, 5000);
 }
 setTimeout(nextBackground, 5000);
 });

});

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

$("#more_altitude").click(function(){

    $('html, body').animate({
        scrollTop: $("#wwd-section").offset().top - $("#header").outerHeight()-20
    }, 1000);
    $("body").addClass("deactivate");
    $("#kreis-container").addClass("remove");
    max_height=$("#wwd-section").height();
    $("#wwd-section").css("max-height", max_height);
    $("#wwd-section").css("min-height", max_height);

    $("#wwd-section").addClass("altitude_expand");
    $("#description-wwd").addClass("vertical-scroll");
    $(".hidden_altitude").show();
    $("#container-close").show();
    $("#more_altitude").hide();


    //$("body").toggleClass("noScroll")

})

//===========CONTROLS=============//

$(".menue-button").click(function(){
     riched_end_intro=true;
     resize();
     //$("#main").show();
     hide_wwd();
});

$("#close").click(function () {
     hide_wwd();


})

//======================================//

function hide_wwd(){
    $("body").removeClass("deactivate");
     $(".hidden_altitude").hide();
     $("#container-close").hide();
     $("#wwd-section").removeClass("altitude_expand");
     $("#description-wwd").removeClass("vertical-scroll");
     $("#kreis-container").removeClass("remove");
     $("#more_altitude").show();
}


var counter = 0;

(function(){
    if (counter==phraseList.length){counter=0;}
    text=phraseList[counter].saying;
    author=phraseList[counter].author;
    $("#container-speach").animate({opacity:0},400, function() {
        $("#container-speach #saying").text(text);
        $("#container-speach #author").text(author);
        $("#container-speach").animate({opacity:1},400, function() {})
        counter=counter +1;

    });

    setTimeout(arguments.callee, 5000);


})();

$(window).on('beforeunload', function() {
    $("body").addClass("horizontal-scroll");
    $(window).scrollTop(0);
});




