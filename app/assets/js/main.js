(function($) {
	// define variables
	var documentHash = document.location.hash;
	var body = $('body');
	var mainItem = $('.page-block');
	var sliderBox = $('.slider-box');
	var itemsModal = $('#page-modal');
	var itemsModalWrap = $('#page-modal-wrap');
	var itemContentModalClose = $('#page-modal-close');
	var itemsModalContent = $('#page-modal-content');
	// because some browsers render fonts differently we need to define slider height for good look
	$(window).resize(function(event) {
		var windowWidth = $(window).width();
		if (windowWidth > 959) {
			var mainItemHeight = $('.page-block').outerHeight();

			sliderBox.height(mainItemHeight * 2 + 20);
		} else {
			sliderBox.height('auto');
		}
	}).resize();
	// ITEMS CONTENT MODAL
	// open modal with hashtag
	$(window).on("load", function(){
		mainItem.each(function(index, el) {
			if (documentHash == '#' + $(this).attr('data-page')) {
				$(this).trigger('click');
			}
		});
	});
	// open
	mainItem.click(function(event) {
		// hide body overflow
		body.addClass('open');
		// get clicked page block info
		var dataPage = $(this).attr('data-page');
		var itemBackColor = $(this).css('background-color');
		// add hashtag
		history.pushState(null, null, "#" + dataPage);
		itemsModal.show();
		// load page dynamically
		itemsModalContent.load("pages/" + dataPage + ".html", function() {
			// opened page variables
			var page = $('#page');
			// open styles
			page.addClass(dataPage);
			itemContentModalClose.addClass('open');
			itemsModalWrap.css('background-color', itemBackColor).addClass('open').fadeIn(400).scrollTop(0);
			setTimeout(function() {
				itemsModalContent.addClass('open');
			}, 300);
		});
		// close
		itemContentModalClose.click(function(event) {
			// show body overflow
			body.removeClass('open');
			// remove hashtag
			history.pushState(null, null, " ");
			// remove open styles
			itemsModalWrap.removeClass('open').fadeOut(400);
			itemsModalContent.removeClass('open');
			itemContentModalClose.removeClass('open');
			setTimeout(function() {
				itemsModal.hide();
				itemsModalContent.empty();
			}, 400);
		});
	});
}(jQuery));