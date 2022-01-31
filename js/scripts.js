document.addEventListener('DOMContentLoaded', function(){
	
    // $("input[type='tel']").mask("+7 (999) 999-99-99");

    // Let it snow
	// $('.header .header-row.second').css({backgroundPositionY:'0px'});

	// var to;

	// function infinite(){
	//  to = setTimeout(function(){
	//     $('.header .header-row.second').animate({backgroundPositionY:"300px"}, 35000, "linear", function(){
	//       $('.header .header-row.second').css({backgroundPositionY:'0px'});
	//       infinite();
	//     });    
	//   });
	// }
	// infinite();

	// Mobile top nav
	$('.mobile-top-nav').each(function(i, el){
		let currentLayer = 1;

		function goDeep(selector) {
			currentLayer++;

			console.log(selector);

			$(selector).show().siblings().hide();
			$(el).attr('data-layer', currentLayer);
		}

		function goBack(){
			currentLayer--;
			$(el).attr('data-layer', currentLayer);
		}

		$(el).find('[data-subnav]').click(function(e){
			e.preventDefault();

			goDeep( $(this).data('subnav') );
		});

		$(el).find('.back-link').click(function(e){
			e.preventDefault();

			goBack();
		});

		let tabMenu = $(el).find('.tab-menu');

		tabMenu.find('.menu-item-has-children').click(function(e){
			$(this).find('.sub-menu').stop().slideToggle(300);
			$(this).toggleClass('opened');
		});

		tabMenu.find('.menu-item-has-children a').click(e => e.preventDefault());
	});

	$('.mobile-top-nav').on('click', '.categories-nav .menu-item-has-children > a', function(e){
		if ($(window).width() >= 768) return;

		$(this).toggleClass('opened');
		$(this).siblings('.sub-menu').stop().slideToggle(300);
	});

	// New top nav
	$('[data-submenu]').hover(function(){
		const submenu = $(this).data('submenu');

		$(submenu).addClass('visible').siblings().removeClass('visible');
		$(this).addClass('opened').siblings().removeClass('opened');
	}, function(){
		$('.top-nav-submenus .submenu').removeClass('visible');
		$('.top-nav [data-submenu]').removeClass('opened');
	});

	$('.top-nav-submenus .submenu').hover(function(){
		const navItemId = '#' + $(this).attr('id');

		$(`[data-submenu="${ navItemId }"]`).addClass('opened').siblings().removeClass('opened');

	}, function(){
		$('.top-nav [data-submenu]').removeClass('opened');
	});

	$('.top-nav-submenus .cmp-close-btn').click(function(e){
		e.preventDefault();

		$('.new-header .header-row.third').css({
			'pointer-events': 'none'
		});

		$(this).blur();

		setTimeout(function(){
			$('.new-header .header-row.third').css({
				'pointer-events': 'auto'
			});
		}, 400);
	});

	// Tabs
	$("[data-content-id]").click(function(e){
		// e.preventDefault();
	});

	$("[data-content-id]").hover(function(e){
		// e.preventDefault();
		e.stopPropagation();

		const dest = $( $(this).data('content-id') );

		$(dest).stop().show(0).siblings().hide(0);

		$(this).addClass('current').parent().siblings().find("[data-content-id]").removeClass('current');

		$(dest).find('.slick-slider').slick('setPosition');
	});

	$('.services-nav-component .cmp-side-nav').each(function(i, el){
		$(el).find("[data-content-id]").eq(0).trigger('mouseenter');
	});

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-arrow slick-prev" aria-label="РџСЂРµРґС‹РґСѓС‰РёРµ"><svg viewBox="0 0 290 492" xmlns="http://www.w3.org/2000/svg"><path d="M97 246L281 62a27 27 0 000-38L265 8a27 27 0 00-38 0L8 227a27 27 0 000 38l219 219a27 27 0 0038 0l16-16c10-10 10-28 0-38L97 246z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-arrow slick-next" aria-label="РЎР»РµРґСѓСЋС‰РёРµ"><svg viewBox="0 0 290 492" xmlns="http://www.w3.org/2000/svg"><path d="M192 246L8 62a27 27 0 010-38L24 8a27 27 0 0138 0l219 219a27 27 0 010 38L62 484a27 27 0 01-38 0L8 468a27 27 0 010-38l184-184z"/></svg></button>'
	}

	$('.first-screen-slider-wrapper').each(function(i, el){
		$(el).find('.first-screen-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			...arrowsButtons,
			appendArrows: $(el).find('.nav-arrows'),
			dots: false,
			infinite: true,
			autoplay: true,
			  autoplaySpeed: 5000,
			  pauseOnHover:false,
			speed: 600
		});

		equalSlideHeight($(el).find('.first-screen-slider'));
	});

	$('.photos-slider-wrapper').each(function(i, el){
		$(el).find('.photos-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			lazyLoad: 'progressive',
			arrows: true,
			...arrowsButtons,
			dots: true,
			appendArrows: $(el).find('.nav-arrows'),
			infinite: true,
			speed: 600,
			vertical: true,
			responsive: [
				{
					breakpoint: 576,
					settings: {
						vertical: false,
						lazyLoad: 'progressive',
						arrows: false
					}
				}
			]
		});
	});

