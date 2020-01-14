var $sec = $("section");
$(".next-section-btn").click(function(){
    var y = $sec.filter(function(i, el) {
        return el.getBoundingClientRect().bottom > 0;
    })[$(this).hasClass("next-section-btn")?"next":"prev"]("section").offset().top;
    $("html, body").stop().animate({scrollTop: y});
});