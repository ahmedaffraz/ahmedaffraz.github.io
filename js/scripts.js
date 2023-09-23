(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 71)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Floating label headings for the contact form
  $(function () {
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    var staticImages = document.querySelectorAll(".img-static");
    var thumbnails = document.querySelectorAll(".thumbnail");
    var videos = document.querySelectorAll(".video");
    var portfolio = document.querySelectorAll(".portfolio-item");

    // hide all videos initially
    for (var i = 0; i < videos.length; i++) {
      videos[i].style.display = "none";
    }

    var numLoadedStaticImages = 0; // Counter for loaded static images
    var numLoadedVideos = 0; // Counter for loaded videos

    // Load static images
    function loadStaticImage(index) {
      if (index < staticImages.length) {
        var img = new Image();
        img.onload = function () {
          numLoadedStaticImages++;

          if (numLoadedStaticImages === staticImages.length) {
            loadVideo(0);
          }

          loadStaticImage(index + 1);
        };
        img.src = staticImages[index].src;
      }
    }

    // Load videos one by one
    function loadVideo(index) {
      if (index < videos.length) {
        var video = videos[index];
        video.addEventListener("loadeddata", function () {
          numLoadedVideos++;

          if (numLoadedVideos === videos.length) {
            for (var i = 0; i < videos.length; i++) {
              // Add event listeners for hovering
              portfolio[i].addEventListener("mouseenter", createMouseEnterHandler(i));
              portfolio[i].addEventListener("mouseleave", createMouseLeaveHandler(i));

              // Initially hide videos and show thumbnails
              videos[i].style.display = "block";
              thumbnails[i].style.display = "none";
            }
          }

          loadVideo(index + 1);
        });

        video.src = videos[index].querySelector("source").src;
      }
    }

    function createMouseEnterHandler(index) {
      return function () {
        videos[index].style.display = "none"; // Show video
        thumbnails[index].style.display = "block"; // Hide thumbnail
      };
    }

    function createMouseLeaveHandler(index) {
      return function () {
        videos[index].style.display = "block"; // Hide video
        thumbnails[index].style.display = "none"; // Show thumbnail
      };
    }

    loadStaticImage(0);
  });


})(jQuery); // End of use strict