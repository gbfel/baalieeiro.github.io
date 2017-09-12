(function ($) {
	var menurepon = $('.menurepon'), 
		body = $('body'),
		container = $('#container'), 
		push = $('.push'), 
		menureponLeft = 'menurepon-left',
		menureponOpenLeft = 'menurepon-open-left', 
		menureponOpenRight = 'menurepon-open-right', 
		siteOverlay = $('.site-overlay'), 
		menuBtn = $('.menu-btn, .menurepon-link'), 
		menuBtnFocus = $('.menu-btn'), 
		menuLinkFocus = $(menurepon.data('focus')), 
		menuSpeed = 200, 
		menuWidth = menurepon.width() + 'px', 
		submenuClass = '.menurepon-submenu',
		submenuOpenClass = 'menurepon-submenu-open',
		submenuClosedClass = 'menurepon-submenu-closed',
		submenu = $(submenuClass);

	
	$(document).keyup(function(e) {
		
		if (e.keyCode == 27) {

			
			if( body.hasClass(menureponOpenLeft) || body.hasClass(menureponOpenRight) ){
				if(cssTransforms3d){
					closemenurepon(); 
				}else{
					closemenureponFallback();
					opened = false; 
				}
				
				
				if(menuBtnFocus){
					menuBtnFocus.focus();
				}
				
			}

		}   
	});

	function togglemenurepon(){
		
		if( menurepon.hasClass(menureponLeft) ){
			body.toggleClass(menureponOpenLeft);
		}else{
			body.toggleClass(menureponOpenRight);
		}

		
		if(menuLinkFocus){
			menurepon.one('transitionend', function() {
				menuLinkFocus.focus();
			});
		}
		
	}

	function closemenurepon(){
		if( menurepon.hasClass(menureponLeft) ){
			body.removeClass(menureponOpenLeft);
		}else{
			body.removeClass(menureponOpenRight);
		}
	}

	function openmenureponFallback(){
		
		if( menurepon.hasClass(menureponLeft) ){
			body.addClass(menureponOpenLeft);
			menurepon.animate({left: "0px"}, menuSpeed);
			container.animate({left: menuWidth}, menuSpeed);
			push.animate({left: menuWidth}, menuSpeed);
		}else{
			body.addClass(menureponOpenRight);
			menurepon.animate({right: '0px'}, menuSpeed);
			container.animate({right: menuWidth}, menuSpeed);
			push.animate({right: menuWidth}, menuSpeed);
		}

		
		if(menuLinkFocus){
			menuLinkFocus.focus();
		}
	}

	function closemenureponFallback(){
		
		if( menurepon.hasClass(menureponLeft) ){
			body.removeClass(menureponOpenLeft);
			menurepon.animate({left: "-" + menuWidth}, menuSpeed);
			container.animate({left: "0px"}, menuSpeed);
			push.animate({left: "0px"}, menuSpeed);
		}else{
			body.removeClass(menureponOpenRight);
			menurepon.animate({right: "-" + menuWidth}, menuSpeed);
			container.animate({right: "0px"}, menuSpeed);
			push.animate({right: "0px"}, menuSpeed);
		}
	}

	function toggleSubmenu(){
		$(submenuClass).addClass(submenuClosedClass);

		$(submenuClass).on('click', function(){
	        var selected = $(this);

	        if( selected.hasClass(submenuClosedClass) ) {
	            $(submenuClass).addClass(submenuClosedClass).removeClass(submenuOpenClass);
	            selected.removeClass(submenuClosedClass).addClass(submenuOpenClass);
	        }else{
	            selected.addClass(submenuClosedClass).removeClass(submenuOpenClass);
	        }
	    });
	}

	
	var cssTransforms3d = (function csstransforms3d(){
		var el = document.createElement('p'),
		supported = false,
		transforms = {
		    'webkitTransform':'-webkit-transform',
		    'OTransform':'-o-transform',
		    'msTransform':'-ms-transform',
		    'MozTransform':'-moz-transform',
		    'transform':'transform'
		};

		if(document.body !== null) {
		
			document.body.insertBefore(el, null);

			for(var t in transforms){
			    if( el.style[t] !== undefined ){
			        el.style[t] = 'translate3d(1px,1px,1px)';
			        supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
			    }
			}

			document.body.removeChild(el);

			return (supported !== undefined && supported.length > 0 && supported !== "none");
		}else{
			return false;
		}
	})();

	if(cssTransforms3d){
		toggleSubmenu();

		menuBtn.on('click', function(){
			togglemenurepon();
		});
		siteOverlay.on('click', function(){
			togglemenurepon();
		});
	}else{
		body.addClass('no-csstransforms3d');

		if( menurepon.hasClass(menureponLeft) ){
			menurepon.css({left: "-" + menuWidth});
		}else{
			menurepon.css({right: "-" + menuWidth});
		}

		container.css({"overflow-x": "hidden"});

		var opened = false;

		toggleSubmenu();
		
		menuBtn.on('click', function(){
			if (opened) {
				closemenureponFallback();
				opened = false;
			} else {
				openmenureponFallback();
				opened = true;
			}
		});

		siteOverlay.on('click', function(){
			if (opened) {
				closemenureponFallback();
				opened = false;
			} else {
				openmenureponFallback();
				opened = true;
			}
		});
	}
}(jQuery));