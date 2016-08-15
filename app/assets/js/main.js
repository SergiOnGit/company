(function($) {
	// define variables
	var body = $('body');
	var mainItem = $('.page-block');
	var sliderBox = $('.slider-box');
	var itemsModal = $('#page-modal');
	var itemContentModalClose = $('#page-modal-close');
	var itemsModalContent = $('#page-modal-content');
	// some functions
	function pageParameters(url) {
		segments = url.split('/');
		pageName = segments[1];
		newsId = segments[2];

		return [pageName, newsId];
	}
	function newsItemModal(newsId, action) {
		var newsItemModalBox = $('.news-item-modal-box');
		var newsItemModalContent = $('#news-item-modal-content');
		if (action === true && newsId != false) {
			itemsModal.addClass('open-news');
			document.location.hash = '/news/' + newsId;
			newsItemModalBox.fadeIn('normal').scrollTop(0);
			newsItemModalContent.addClass('open');
		} else {
			itemsModal.removeClass('open-news');
			document.location.hash = '/news';
			newsItemModalBox.fadeOut('normal');
			newsItemModalContent.removeClass('open');
		}
	}
	// because some browsers render fonts differently we need to define slider height for good look
	$(window).resize(function(event) {
		var windowWidth = $(window).width();
		if (windowWidth > 959) {
			var mainItemHeight = mainItem.outerHeight();

			sliderBox.height(mainItemHeight * 2 + 20);
		} else {
			sliderBox.height('auto');
		}
	}).resize();
	// ITEMS CONTENT MODAL
	// open modal with hashtag
	$(window).on('load', function() {
		pageParameters(document.location.hash);
		mainItem.each(function(index, el) {
			if (pageName == $(this).attr('data-page')) {
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
		// open styles
		itemContentModalClose.addClass('open');
		itemsModal.css('background-color', itemBackColor).addClass('open').fadeIn(400).scrollTop(0);
		// load page dynamically
		itemsModalContent.load('pages/' + dataPage + '.html', function() {
			// opened page variables
			var page = $('#page');
			var newsItemMore = $('.news-item-more');
			var newsItemModalClose = $('.news-item-modal-close');
			// add hashtag
			pageParameters(document.location.hash);
			if (pageName == 'news' && newsId != undefined) {
				$('.news-item-more').each(function() {
					if($(this).attr('news-id') == newsId) {
						setTimeout(function() {
							newsItemModal(newsId, true);
						}, 1000);
					}
				});
			} else if (document.location.hash == '') {
				document.location.hash = '/' + dataPage;
			}
			page.addClass(dataPage);
			setTimeout(function() {
				page.addClass('open');
			}, 300);
			$('.img-fade').each(function() {
				$(this).on('load', function() {
					$(this).fadeIn();
				});
			});
			// news page news opening
			newsItemMore.click(function(event) {
				var newsId = $(this).attr('news-id');
				newsItemModal(newsId, true);
			});
			newsItemModalClose.click(function(event) {
				newsItemModal(false, true);
			});
			// close
			itemContentModalClose.click(function(event) {
				// show body overflow
				body.removeClass('open');
				// remove hashtag
				document.location.hash = '';
				pageParameters(document.location.hash);
				// remove open styles
				itemsModal.removeClass('open').fadeOut(400);
				page.removeClass('open');
				itemContentModalClose.removeClass('open');
				setTimeout(function() {
					itemsModal.hide();
					itemsModalContent.empty();
				}, 400);
			});
		});
	});
}(jQuery));