/*     $(window).on('load resize orientationchange', function() {
				$(".photos-slider-wrapper .photos-slider").slick('slickSetOption', 'adaptiveHeight', true, true);
				 $(".photos-slider-wrapper .photos-slider").slick('reinit'); 
    }); */

	$('.sub-category_content').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: 'progressive',
		arrows: true,
		...arrowsButtons,
		dots: false,
		appendArrows: $('.sub-category-wrapper').find('.nav-arrows'),
		infinite: true,
		speed: 600,
		vertical: false,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					vertical: false,
					lazyLoad: 'progressive',
					arrows: false
				}
			}
		]
	});
	
	$('.photos-slider-wrapper_horizontal').each(function(i, el){
		$(el).find('.photos-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			lazyLoad: 'progressive',
			arrows: true,
			...arrowsButtons,
			dots: false,
			appendArrows: $(el).find('.nav-arrows'),
			infinite: true,
			speed: 600,
			vertical: false,
			responsive: [
				{
					breakpoint: 576,
					settings: {
						vertical: false,
						lazyLoad: 'progressive',
						arrows: false
					}
				}
			]
		});
	});

	$('.equipment-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: true,
		speed: 600,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: true,
					slidesToShow: 2
				}
			}
		]
	});

	$('.team-slider').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: false,
		infinite: true,
		speed: 600,
		responsive: [
			{
				breakpoint: 1250,
				settings: {
					slidesToShow: 2,
					// arrows: false
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true
				}
			}
		]
	});

	equalSlideHeight('.team-slider');

