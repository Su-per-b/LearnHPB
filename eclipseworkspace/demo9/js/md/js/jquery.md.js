/*
 * jQuery MD plugin 1.3
 * Released: June 17, 2011
 * 
 * Copyright (c) 2011 Steve Koehler
 * Email: steve@tiny-threads.com
 * 
 * Original Design: Michael Leigeber
 * http://www.leigeber.com/2011/04/custom-javascript-dialog-boxes/
 *
 * Updated Design: Steve Koehler
 * http://www.tiny-threads.com/blog/2011/06/07/jquery-modal-dialog-plugin/
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 *  Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * @license http://www.opensource.org/licenses/mit-license.php
 * @project jquery.md
 *
 * If you have enjoyed MD, then we encourage you to donate at http://www.tiny-threads.com
 */
 
(function( $ ){
	$.md = function(msg,options){
		if(navigator.appName=='Microsoft Internet Explorer')
			$.md.ie=true;
		else
			$.md.ie=false;
		
        $.md.defaults = {
            timeout: 0
            , showClose: true
            , width: 525
            , buttons: {}
            , type: 'err'
            , title: ''
			, cssDir: 'css'
			, position: 'center'
			, modal:true
			, modalBG: '#ffffff'
        };
        $.md.DialogTypes = new Array("error", "warning", "success", "prompt");
        $.md.DialogTitles = {
            "err": "Error"
            , "warning": "Warning!"
            , "success": "Success"
            , "prompt": "Please Choose"
        };
         
        // display the whole thing
        //$.md.showDialog(msg,options);
   
	};
	
	// Creates and shows the modal dialog
	$.md.showDialog= function  (msg, options) {
			
		// Merge default title (per type), default settings, and user defined settings
		var settings = $.extend( $.md.defaults, options);
		settings.type=settings.type.toLowerCase();
		 
		//if an invalid dialog type, default to error
		if(!$.inArray(settings.type, $.md.DialogTypes) || settings.type=='error') {
			settings.type='err';
		}
		//if no title is entered, default to selected dialog type
		if(settings.title=='' || typeof settings.title == 'undefined'){
			settings.title=$.md.DialogTitles[settings.type];
		}
		// If there's no timeout, make sure the close button is show (or the dialog can't close)
		settings.timeout = (typeof(settings.timeout) == "undefined") ? 0 : settings.timeout;
		settings.showClose = ((typeof(settings.showClose) == "undefined") | !settings.timeout) ? true : !!settings.showClose;

		// Check if the dialog elements exist and create them if not
		if (!document.getElementById('md')) {
			var d = new Date();
			
			if($.md.ie){
				document.createStyleSheet(settings.cssDir+'/jquery.md.css?'+d.getTime());
				document.createStyleSheet(settings.cssDir+'/jquery.md-ie.css?'+d.getTime());
			}
			else
				$('head').append('<link type="text/css" rel="stylesheet" href="'+settings.cssDir+'/jquery.md.css?'+d.getTime()+'" />');
			$('body').prepend(
				"<div id='md-mask'>&nbsp;</div>"+
				"<div id='md'>"+
				"<div id='md-header'>" +
					"<div id='md-title'></div>" +
					"<div id='md-close'></div>" +
				"</div>" +
				"<div id='md-content'>" +
					"<div id='md-content-inner' />" +
					"<div id='md-button-container'>" +
						"<input type='button' class='md-button' value='Close'>" +
					"</div>" +
				"</div>"+
				"</div>"
				);
							 
			$('#md').hide();
			$('#md-mask').hide();
			 

			// Set the click event for the "x" and modal            
			$("#md-close").click($.md.hide);
			//$(".md-button").click($.md.hide);
			$('#md-mask').click($.md.hide);
		}

		var dl = $('#md');
		//set title and content
		$('#md-title').html(settings.title);
		$('#md-content-inner').html(msg);
		
		// erase the old buttons            
		$('#md-button-container').html('');
		var btn = settings.buttons;
		 
		// add the new buttons
		for(x in btn){
			$('#md-button-container').append("<input type='button' class='md-button' id='md-button-"+x+"' value='"+x+"'>");
			$('#md-button-'+x).click(btn[x]);
		}
		if($.md.ie){
			dl.css('position','absolute');
		}
		dl.css('width', settings.width);
		 
		$.md.setPosition(settings.position);
		 
		//switch close and buttons on and off
		if (!settings.showClose) {
			$('#md-close').hide();
			$('#md-button-container').hide();
		} else {
			$('#md-close').show();
			$('#md-button-container').show();
		}
		 
		// remove the dialog type classes and replace them with the new type
		for(i=0;i<$.md.DialogTypes.length;i++){
			$('#md-header').removeClass($.md.DialogTypes[i]+ 'header');
			$('#md-content').removeClass($.md.DialogTypes[i]);
			$('.md-button').removeClass($.md.DialogTypes[i]+ 'button');
		}
		$('#md-header').addClass(settings.type + "header");
		$('#md-content').addClass(settings.type);
		$('.md-button').addClass(settings.type + "button");

		$('#md-mask').css('background-color',settings.modalBG);
		
		// set timeout
		if (settings.timeout) {
			window.setTimeout("$.md.hide();", (settings.timeout * 1000));
		}
		 
		// get the mask height. Use document height unless it's smaller than the window
		if($(document).height() > $(window).height())
			$('#md-mask').height($(document).height());
		else
			$('#md-mask').height($(window).height());
			 
		// fade the dialog in
		dl.fadeIn("slow");
		
		//only fade in modal if set to true
		if(settings.modal)
			$('#md-mask').fadeTo("normal",0.8);
		 
		return true;
	};
	
	//set the position of the dialog box
	$.md.setPosition=function(position){
			var pos = position.split(' ',2);
			var top;
			var left;
            var dl = $('#md');
			
			//get the vertical
			if(pos[0] =='top')
				top = 0;
			else if(pos[0] =='bottom')
				top = Math.abs($(window).height() - dl.height());
			else if(String(parseInt(pos[0])) == pos[0])
				top = pos[0];
			else
				top = Math.abs($(window).height() - dl.height()) / 2;
				
			//get the horizontal
			if(pos[1] =='left')
				left = 0;
			else if(pos[1] =='right')
				left = ($(window).width() - dl.width());
			else if(String(parseInt(pos[1])) == pos[1])
				left = pos[1];
			else
				left = ($(window).width() - dl.width()) / 2;
			
			//set the position
			dl.css('left', left);
			dl.css('top', top);
			
			//dl.css('top', (top >= 25) ? top : 25);
	};
     
    //hide the dialog window
    $.md.hide=function () {
            $('#md').fadeOut("slow", function () { $(this).hide(0); });
            $('#md-mask').fadeOut("normal", function () { $(this).hide(0); });
            return true;
    };
})( jQuery );