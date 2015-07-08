(function(){


function swapImage(img_to_swap) {

	var img_path = img_to_swap.attr("src");

	if ( img_path.indexOf("png") != -1 ) {
		img_path = img_path.replace(".png", "_desktop.png");	
	} else if ( img_path.indexOf("jpg") != -1 ) {	
		img_path = img_path.replace(".jpg", "_desktop.jpg");
	}		

	img_to_swap.attr("src" , img_path);	
	
}





$( document ).ready(function() {

	var widow_width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;	
	var $main_logo_img = $("#main_logo");

	if (widow_width > 1025) {
		swapImage($main_logo_img);
	}
	
	
	
	
});


})();




//console.log("yay");





























