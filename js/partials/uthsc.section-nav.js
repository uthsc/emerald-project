/**
 * UTHSC section nav module.
 */
!function($) {

    // sticky navigation - makes section navigation 'stick'
    // to the top of the screen on desktop
    // allows foundation's sticky class to be used elsewhere.
    $(document).ready(function() {

			var sectionNav = $('#uthsc-section-navigation');

			if (sectionNav.length) {
				var stickyNavTop = sectionNav.offset().top;

				function stickyNav() {
					var scrollTop = $(window).scrollTop();

					if (scrollTop > stickyNavTop) {
						sectionNav.addClass('uthsc-sticky');
					} else {
						sectionNav.removeClass('uthsc-sticky');
					}
				}

				stickyNav();

				$(window).scroll(function() {
					stickyNav();
				});
			}
    });

    //expanding menu
    var openTimer;
    var closeTimer;
    var endTimer;

    jQuery(".uthsc-navigation-column").bind('mouseover', openSubMenu);
    jQuery("#uthsc-section-navigation").bind('mouseleave', closeSubMenu);

    function expandMenu() {
        //$('#uthsc-section-navigation ul li ul').stop(true, true).slideDown(400);
        $('#uthsc-section-navigation').addClass('show-menu');
        $('#uthsc-section-navigation ul > li > ul').slideDown( "fast", function() {
            // Animation complete.
        });
    }

    function collapseMenu() {
        //$('#uthsc-section-navigation ul li ul').stop(true, true).slideUp(400);
        $('#uthsc-section-navigation ul > li > ul').slideUp( "fast", function() {
            $('#uthsc-section-navigation').removeClass('show-menu');
            $('#uthsc-section-navigation > ul > li > ul').css("display", "");
        });

    }

    function clearTimer() {
        clearTimeout(closeTimer);
        clearTimeout(openTimer);
    }

    function openSubMenu() {
        //$('#uthsc-section-navigation').addClass('uthsc-navigation-active');
        clearTimer();
        openTimer = setTimeout(expandMenu, 400);
    }

    function closeSubMenu() {
        //$('#uthsc-section-navigation').removeClass('uthsc-navigation-active');

        clearTimer();
        closeTimer = setTimeout(collapseMenu, 500);
    }

    $("#uthsc-section-navigation").on( 'keyup', function( e ) {
        openSubMenu();
    } );

}(jQuery);