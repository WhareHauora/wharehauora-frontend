$(function () {

  /* /////////////////////////////////
    Vars
  ///////////////////////////////// */
  
  var bp_xl = 1600;
  var bp_lg = 1200;
  var bp_md = 900;
  var bp_sm = 700;

  /* /////////////////////////////////
    Modernizr + Detetizr
  ///////////////////////////////// */
  
  // Add device type, OS, and Browser classes to body
  
  Detectizr.detect({
    addAllFeaturesAsClass: false,
    detectDevice: true,
    detectDeviceModel: false,
    detectScreen: false,
    detectOS: true,
    detectBrowser: true,
    detectPlugins: false
  });
  
  var body = $("body");
  body.addClass(Detectizr.device.browser + ' ' + Detectizr.device.os + ' ' + Detectizr.device.type);
  
  /* /////////////////////////////////
   Replace all SVG images with inline SVG
  ///////////////////////////////// */
  	
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');
  });  
  
  /* /////////////////////////////////
    Mobile Menu
  ///////////////////////////////// */
  	
	$("a.open-menu").on("touchstart click", function(e){
    e.stopPropagation(); 
    e.preventDefault();
		$("body").addClass("menu-is-open");
	});
	
	$(".menu > header .x").on("touchstart click", function(e){
    e.stopPropagation(); 
    e.preventDefault();
		$("body").removeClass("menu-is-open").addClass("menu-is-closing");
		
		setTimeout(function(){
      $("body").removeClass("menu-is-closing");
    }, 290);
	});
	
	/* /////////////////////////////////
		FORM
	///////////////////////////////// */
	
	// submit forms with links
  	
	$("a.submit").on("click", function(e){
    e.stopPropagation(); 
    e.preventDefault();
		$(this).closest("form").submit();
	});
	
	$('form input').keypress(function(e){
		var c = e.which ? e.which : e.keyCode;
		if(c == 13){
		  $(this).closest('form').submit();
		} 
	});
	
	// replace select boxes
	
	$("select").not(".lang-picker, .whare-picker").selectBoxIt({
    showFirstOption: false
  });
  
  $("select.lang-picker, select.whare-picker").selectBoxIt({
    showFirstOption: true
  });
  
  // replace radio buttons & checkboxes
  
	$("input[type=radio], input[type=checkbox]").iCheck();
	
	/* /////////////////////////////////
		Tooltips
	///////////////////////////////// */
	
	$(".tooltip").tooltipster({
	  animation: 'fade',
	  animationDuration: 300,
	  arrow: true,
	  contentAsHTML: true,
	  delay: 0,
	  distance: 6,
	  maxWidth: 240
	});
	
	/* /////////////////////////////////
		Modals
	///////////////////////////////// */
	
	// open modal on special links
	
	$(".open-modal").magnificPopup({
    type: "inline",
    fixedContentPos: true,
		fixedBgPos: true,
		focus: "",
		overflowY: "scroll",
    preloader: false,
		midClick: true,
		removalDelay: 200,
    closeBtnInside: false,
    modal: true,
  }); 
  
  // close on X or close button click
  
  $(".modal a.close").on("touchstart click", function(e){
    e.stopPropagation(); 
    e.preventDefault();
		$.magnificPopup.close(); 
	}); 
});