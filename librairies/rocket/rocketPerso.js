function rocketcss(rocket, target, theclass) {
	var rockPar = $(rocket).parent();
	var tarPar = $(target).parent();
	var tmpRoc = $('#tmp_roc');
	var tmpTar = $('#tmp_tar');
	var cloned = $(rocket).clone();
	var offset_target = $(target).offset();
	var offset_rocket = $(rocket).position();
	var offset_rockPar = rockPar.offset();

	$(rocket).css({ "opacity": "0" });
	cloned.insertBefore(rocket);
	cloned.addClass("col-8");
	cloned.css({ "position": "fixed", "z-index": "999999","top": offset_rocket.top + "px", "left": offset_rocket.left + "px", "right": "auto", "bottom": "auto", "margin": "auto", "padding": "auto", "opacity": "1" })
		.animate({ 'top': (offset_target.top - offset_rockPar.top) + ($(target).height())/3 + 'px', 'left': (offset_target.left  - offset_rockPar.left) + $(target).width()/3 + 'px'}, 1500);

	cloned.addClass('mover ' + (theclass || 'rocketRotateHole') );

	setTimeout(function () {
		//Envoie vers div temporaire cachée
		$(target).prependTo(tmpTar);
		$(rocket).prependTo(tmpRoc);
		//Change les class
		$(target).removeClass("target col-12").addClass("stagiaire col-6 col-lg-4");
		$(rocket).removeClass("stagiaire col-6 col-lg-4").addClass("target col-12");
		//Envoie vers les div affichées
		$(tmpRoc).children().appendTo(tarPar).removeClass("animated zoomOut animated zoomIn");
		$(tmpTar).children().prependTo(rockPar);
		$('.stagiaire').click(function(){
			rocketcss(this, '.target', 'rocketCircle');
		});
		$("#target .target").off('click');
		//Destruction du clone
		cloned.remove();

		$(rocket).css({ "opacity": "1" });
	}, 2100);

	setTimeout(function () {
		$(target).addClass("animated zoomOut rocketFlip");
		setTimeout(function () {

			$(target).removeClass("rocketFlip animated zoomOut").addClass("animated zoomIn");
		}, 890);
	}, 1100);
	rockPar.children().removeClass('animated zoomIn');
}




$(document).ready(function(){
	$('.stagiaire').click(function(){
		rocketcss(this, '.target', 'rocketCircle');
	});
	$("#target .target").off('click');
});
