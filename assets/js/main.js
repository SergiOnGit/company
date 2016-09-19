(function($) {
	// DEFINE VARIABLES
	const body = $('body'),
		mainItem = $('.page-block'),
		sliderBox = $('.slider-box'),
		itemsModal = $('#page-modal'),
		itemContentModalClose = $('#page-modal-close'),
		itemsModalContent = $('#page-modal-content');
	// BECAUSE SOME BROWSERS RENDER FONTS DIFFERENTLY, SO WE NEED TO DEFINE SLIDER HEIGHT FOR GOOD LOOK
	$(window).resize(function(event) {
		var windowWidth = $(window).width();
		if (windowWidth > 959) {
			var mainItemHeight = mainItem.outerHeight();

			sliderBox.height(mainItemHeight * 2 + 20);
		} else {
			sliderBox.height('auto');
		}
	}).resize();
	// PARSE URL TO GET PAGE NAME AND NEWS ID
	function pageParameters(url) {
		segments = url.split('/');
		pageName = segments[1];
		newsId = segments[2];

		return [pageName, newsId];
	}
	// NEWS MODAL
	function newsItemModal(newsId, open, slider) {
		var newsItemModalBox = $('.news-item-modal-box'),
			newsItemModalContent = $('#news-item-modal-content');
		if (open === true && newsId != false && slider != true) {
			itemsModal.addClass('open-news');
			if(history.pushState) {
				history.pushState(null, null, '#/news/' + newsId);
			} else {
				document.location.hash = '/news/' + newsId;
			}
			newsItemModalBox.fadeIn('normal').scrollTop(0);
			newsItemModalContent.addClass('open');
		} else if(slider === true) {
			$('#news').trigger('click');
		} else {
			itemsModal.removeClass('open-news');
			if(history.pushState) {
				history.pushState(null, null, '#/news/');
			} else {
				document.location.hash = '/news';
			}
			newsItemModalBox.fadeOut('normal');
			newsItemModalContent.removeClass('open');
		}
	}
	// OPEN SLIDER NEWS LINK
	$('.slider-caption-more').click(function() {
		pageParameters(document.location.hash);
		newsItemModal(newsId, true, true);
	});
	// ITEMS CONTENT MODAL
	// open modal with hashtag
	$(window).on('load', function() {
		pageParameters(document.location.hash);
		mainItem.each(function(index, el) {
			if (pageName == $(this).attr('id')) {
				$(this).trigger('click');
			}
		});
	});
	// open
	mainItem.click(function(event) {
		// hide body overflow
		body.addClass('open');
		// get clicked page block info
		var dataPage = $(this).attr('id'),
			itemBackColor = $(this).css('background-color');
		// open styles
		itemContentModalClose.addClass('open');
		itemsModal.css('background-color', itemBackColor).addClass('open').fadeIn(400).scrollTop(0);
		// load page dynamically
		itemsModalContent.load('pages/' + dataPage + '.html', function() {
			// opened page variables
			var page = $('#page'),
				newsItemMore = $('.news-item-more'),
				newsItemModalClose = $('#news-item-modal-close');
			// add hashtag
			pageParameters(document.location.hash);
			console.log(document.location.hash);
			if (pageName == 'news' && newsId != undefined) {
				$('.news-item-more').each(function() {
					if($(this).attr('news-id') == newsId) {
						setTimeout(function() {
							newsItemModal(newsId, true);
						}, 1000);
					}
				});
			} else if (document.location.hash == '') {
				if(history.pushState) {
					history.pushState(null, null, '#/' + dataPage);
				} else {
					document.location.hash = '/' + dataPage;
				}
			}
			page.addClass(dataPage);
			setTimeout(function() {
				page.addClass('open');
			}, 300);
			// fade images for better look
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
				if(history.pushState) {
					history.pushState(null, null, ' ');
				} else {
					document.location.hash = ' ';
				}
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