$('.cars-slider').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: true,
		infinite: true,
		speed: 600,
		responsive: [
			{
				breakpoint: 1250,
				settings: {
					slidesToShow: 4,
					// arrows: false
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true
				}
			}
		]
	});

	equalSlideHeight('.cars-slider');


	$('.reviews-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		adaptiveHeight:true,
		arrows: true,
		...arrowsButtons,
		dots: true,
		infinite: false,
		speed: 600,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}
		]
	});

	equalSlideHeight('.reviews-slider');

	$('.licenses-slider:not(.small)').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		...arrowsButtons,
		infinite: false,
		speed: 600,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 420,
				settings: {
					slidesToShow: 2,
					arrows: false,
					dots: true
				}
			}
		]
	});

	$('.licenses-slider.small').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: false,
		infinite: true,
		speed: 600,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					dots: true
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 420,
				settings: {
					slidesToShow: 2,
					arrows: false,
					dots: true
				}
			}
		]
	});

	equalSlideHeight('.licenses-slider');


	$('.aktsii-slider').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 2,
		slidesToScroll: 1,
		adaptiveHeight:true,
		arrows: true,
		...arrowsButtons,
		dots: true,
		infinite: false,
		speed: 600,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}
		]
	});

	equalSlideHeight('.aktsii-slider');

	$('.news-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		adaptiveHeight:true,
		arrows: true,
		...arrowsButtons,
		dots: true,
		infinite: false,
		speed: 600,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}
		]
	});

	equalSlideHeight('.news-slider');





	$('.partners-slider').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		infinite: true,
		speed: 600,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 4,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2
				},
				dots: true
			},
			{
				breakpoint: 420,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});

	equalSlideHeight('.partners-slider');

	$('.clients-slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: true,
		infinite: true,
		speed: 600,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					arrows: false
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					arrows: false
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			},
			{
				breakpoint: 420,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}
		]
	});

	equalSlideHeight('.clients-slider');

	if ($(window).width() < 768) {
		$('.advantages-slider, .directions-slider').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			infinite: true,
			speed: 600,
			responsive: [
				{
					breakpoint: 520,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});

		equalSlideHeight('.advantages-slider, .directions-slider');
	}
	$('.benefit-slider').slick({
		slidesToShow: 3,
		rows: 1,
		slidesToScroll: 3,
		arrows: false,
		dots: true,
		infinite: true,
		speed: 600,
		responsive: [
			{
				breakpoint: 520,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	});
	if ($(window).width() < 576) {
		$('.services-slider').slick({
			slidesToShow: 2,
			rows: 2,
			slidesToScroll: 2,
			arrows: false,
			dots: true,
			infinite: true,
			speed: 600
		});

		equalSlideHeight('.services-slider');
	}

	$('.select').on('change', function(e){
		$(this).find('[selected][disabled]').remove();
		$(this).addClass('changed');
		$(this).off('change');
	});

	$('.checkbox a').click(function(e){
		e.stopPropagation();
	});
	$('.text-link_select').click(function(e){
		document.querySelector('.prices-header').style.border = "solid 2px red";
	});

	// Branches nav
	$('.branches-nav-component .cmp-opener').click(function(e){
		e.preventDefault();
		$(this).blur();

		$(this).closest('.branches-nav-component').toggleClass('opened');
	});

	$('.branches-nav-component .cmp-close').click(function(e){
		e.preventDefault();
		$(this).blur();

		$(this).closest('.branches-nav-component').removeClass('opened');
	});

	// History
	$('.history-gallery').each(function(i, el){
		$(el).find('.timeline-slider').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			...arrowsButtons,
			dots: false,
			infinite: false,
			speed: 600,
			centerMode: true,
			centerPadding: '3%',
			focusOnSelect: true,
			initialSlide: 0,
			asNavFor: $(el).find('.content-slider'),
			responsive: [
				{
					breakpoint: 440,
					settings: {
						slidesToShow: 3,
						initialSlide: 3
					}
				}
			]
		});

		$(el).find('.content-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: false,
			speed: 600,
			initialSlide: 0,
			asNavFor: $(el).find('.timeline-slider'),
			adaptiveHeight: true
		});
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		let offset = 240;

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - offset
		}, 500);
		$(this).blur();
	});

	// Menu opener
	// $('.menu-opener').click(function(e){
	// 	e.preventDefault();

	// 	$(this).toggleClass('active');
	// 	$('.panel').toggleClass('opened');
	// 	$('body').toggleClass('menu-opened');
	// 	$(this).blur();
	// });

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
	});

	// Close menu by click outside
	// $(document).click(function(e){
	// 	if (!e.target.closest('.menu-opener') && !e.target.closest('.panel')) {
	// 		$('.menu-opener').removeClass('active');
	// 		$('.mobile-top-nav').removeClass('opened');
	// 		// $('.panel').removeClass('opened');
	// 		$('body').removeClass('menu-opened');
	// 	}
	// });

	// 

	$('.panel-close').click(function(e){
		e.preventDefault();

		$('.menu-opener').removeClass('active');
		$('.panel').removeClass('opened');
		$('body').removeClass('menu-opened');
		$(this).blur();
	});

	// 
	if ($(window).width() < 768) {
		$('[data-mob-placeholder]').each(function(i, el){
			let placeholder = $(el).data('mob-placeholder');

			$(el).attr('placeholder', placeholder);
		});
	}

	// Mobile nav
	// $('.mobile-top-nav a').click(function(){
	// 	$('.menu-opener').click();
	// });

	// $('.mobile-nav .current-menu-parent').addClass('opened').find('.sub-menu').stop().slideToggle(300);

	// $('.mobile-nav .menu-item-has-children > a').click(function(e){
	// 	e.preventDefault();
	// });

	// $('.mobile-nav .menu-item-has-children li a').click(function(e){
	// 	e.stopPropagation();
	// });

	// $('.mobile-nav .menu-item-has-children').click(function(){
	// 	$(this).toggleClass('opened').find('.sub-menu').stop().slideToggle(300);
	// });
	
    // Mobile Menu
    $('.panel-ac-nav > .menu-item-has-children').click(function(){
        $(this).toggleClass('opened').find('.sub-menu').stop().slideToggle(300);
    });

    $('.panel-ac-nav .sub-menu .menu-item-has-children').click(function(e){
        e.stopPropagation();
        $(this).toggleClass('opened').find('.parent-sub-menu').stop().slideToggle(300);
    });

    $('.panel-ac-nav .menu-item-has-children a').click(function(e){
        if( $(this).closest('.panel-ac-nav .menu-item-has-children,.panel-ac-nav .sub-menu .menu-item-has-children').hasClass('opened') ) {
            e.stopPropagation();
        } else {
            e.preventDefault();
        }
    })
    
    $('.panel-ac-nav .sub-menu > .current-menu-item,.panel-ac-nav .sub-menu > .current-menu-parent').each(function(){
        $(this).addClass('opened').find('.sub-menu').stop().slideToggle(300);
        $(this).addClass('opened').find('.parent-sub-menu').stop().slideToggle(300);
    });

	// Sticky Header
	$(window).scroll(function(){
		if ($(window).scrollTop() > 0) {
			$('.new-header').addClass('sticky');
			$('.new-header .on-sticky').stop().slideDown(300);
			// $('.page-content').addClass('martt');
		}
		else {
			$('.new-header').removeClass('sticky');
			$('.new-header .on-sticky').stop().slideUp(300);
			// $('.page-content').removeClass('martt');
		}
	});

	// Select Field
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: true,
		fakeDropInBody: false
	});

	jcf.replace( $('.form-field select') );

	// Modals
	$('.modal').css('display','block');

	function getScrollWidth(){
		// create element with scroll
		let div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';

		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;

		div.remove();

		return scrollWidth;
	}

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		showModal( $(this).data('modal') );
	});

	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').html('<iframe class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=0&autoplay=1&transparent=0&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});

	window.showModal = showModal;


	// Video
	$('.video-block:not([data-video-modal])').on('click', function () {
		$(this).addClass('playing');

		var $videoId = $(this).data('video-id');
		$(this).append('<div class="video-iframe" id="'+$videoId+'"></div>');
		createVideo($videoId, $videoId);
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					e.target.playVideo();
				}
			}
		});
	}

	$('.modal-btn').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 800);
	});

	let bodyScrolled = 0;
	function showModal(modal){
		$(modal).addClass('visible');
		bodyScrolled = $(window).scrollTop();
		$('body').addClass('modal-visible')
				 .scrollTop(bodyScrolled)
				 .css('padding-right', getScrollWidth());

		$('[data-src]').each( (i, el) => {
			$(el).attr('src', $(el).data('src'));
			el.removeAttribute('data-scr');
		} );
	}

	function hideModal(modal){
		$(modal).removeClass('visible');
		bodyScrolled = $(window).scrollTop();
		$('body').removeClass('modal-visible')
				 .scrollTop(bodyScrolled)
				 .css('padding-right', 0);

		$('#modal-video .video-iframe').hide();
	}

	function goToTab(tabId, handler){
		if (handler == undefined) {
			handler = false;
		}

		let dest = $( tabId );
		dest.stop().fadeIn(300).siblings().hide(0);

		if (handler != false) {
			$(handler).addClass('current').parent().siblings().find("[data-tab]").removeClass('current');
		}

		//bLazy.revalidate();
	}

	// Tabs
	$("[data-tab]").click(function(e){
		e.preventDefault();
		let dest = $( $(this).data('tab') );

		goToTab(dest, $(this));

		dest.find('.slick-slider').slick('setPosition');
		$(this).blur();
	});

	$('.locations-list li:first-child [data-tab]').click();
	$('[data-tab].preselected').click();

	$('body').on('change', '.tabs-select', function(e){
		let dest = $(this).find('option:selected').attr('value');

		// goToTab(dest);
	});

	$('.tabs-select').trigger('change');

	$('.tabs-nav').each(function(i, el){
		$(el).find("[data-tab]").eq(0).trigger('click')
	});
	$("[data-tab].preselected").trigger('click');

    $('.filial-services-container').children().each(function(){
    	let id = $(this).attr('id');
    	if( $(this).find('.services-slider').children().length === 0 ) {
      		$('[data-tab="#' + id + '"]').hide();
      	}
    });

	$('.postid-7050 .filialy-prices .tabs-nav li:last-child [data-tab]').click(); // /filialy/m-yasenevo/
	$('.postid-4565 .filialy-prices .tabs-nav li:last-child [data-tab]').click(); // /filialy/m-myakinino/
	$('.postid-11006 .filialy-prices .tabs-nav li:last-child [data-tab]').click(); // /filialy/m-chertanovskaya/
	$('.postid-9903 .filialy-prices .tabs-nav li:last-child [data-tab]').click(); // /filialy/m-otradnoe/


	// Prices Filter
	$('.tableprice').each(function(i, table) {
	    $(table).find('tr').each(function(j, tr) {
	        $(tr).find('th,td').each(function(x, td) {
	            td.setAttribute('data-title', $(table).find('th:eq(' + x + ')').text());
	        })
		})
	})


	// $('body').on('change', '.tableprice-select', function(e){
	// 	let option 	= $(this).find('option:selected');
	// 	let val 	= option.attr('value').split(' ').join('_');
	// 	let caption = option.data('name');
	// 	let link 	= option.data('link');
	// 	$('.tableprice').each(function(e){
	// 		if ( val !== '' ) {
	// 			/* console.log( lastTableContent[0].innerHTML + 'tesst2' ); */
	// 			document.querySelector('.prices-header').style.border = "none";

	// 			lastTableContent3 	= $(this).clone();
	// 			/*  console.log( lastTableContent3[0].innerHTML + 'tesstР™Р™Р™' );  */
	// 			if (lastTableContent3[0].innerHTML.includes('РЈРєР°Р·Р°РЅР° РјРёРЅРёРјР°Р»СЊРЅР°СЏ С†РµРЅР°')){
	// 			$(this).find(".row-3 .column-1").html(lastTableContent[0].innerHTML);
	// 			 /* console.log( lastTableContent[0].innerHTML + 'tesstР¤Р¤Р¤' );  */
	// 			}
				
	// 			$('.tableprice .table-filial').html(caption);
	// 			$('.tableprice .row-3 .text-link').attr('href', link);
	// 			$('.tableprice .row-3 .text-link').attr('target', '_blank');
	// 			$('.tableprice td[data-title="' + val + '"]').fadeIn('fast').siblings().not('.column-1').hide();
	// 			$('.tableprice').hide().fadeIn();
	// 			$('.tableprice .row-3').fadeIn();
	// 	    }
	//     });
	// 	console.log('Р’С‹Р±СЂР°РЅС‹ С†РµРЅС‹ РґР»СЏ С„РёР»РёР°Р»Р°: ' + val );
	// });


	$('body').on('change', '.tableprice-select', function(e){
		let option 	= $(this).find('option:selected');
		let val 	= option.attr('value').split(' ').join('_');
		let caption = option.data('name');
		let link 	= option.data('link');
		$('div').not('.minpricetable').children('.tableprice').each(function(e){
			if ( val !== '' ) {
				/* console.log( lastTableContent[0].innerHTML + 'tesst2' ); */
				document.querySelector('.prices-header').style.border = "none";

				lastTableContent3 	= $(this).clone();
				/*  console.log( lastTableContent3[0].innerHTML + 'tesstР™Р™Р™' );  */
				if (lastTableContent3[0].innerHTML.includes('РЈРєР°Р·Р°РЅР° РјРёРЅРёРјР°Р»СЊРЅР°СЏ С†РµРЅР°')){
				$(this).find(".row-3 .column-1").html(lastTableContent[0].innerHTML);
				 /* console.log( lastTableContent[0].innerHTML + 'tesstР¤Р¤Р¤' );  */
				}
				
				$(this).find('.table-filial').html(caption);
				$(this).find('.row-3 .text-link').attr('href', link);
				$(this).find('.row-3 .text-link').attr('target', '_blank');
				$(this).find('td[data-title="' + val + '"]').fadeIn('fast').siblings().not('.column-1').hide();
				$(this).find('').hide().fadeIn();
				$(this).find('.row-3').fadeIn();
		    }
	    });
		console.log('Р’С‹Р±СЂР°РЅС‹ С†РµРЅС‹ РґР»СЏ С„РёР»РёР°Р»Р°: ' + caption );
	});
	// $('.tableprice-select').trigger('change');

	// Medspravki december discount
	// $('.table-medspravki').each(function(i, table) {
	// 	$(table).find('tr.row-2 td:not(:first-child)').html("Р¦РµРЅР° РґРѕ 11 СЏРЅРІР°СЂСЏ, СЂСѓР±");
	//     $(table).find('tr:not(:first-child):not(:nth-child(2))').each(function(j, tr) {
	//         $(tr).find('td:not(.column-1)').each(function(x, td) {
	//     		if( $(td).children('span.old-number').length) {
 //    				let tdHtml = $(this).html();
 //    				let tdHtmlBefore = tdHtml.split('<span class="old-number">')[0];
 //    				let tdHtmlAfter = tdHtml.split('</span>')[1];
	// 	        	if( $(td).children('span.old-number').html().match(/^\d*$/) ) {
	// 		        	let price = $(this).children('span.old-number').html();
	// 		        	let discountPrice = price - (price * 0.1);
	// 		        	discountPrice = discountPrice.toFixed();
	// 		        	// let discount = '<span style="color:#009cd6;">10%</span>';
	// 		            $(this).html('<b style="color: #f35150; margin-right: 4px;">' + tdHtmlBefore + ' ' + discountPrice + ' ' + tdHtmlAfter + '</b> <s>' + tdHtml + '</s>');
	// 		        }
	// 			} else if( $(td).html().match(/^\d*$/) ) {
	// 	        	let price = $(this).html();
	// 	        	let discountPrice = price - (price * 0.1);
	// 	        	discountPrice = discountPrice.toFixed();
	// 	        	// let discount = '<span style="color:#009cd6;">10%</span>';
	// 	            $(this).html('<b style="color: #f35150; margin-right: 4px;">' + discountPrice + '</b> <s>' + price + '</s>');
	// 	        }
	//         })
	// 	})
	// })

	// Hide rows without a price on contact pages
	$('.filialy-prices .tableprice').each(function(i, table) {
	    $(table).find('tr').each(function(j, tr) {
	        $(tr).find('th,td').each(function(x, td) {
	            td.setAttribute('data-value', $(this).text());
	            if( $(this).attr('data-value') === 'РЅРµС‚') {
	            	$(this).closest('tr').hide();
	        		$(this).closest('tr').addClass('hidden-rows');
	            }
	        })
		});
	    let rowCount = $(table).find('tbody tr:not(".row-2"):not(".row-3")').length;
	    let rowHiddenCount = $(table).find('tbody tr.hidden-rows').length;
	  	if( rowCount === rowHiddenCount ){
	    	$(table).closest('.accordion').hide();
		} else {
	    	$(table).closest('.accordion').addClass('acc-visible');
		};
	});
	
	$('.filialy-prices .tab').each(function() {
		if( $(this).find('.acc-visible').length === 0 ){
			let tab = $(this).closest('.tab').attr('id');
			$('.filialy-prices-tab').find('[data-tab="#' + tab + '"]').hide();
		};
	});


	// Fancybox
	$(".fancybox").fancybox();

	function isElementInViewport (el) {

		// Special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}

		var rect = el.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
		);
	}

	// Accordions
	$('.accordion .ac-header, .accordion .opener').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		$(this).closest('.accordion').toggleClass('opened')
				.find('.ac-content').stop().slideToggle(300);
	});

	// $('.accordion.opened').find('.ac-content').stop().slideToggle(300);

	// Switch
	// $('.switch').each(function(i, el){
	// 	$(el).find('.option-left').click(function(){
	// 		$(el).find('input').prop('checked', false);
	// 		$('.show-list').fadeIn(300);
	// 		$('.show-map').fadeOut(300);
	// 		$('.region-tabs-nav').fadeIn(300);
	// 	});
	// 	$(el).find('.option-right').click(function(){
	// 		$(el).find('input').prop('checked', true);
	// 		$('.show-map').fadeIn(300);
	// 		$('.show-list').fadeOut(300);
	// 		$('.region-tabs-nav').fadeOut(300);
	// 	});
	// });
	$('.switch').click(function(e){
		let input = $(this).find('input');
		if( input.is(':checked') ) {
			input.prop('checked', false);
		} else {
			input.prop('checked', true);
		};
		$('.show-list').toggle(300);
		$('.show-map').toggle(300);
	});

	// Odometer
	// window.odometerOptions = {
	// 	auto: false,
	// 	selector: '.odometer',
	// 	format: '(вЂЇddd),dd',
	// 	duration: 1500,
	// 	theme: 'minimal',
	// 	animation: 'count'
	// };

	// let elem = $('.odometer');

	// elem.each(function(i, el){
	// 	if (isElementInViewport(el)) {
	// 		$(el).html($(el).data('val'));
	// 	}
	// });

	// $(window).scroll(function(){
	// 	elem.each(function(i, el){
	// 		if (isElementInViewport(el)) {
	// 			$(el).html($(el).data('val'));
	// 		}
	// 	});
	// });

	$('.alteration').find('.odd').parent().parent('tr').addClass('odd');
	$('.alteration').find('.even').parent().parent('tr').addClass('even');
	$('.alteration').find('.odd2').parent().parent('tr').addClass('odd2');
	$('.alteration').find('.odd3').parent().parent('tr').addClass('odd3');
	$('.alteration').find('.bgwhite').parent().parent('tr').addClass('bgwhite');
	$('.alteration').find('.bggray').parent().parent('tr').addClass('bggray');


	// Ajax Reviews
	$('a.fullreviews').click(function(){
		var reviews_id = $(this).attr('data-id');
		$("#fullreviews-modal .modal-fullreviews-content").empty().load("/wp-content/themes/citymed/ajax-reviews.php?id=" + reviews_id);
	});

	// Contact Form 7 Sending Events
	document.addEventListener( 'wpcf7mailsent', function( event ) {
		$("input.cf7-agree").removeAttr("checked");
	}, false );

	document.addEventListener( 'wpcf7mailsent', function( event ) {
		if ( '4' == event.detail.contactFormId ) {
			$('#callback-modal').removeClass('visible');
    		$('#success-modal').addClass('visible');
		}
	}, false );

	document.addEventListener( 'wpcf7mailsent', function( event ) {
		if ( '4175' == event.detail.contactFormId ) {
			$('#express-test-modal').removeClass('visible');
    		$('#success-modal').addClass('visible');
		}
	}, false );

	document.addEventListener( 'wpcf7mailsent', function( event ) {
		if ( '2189' == event.detail.contactFormId ) {
			$('#med-out-modal').removeClass('visible');
    		$('#success-modal').addClass('visible');
		}
	}, false );

	document.addEventListener( 'wpcf7mailsent', function( event ) {
		if ( '2190' == event.detail.contactFormId ) {
			$('#med-modal').removeClass('visible');
    		$('#success-modal').addClass('visible');
		}
	}, false );

	document.addEventListener( 'wpcf7mailsent', function( event ) {
		if ( '6914' == event.detail.contactFormId ) {
			$('#med-dogovor-modal').removeClass('visible');
    		$('#success-modal').addClass('visible');
		}
	}, false );	

	document.addEventListener( 'wpcf7mailsent', function( event ) {
		if ( '1884' == event.detail.contactFormId ) {
    		$('#success-modal').addClass('visible');
		}
	}, false );
	
	document.addEventListener( 'wpcf7mailsent', function( event ) {
		if ( '10261' == event.detail.contactFormId ) {
			$('#med-dez-modal').removeClass('visible');
    		$('#success-modal').addClass('visible');
		}
	}, false );	

});

