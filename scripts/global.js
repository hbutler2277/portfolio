(function(){

// Adds an name change to the end of the existing image name
function swapImage(img_to_swap, name_change) {

	var img_path = img_to_swap.attr("src"),
		file_format = img_path.substring(img_path.lastIndexOf('.'));	
	
	img_path = img_path.replace(file_format, name_change + file_format);	
	img_to_swap.attr("src" , img_path);	
	
}





$( document ).ready(function() {

	var widow_width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;	
	var $main_logo_img = $("#main_logo");

	if (widow_width > 1025) {
		swapImage($main_logo_img, "_desktop");
	}
	
	
	
	
});


})();




//console.log("yay");





























