jQuery.fn.slideShow = function(slideShow_settings) {

	defaultSettings = {
		start_on_item: 1,
		start_on_item_random: -1,
		slide_time: 5000,
		is_random: false,
		slide_type: "instant",		
		slide_speed: 1000,
		automatic: true,
		controls: false
	}
	settings = jQuery.extend({}, defaultSettings, slideShow_settings);

	var this_id = jQuery(this).attr('id')
		,all_items =  jQuery("#" + this_id + " li").get()
		,all_items_length = all_items.length
		,current_item_index = settings.start_on_item - 1
		,item_width = jQuery("#" + this_id + " li").width()
		,item_height = jQuery("#" + this_id + " li").height()
		,indexes_in_order = []
		,indexes_randomized = []
		,randomnumber_onload =  1
		,intervalCycle_slideShowID = 0
		,jQuery_controls = jQuery("#" + this_id + "_controls")
		,jQuery_controls_li = jQuery("#" + this_id + "_controls li")	
		,jQuery_controls_start = jQuery("#" + this_id + "_controls .start")
		,jQuery_controls_stop = jQuery("#" + this_id + "_controls .stop");	


 	if( settings.slide_type === 'left' || settings.slide_type === 'right' || settings.slide_type === 'up' || settings.slide_type === 'down' ) {
		jQuery("#" + this_id).wrapInner( "<div class='jquery_slideshow_div' style='position:relative; top:0; left:0; overflow:hidden; width: " + item_width + "px; height: " + item_height + "px;'></div>");
	}

	if(settings.is_random) {
		jQuery('#' + this_id + ' .current').removeClass('current');
		if(settings.start_on_item_random !== -1) {
			current_item_index =  settings.start_on_item_random - 1;
			jQuery(all_items[current_item_index]).addClass('current');		
		} else {
			randomnumber_onload = Math.floor(Math.random()*all_items_length);
			jQuery(all_items[randomnumber_onload]).addClass('current');
			current_item_index =  randomnumber_onload;
		}
	} else {
		jQuery(all_items[current_item_index]).addClass('current');		
	}

	if (settings.automatic) {
		intervalCycle_slideShowID = setInterval(function (){intervalCycle_slideShow() }, settings.slide_time );
	}

	jQuery('#' + this_id + '_controls a').bind(
		'click',
		function() {
			if (settings.automatic) {
				clearInterval ( intervalCycle_slideShowID );
			}
			var direction = jQuery(this).attr('class')
				,curitem = jQuery(all_items[current_item_index])
				,nextitem = ''
				,next_item_index = ''
				,return_items = [];

			if( direction.indexOf("previous") != -1 ) {
				jQuery_controls_start.hide();
				jQuery_controls_stop.show();
				
				
				next_item_index = (current_item_index - 1 <  0) ? all_items_length - 1 : current_item_index - 1;
				nextitem = jQuery(all_items[next_item_index]);
				current_item_index = next_item_index;				

				if ( settings.slide_type === 'left' ) {
					settings.slide_type = "left_previous";
			  	} else if ( settings.slide_type === 'right' ) {
					settings.slide_type = "right_previous";
			  	} else if ( settings.slide_type === 'up' ) {
					settings.slide_type = "up_previous";
			  	} else if ( settings.slide_type === 'down' ) {
					settings.slide_type = "down_previous";
			  	}
			}
			else if( direction.indexOf("next") != -1 ) {
				jQuery_controls_start.hide();
				jQuery_controls_stop.show();
				
				next_item_index = (current_item_index + 1 >=  all_items_length) ? 0 : current_item_index + 1;
				nextitem = jQuery(all_items[next_item_index]);
				current_item_index = next_item_index;		

			} else if( direction.indexOf("stop") != -1 ) {
				jQuery_controls_start.show();
				jQuery_controls_stop.hide();				
				if (settings.automatic) {
					clearInterval ( intervalCycle_slideShowID );
				}
				return false;
			
			} else if( direction.indexOf("start") != -1 ) {
				jQuery_controls_start.hide();
				jQuery_controls_stop.show();
				next_item_index = (current_item_index + 1 >=  all_items_length) ? 0 : current_item_index + 1;
				nextitem = jQuery(all_items[next_item_index]);
				current_item_index = next_item_index;			
			} else if( direction.indexOf("random") != -1 ) {
				jQuery_controls_start.hide();
				jQuery_controls_stop.show();
				randomnumber_onload =  current_item_index;
				return_items = randomizeitems_slideShow();
				curitem = return_items[0];
				nextitem = return_items[1];				
				
			} else if( direction.indexOf("goto") != -1 ) {
				jQuery_controls_li.removeClass("on");
				jQuery(this).parent().addClass("on");
				next_item_index = parseInt( direction.replace("goto_","") ) - 1;
				nextitem = jQuery(all_items[next_item_index]);
				current_item_index = next_item_index;
			}

			jQuery(all_items[randomnumber_onload]).removeClass('current');
			curitem.addClass('current');

			toggleArticle_slideShow(curitem, nextitem);
			if (settings.slide_type === "left_previous") {
				settings.slide_type = "left";
			} else if (settings.slide_type === "right_previous") {
				settings.slide_type = "right";
			} else if (settings.slide_type === "up_previous") {
				settings.slide_type = "up";
			} else if (settings.slide_type === "down_previous") {
				settings.slide_type = "down";
			}
			
			if (settings.automatic) {
				clearInterval ( intervalCycle_slideShowID );
				intervalCycle_slideShowID = setInterval(function (){intervalCycle_slideShow() }, settings.slide_time );
			}
			return false;
					
		}
	)

	function toggleArticle_slideShow(curitem, nextitem) {
	
		var slide_speed_int = parseInt( settings.slide_speed );
		
		if( settings.slide_type === 'fade' ) {
				curitem.stop().fadeOut(
				slide_speed_int,
				function() {
					curitem.removeClass('current');
					nextitem.stop().css("opacity","1").fadeIn(slide_speed_int,
						function() {
							if(jQuery.browser.msie) {
								this.style.removeAttribute('filter');
							}
							
						});
				
					nextitem.addClass('current');			
				}
			);
	
		} else if( settings.slide_type === 'left' || settings.slide_type === 'right_previous') {

			curitem.css({ 
				"position":"absolute", 
				"left":"0px"			
			});
			nextitem.css({ 
				"position":"absolute", 
				"left":item_width + "px"
			});
			nextitem.show();
			curitem.stop().animate({"left": "-=" + item_width + "px"}, slide_speed_int);		
			nextitem.stop().animate({"left": "-=" + item_width + "px"}, slide_speed_int,
				function() {
					curitem.removeClass('current');
					nextitem.addClass('current');
				}
			);		
			
		} else if( settings.slide_type === 'right' || settings.slide_type === 'left_previous' ) {
	
			curitem.css({ 
				"position":"absolute", 
				"left":"0px"			
			});
			nextitem.css({ 
				"position":"absolute", 
				"left":"-" + item_width + "px"
			});
			nextitem.show();
			curitem.stop().animate({"left": "+=" + item_width + "px"}, slide_speed_int);		
			nextitem.stop().animate({"left": "+=" + item_width + "px"}, slide_speed_int,
				function() {
					curitem.removeClass('current');
					nextitem.addClass('current');
				}
			);		
	
		} else if( settings.slide_type === 'up' || settings.slide_type === 'down_previous') {
	
			curitem.css({ 
				"position":"absolute", 
				"top":"0px"			
			});
			nextitem.css({ 
				"position":"absolute", 
				"top":item_height + "px"
			});
			nextitem.show();
			curitem.stop().animate({"top": "-=" + item_height + "px"}, slide_speed_int);		
			nextitem.stop().animate({"top": "-=" + item_height + "px"}, slide_speed_int,
				function() {
					curitem.removeClass('current');
					nextitem.addClass('current');
				}
			);	
		
		} else if( settings.slide_type === 'down' || settings.slide_type === 'up_previous') {

			curitem.css({ 
				"position":"absolute", 
				"top":"0px"			
			});
			nextitem.css({ 
				"position":"absolute", 
				"top":"-" + item_height + "px"
			});
			nextitem.show();
			curitem.stop().animate({"top": "+=" + item_height + "px"}, slide_speed_int);		
			nextitem.stop().animate({"top": "+=" + item_height + "px"}, slide_speed_int,
				function() {
					curitem.removeClass('current');
					nextitem.addClass('current');
				}
			);	
	
		} else {
	
			curitem.removeClass('current');

			nextitem.addClass('current');	

		}
	
	};

		
	function randomizeitems_slideShow() {
		var return_items = []
			,next_card = ''
			,remove_card = ''
			,randomnumber = ''
			,temp_index = '';
	
		if(indexes_randomized.length < 1) {		
			for (i=0; i<all_items_length; i++) {
				indexes_in_order[i] = i;		
			}			
			for (i=0; i<all_items_length; i++) {
			   randomnumber = Math.floor(Math.random()*((all_items_length - i) ));	
				if (i == 0 && randomnumber === randomnumber_onload) { 
				   while(randomnumber === randomnumber_onload) {
					   randomnumber = Math.floor(Math.random()*((all_items_length - i) ));
				   }	
				} 
				next_card = indexes_in_order[randomnumber];
				remove_card = indexes_in_order.splice(randomnumber, 1);
				indexes_randomized.push( next_card );
			}
			randomnumber_onload = indexes_randomized[all_items_length - 1];			
		}
		 temp_index = indexes_randomized[0];
		 indexes_randomized.splice(0, 1);		
		return_items[0] = jQuery(all_items[current_item_index]);
		return_items[1] =  jQuery(all_items[temp_index]);	
    	current_item_index = temp_index;
	
		return return_items;
		
	};
	
	
	function intervalCycle_slideShow() {

		var return_items = []
			,curitem = ''
			,nextitem = ''
			,next_item_index = '';

	
		if (settings.is_random) {
			return_items = randomizeitems_slideShow();
			curitem =  return_items[0];
			nextitem = return_items[1];
		} else {
			curitem = jQuery(all_items[current_item_index]);
			next_item_index = (current_item_index + 1 >=  all_items_length) ? 0 : current_item_index + 1;
			nextitem = jQuery(all_items[next_item_index]);
			current_item_index = next_item_index;
		}
		toggleArticle_slideShow(curitem, nextitem);
	}

}