// SVG use polyfill
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});

svg4everybody();
var lastTableContent = 'no_text';
var firstRun1 = '1';
$(document).ready(function() {
	
	$('.quote-info').each(function() {
	  if ($(this).find('span').length==0) {
		  $('.quote-info').wrapInner('<span></span>');
	  }
	});
	
	$('.quote-warninng').each(function() {
	  if ($(this).find('span').length==0) {
		  $('.quote-warninng').wrapInner('<span></span>');
	  }
	});
	
	if (window.localStorage.getItem('display')) {
		$('.wrapper__work-time').hide();
    } else {
		$('.wrapper__work-time').show();
    };
    $('.wrapper__work-time a,.wrapper__work-time .close ').click(function(){
        window.localStorage.setItem('display', true);
		$('.wrapper__work-time').hide();
    });
	
	$('.wrapper__work-time .close').click(function(){
      		console.log('yes');
      		$('.wrapper__work-time').hide();
   	})
	
		let option2 	= $('.tableprice-select').find('option:selected');
		let val2 	= option2.attr('value');
		
				/* console.log( val2 ); */
		$('.tableprice').each(function(e){
			if ( val2 == '#' ) {		
				lastTableContent2 	= $(this).clone();	
				/* console.log( lastTableContent2[0].innerHTML + 'tesst' + i++ ); */
				if (lastTableContent2[0].innerHTML.includes('РўРµР»РµС„РѕРЅ')){
				lastTableContent 	= $(this).find(".row-3 .column-1").clone();	
				/* console.log( lastTableContent2[0].innerHTML + 'tesstTEL' + i++ );  */
				$(this).find(".row-3 .column-1").html('<p><strong><i class="icon-coins"></i> РЈРєР°Р·Р°РЅР° РјРёРЅРёРјР°Р»СЊРЅР°СЏ С†РµРЅР°.</strong></p><p><strong>Р¦РµРЅС‹ РІ С„РёР»РёР°Р»Р°С… РѕС‚Р»РёС‡Р°СЋС‚СЃСЏ. Р§С‚РѕР±С‹ СѓР·РЅР°С‚СЊ С‚РѕС‡РЅСѓСЋ С†РµРЅСѓ РІС‹Р±РµСЂРёС‚Рµ РЅСѓР¶РЅС‹Р№ Р’Р°Рј С„РёР»РёР°Р».</strong></p><p><strong><a href="#prices" class="text-link text-link_select">Р’С‹Р±СЂР°С‚СЊ С„РёР»РёР°Р»</a></p></strong>');
				$(this).find('.row-3').fadeIn();
				 /* console.log( lastTableContent[0].innerHTML + 'tesst1' );  */
				}
				
		    }
	    });


if (window.location.hash == '#specpr') {
	$('#pcr-test-event-modal').addClass('visible').show();
	}
}

);
// $(".show-hide").elimore();

