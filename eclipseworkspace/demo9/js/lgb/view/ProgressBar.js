/**
 * @author Raj Dye
 * For showing the progress bar of a file load on the screen
 * this requires that the page have the following html
 * 
 *   <div id="progressbarBackground">  
        <div id="progressbar">
            <div id="progressbarTitle">Loading Geometry</div>
            <div id="indicator"><div id="progressnum">0</div></div>
        </div>
    </div>
   in MVC this is  a view class
    
 */

var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Admin Panel
	 * it handles the life-cycle of the subpanels, 
	 * and the various AJAX components
	 */
	lgb.view.ProgressBar = function(){
		lgb.view.ViewBase.call(this);

		this.maxprogress = 200; // total to reach
		this.title = "title";
	
	};
	
	lgb.view.ProgressBar.prototype = {
	
		init : function(theTitle) {
			
			if (null !== theTitle ) {
				this.title = theTitle;
			}
			this.injectHtml();
						
			this.progressnum = document.getElementById("progressnum");
		    this.indicator = document.getElementById("indicator");
		 	this.progressbarBackground = document.getElementById("progressbarBackground");
			this.progressbarTitle = document.getElementById("progressbarTitle");
			this.progressbarTitle.innerHTML = this.title;
			this.center();
			
			this.listen(lgb.event.Loader.PROGRESS_UPDATE, this.onProgress);
			this.listen(lgb.event.Event.ALL_MESHES_LOADED, this.onAllMeshesLoaded);

		
		},
		
		injectHtml : function() {

			var html = '\
			    <div id="progressbarBackground">\
			        <div id="progressbar">\
			            <div id="progressbarTitle">Loading Geometry</div>\
			            <div id="indicator"><div id="progressnum">0</div></div>\
			        </div>\
			    </div>';
			
			$('body').append(html);

		},
		
		center : function() {
		
			var centerX = window.innerWidth / 2;
			var centerY = window.innerHeight / 2;
			
			var x = Math.round(centerX - (this.progressbarBackground.offsetWidth/2));
			var y = Math.round(centerY - (this.progressbarBackground.offsetHeight/2));
			
			this.progressbarBackground.style.left=x + 'px';
			this.progressbarBackground.style.top=y + 'px';
		},
		
		
		hide : function() {
			this.setVisible(false);
		},
		
		show : function() {
			this.setVisible(true);
		},
		
		setVisible : function(isVisible) {
			
			var style;
			
			if (isVisible) {
				style = "visible";
			} else {
				style = "hidden";
			}
		
		  	this.indicator.style.visibility = style;
		  	this.progressnum.style.visibility = style;
		  	this.progressbarBackground.style.visibility = style;
			this.progressbarTitle.style.visibility = style;
		},
		
		onAllMeshesLoaded : function(event) {
			window.setTimeout(this.d(this.hide),200);
		},
		
		onProgress : function(event) {
			
			//console.log('Progressbar.prototype.onProgress: ' + percent);			     
		 var percent = event.value;
		
		  if (percent === 0) {
		  	return;
		  }
		  
		  var px = this.maxprogress * (percent / 100);
		  
		  this.indicator.style.width=px + 'px';
		  this.progressnum.innerHTML = actualprogress = +percent + '%';
		
		
		}
	};

	lgb.view.ProgressBar.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











