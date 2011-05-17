

function Progressbar() {
	this.maxprogress = 200; // total to reach
	this.title = "title";
}



Progressbar.prototype.init = function(theTitle) {
	//this.onProgress(0);
	
	if (theTitle != null) {
		this.title = theTitle;
	}

	this.progressnum = document.getElementById("progressnum");
    this.indicator = document.getElementById("indicator");
 	this.progressbarBackground = document.getElementById("progressbarBackground");
	this.progressbarTitle = document.getElementById("progressbarTitle");
	this.progressbarTitle.innerHTML = this.title;

};


Progressbar.prototype.hide = function(percent) {
	this.setVisible(false);
};

Progressbar.prototype.show = function() {
	this.setVisible(true);
};

Progressbar.prototype.setVisible = function(isVisible) {
	
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
};




Progressbar.prototype.onProgress = function(percent) {
	
	//console.log('Progressbar.prototype.onProgress: ' + percent);			     

  if (percent == '0') return;
  var px = this.maxprogress * (percent / 100);
  
  this.indicator.style.width=px + 'px';
  this.progressnum.innerHTML = actualprogress = +percent + '%';


};

