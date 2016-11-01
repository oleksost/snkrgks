console.log("Hallo");

var riched_end_intro=false;

var backgrounds=["img/3.png", "img/2.png","img/4.png","img/1.png" ];


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


function header_show(){
  $("#header").css({top: 0});
}

function header_hide(){
  if ($("#header").position().top==0){
    $("#header").css({top: "-100px"});
  }


}

addWheelListener( window, function( e ) {

    console.log($("#header").outerHeight());

    var position = $('intro').position();
    var new_position=position.left;

    if (riched_end_intro==true && $(window).scrollTop()>=$('#main').offset().top-100){
      header_show();
    }else if ($(window).scrollTop()<$('#main').offset().top-100){
      header_hide();
    }

    if(!($(window).scrollTop()>0)){
    	var new_position=position.left-e.deltaY;
    }

    if(new_position>0){  new_position=0;} else

    if ((-new_position>=$('intro').innerWidth()-$(window).width())&&!riched_end_intro)
    {
        $("body").removeClass("horizontal-scroll");
        //calculate new position
        new_position=-$('intro').innerWidth()+$(window).width();
        $('intro').css({left: new_position});
        riched_end_intro = true;
        $("#introduction").css("visibility", "hidden");
    }
    if(!riched_end_intro){
      $('intro').css({left: new_position});
     }
    if((!riched_end_intro) && !($(window).scrollTop()>0) && !(e.deltaY<1)){
    e.preventDefault();
        console.log("preventing default");
    }
}
    //,{passive: true}
);



/*
$(function() {
   $("html, body, *").mousewheel(function(event, delta) {

       console.log($(document).scrollLeft());

       if (!riched_end_intro){
           this.scrollLeft -= (delta );
           this.scrollRight -= (delta);
           event.preventDefault();
       }
       if ($(document).scrollLeft()==$(document).width()-$(window).width()){
           riched_end_intro=true;
           $("#main").show();
       }

   });
});
*/

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
    console.log($("#wwd-section").offset().top);
    console.log("Click");
    $("#kreis").addClass("remove");



    $('html, body').animate({
        scrollTop: $("#wwd-section").offset().top - $("#header").outerHeight()-20
    }, 1000);

    $("#wwd-section").addClass("altitude_expand");
    $("#description-wwd").addClass("vertical-scroll");
    $("body").addClass("deactivate");
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

function hide_wwd(){
    $("body").removeClass("deactivate");
     $(".hidden_altitude").hide();
     $("#container-close").hide();
     $("#wwd-section").removeClass("altitude_expand");
     $("#description-wwd").removeClass("vertical-scroll");
     $("#kreis").removeClass("remove");
     $("#more_altitude").show();
}


window.onload=function(){ window.scrollTo(0,0); console.log("wind");};

$( document ).ready(function() {
    window.scrollTo(0,0);
    console.log("doc");
})



