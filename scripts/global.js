(function(){




function navDropDowns(nav_element) {

	$(nav_element).hover(
	  function() {
		$(this).find("ul").addClass("show").removeClass("hide");
	  }, function() {
		$(this).find("ul").addClass("hide").removeClass("show");
	  }
	);
		
}


function desktopImages() {
	
	var widow_width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth
		,$main_logo_img = $("#main_logo")
		,$section_img = $("section img");

	if (widow_width > 1025) {
		swapImage($main_logo_img, "_desktop");
		swapImage($section_img, "_desktop");
	}		
	
}



// Adds a name change to the end of the existing image name
//removes "mobile" if in original image
function swapImage(img_to_swap, name_change) {

	var img_path = img_to_swap.attr("src"),
		file_format = img_path.substring(img_path.lastIndexOf('.'));	

	if (img_path.indexOf("_mobile") !== -1) {
		 img_path = img_path.replace("_mobile", "");	
	}
		
	img_path = img_path.replace(file_format, name_change + file_format);	
	img_to_swap.attr("src" , img_path);	
	
}





$( document ).ready(function() {

	navDropDowns("header .drop_down");	
	desktopImages();


	var featured_slideshow_settings = {
		start_on_item_random: 1,
		slide_time: 10000,
		is_random: false,
		slide_type: "left",
		slide_speed: 1000,
		controls: true		
		};
		
	$("#featured_slideshow").slideShow(featured_slideshow_settings);

	
	
});


})();

































