
	
	function Hud(fileName) {
		this.fileName = fileName;
	}
	
	


	Hud.prototype.resize = function() {

		this.display.hide();
		//this.display.cleanup();
		hemi.hud.init();

	
		this.display = new hemi.hud.HudDisplay();
		this.image.y = window.innerHeight  - this.image.height -20;
		
		this.display.clearPages() ;
		this.display.addPage(this.page);	
		this.display.show();
		//this.page.show();
	}
	
	

	Hud.prototype.create = function() {
		this.display = new hemi.hud.HudDisplay();
		this.page = new hemi.hud.HudPage();

		this.page.drawBackground = false;
	//	this.page.autosize() 
		
		//this.height = 352;
		
		this.image = new hemi.hud.HudImage();


		this.msgHandler = this.image.subscribe (
		  hemi.msg.load,
		  this,
		  'show'
		);
		

		this.image.setImageUrl(this.fileName);
		
	}
	
	
	
	
	Hud.prototype.cleanup = function() {
			this.page.clearElements();
			this.page.cleanup() ;
			//this.page = null;
			this.display.hide() ;
			this.display.cleanup() ;
	}
	
		

	Hud.prototype.show = function() {
		
		this.msgHandler = this.image.unsubscribe (
		  hemi.msg.load
		);
		

		this.image.y = window.innerHeight  - this.image.height -20;
		this.page.addElement(this.image);
		this.display.addPage(this.page);	
		this.display.show();
	}

					