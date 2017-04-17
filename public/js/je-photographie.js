// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 900, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top' ,
    offset: 75
});

//Creation of the banner carousel
// Activate the Carousel
$("#banner").carousel();

// Enable the Carousel Indicators
$(".item1").click(function(){
    $("banner").carousel(0);
});

// Enable the Carousel Indicators
$(".item2").click(function(){
    $("banner").carousel(1);
});

// Enable the Carousel Indicators
$(".item3").click(function(){
    $("banner").carousel(2);
});

// Enable Carousel Controls
$(".left").click(function(){
    $("#banner").carousel("prev");
});

// Enable Carousel Controls
$(".right").click(function(){
    $("#banner").carousel("next");
});


// Header carousel slider
$('.carousel').carousel({
    interval: 3000
});
