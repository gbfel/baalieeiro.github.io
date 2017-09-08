/*! menurepon - v1.1.0 - 2017-1-30
* menurepon is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/menurepon/
* by Christopher Yee */

(function ($) {
	var menurepon = $('.menurepon'), //menu css class
		body = $('body'),
		container = $('#container'), //container css class
		push = $('.push'), //css class to add menurepon capability
		menureponLeft = 'menurepon-left', //css class for left menu position
		menureponOpenLeft = 'menurepon-open-left', //css class when menu is open (left position)
		menureponOpenRight = 'menurepon-open-right', //css class when menu is open (right position)
		siteOverlay = $('.site-overlay'), //site overlay
		menuBtn = $('.menu-btn, .menurepon-link'), //css classes to toggle the menu
		menuBtnFocus = $('.menu-btn'), //css class to focus when menu is closed w/ esc key
		menuLinkFocus = $(menurepon.data('focus')), //focus on link when menu is open
		menuSpeed = 200, //jQuery fallback menu speed
		menuWidth = menurepon.width() + 'px', //jQuery fallback menu width
		submenuClass = '.menurepon-submenu',
		submenuOpenClass = 'menurepon-submenu-open',
		submenuClosedClass = 'menurepon-submenu-closed',
		submenu = $(submenuClass);

	//close menu w/ esc key
	$(document).keyup(function(e) {
		//check if esc key is pressed
		if (e.keyCode == 27) {

			//check if menu is open
			if( body.hasClass(menureponOpenLeft) || body.hasClass(menureponOpenRight) ){
				if(cssTransforms3d){
					closemenurepon(); //close menurepon
				}else{
					closemenureponFallback();
					opened = false; //set menu state
				}
				
				//focus on menu button after menu is closed
				if(menuBtnFocus){
					menuBtnFocus.focus();
				}
				
			}

		}   
	});

	function togglemenurepon(){
		//add class to body based on menu position
		if( menurepon.hasClass(menureponLeft) ){
			body.toggleClass(menureponOpenLeft);
		}else{
			body.toggleClass(menureponOpenRight);
		}

		//focus on link in menu after css transition ends
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
		//animate menu position based on CSS class
		if( menurepon.hasClass(menureponLeft) ){
			body.addClass(menureponOpenLeft);
			menurepon.animate({left: "0px"}, menuSpeed);
			container.animate({left: menuWidth}, menuSpeed);
			//css class to add menurepon capability
			push.animate({left: menuWidth}, menuSpeed);
		}else{
			body.addClass(menureponOpenRight);
			menurepon.animate({right: '0px'}, menuSpeed);
			container.animate({right: menuWidth}, menuSpeed);
			push.animate({right: menuWidth}, menuSpeed);
		}

		//focus on link in menu
		if(menuLinkFocus){
			menuLinkFocus.focus();
		}
	}

	function closemenureponFallback(){
		//animate menu position based on CSS class
		if( menurepon.hasClass(menureponLeft) ){
			body.removeClass(menureponOpenLeft);
			menurepon.animate({left: "-" + menuWidth}, menuSpeed);
			container.animate({left: "0px"}, menuSpeed);
			//css class to add menurepon capability
			push.animate({left: "0px"}, menuSpeed);
		}else{
			body.removeClass(menureponOpenRight);
			menurepon.animate({right: "-" + menuWidth}, menuSpeed);
			container.animate({right: "0px"}, menuSpeed);
			push.animate({right: "0px"}, menuSpeed);
		}
	}

	function toggleSubmenu(){
		//hide submenu by default
		$(submenuClass).addClass(submenuClosedClass);

		$(submenuClass).on('click', function(){
	        var selected = $(this);

	        if( selected.hasClass(submenuClosedClass) ) {
	            //hide opened submenus
	            $(submenuClass).addClass(submenuClosedClass).removeClass(submenuOpenClass);
	            //show submenu
	            selected.removeClass(submenuClosedClass).addClass(submenuOpenClass);
	        }else{
	            //hide submenu
	            selected.addClass(submenuClosedClass).removeClass(submenuOpenClass);
	        }
	    });
	}

	//checks if 3d transforms are supported removing the modernizr dependency
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
			// Add it to the body to get the computed style
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
		//toggle submenu
		toggleSubmenu();

		//toggle menu
		menuBtn.on('click', function(){
			togglemenurepon();
		});
		//close menu when clicking site overlay
		siteOverlay.on('click', function(){
			togglemenurepon();
		});
	}else{
		//add css class to body
		body.addClass('no-csstransforms3d');

		//hide menu by default
		if( menurepon.hasClass(menureponLeft) ){
			menurepon.css({left: "-" + menuWidth});
		}else{
			menurepon.css({right: "-" + menuWidth});
		}

		//fixes IE scrollbar issue
		container.css({"overflow-x": "hidden"});

		//keep track of menu state (open/close)
		var opened = false;

		//toggle submenu
		toggleSubmenu();

		//toggle menu
		menuBtn.on('click', function(){
			if (opened) {
				closemenureponFallback();
				opened = false;
			} else {
				openmenureponFallback();
				opened = true;
			}
		});

		//close menu when clicking site overlay
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