$('.type6').on('click', function(){
    $('.type6-h').toggleClass('current');
    $('#type-6').toggleClass('current-v');
    $('#type-1').toggleClass('current-h');
    $('.no-h').removeClass('current');
});

        (function($){            
            // Metrika reachGoals            
            $('[data-modal=#callback-modal]').click(function(e){
                yaCounter65503195.reachGoal('open_form_callback');
            });
            $('[data-modal=#med-out-modal]').click(function(e){
                yaCounter65503195.reachGoal('open_form_vyezdnoy_medosmotr');
            });
            $('[data-modal=#med-modal]').click(function(e){
                yaCounter65503195.reachGoal('open_form_medosmotr');
            });
            $('[data-modal=#med-dogovor-modal]').click(function(e){
                yaCounter65503195.reachGoal('open_form_meddogovor');
            });
            $('[data-modal=#express-test-modal]').click(function(e){
                yaCounter65503195.reachGoal('open_form_expresstest');
            });     

            // Contact Form 7 Sending Events
            document.addEventListener( 'wpcf7mailsent', function( event ) {
                if ( '4' == event.detail.contactFormId ) {
                    yaCounter65503195.reachGoal('sent_form_callback');
                }
            }, false );
            document.addEventListener( 'wpcf7mailsent', function( event ) {
                if ( '4175' == event.detail.contactFormId ) {
                    yaCounter65503195.reachGoal('sent_form_expresstest');
                }
            }, false );
            document.addEventListener( 'wpcf7mailsent', function( event ) {
                if ( '2189' == event.detail.contactFormId ) {
                    yaCounter65503195.reachGoal('sent_form_vyezdnoy_medosmotr');
                }
            }, false );
            document.addEventListener( 'wpcf7mailsent', function( event ) {
                if ( '2190' == event.detail.contactFormId ) {
                    yaCounter65503195.reachGoal('sent_form_medosmotr');
                }
            }, false );
            document.addEventListener( 'wpcf7mailsent', function( event ) {
                if ( '6914' == event.detail.contactFormId ) {
                    yaCounter65503195.reachGoal('sent_form_meddogovor');
                }
            }, false ); 
            document.addEventListener( 'wpcf7mailsent', function( event ) {
                if ( '1884' == event.detail.contactFormId ) {
                    yaCounter65503195.reachGoal('sent_form_review');
                }
            }, false );

        })(jQuery);