
	
	function Hud(fileName) {
		this.fileName = fileName;
	}
	
	

	Hud.prototype.create = function() {
		this.display = new hemi.hud.HudDisplay();
		this.page = new hemi.hud.HudPage();
		
		this.page.calculateBounds();
	
		
		this.page.drawBackground = false;
		
		this.image = new hemi.hud.HudImage();
		this.image.y = -200;
		
		
		this.msgHandler = this.image.subscribe (
		  hemi.msg.load,
		  this,
		  'show'
		);
		
		
		this.image.setImageUrl(this.fileName);
	}
	
	
	
	
	Hud.prototype.cleanup = function() {
			this.page.clearElements();
			this.image.cleanup() ;
			this.page.cleanup() ;
			this.display.hide() ;
			this.display.cleanup() ;
	}
	
		
	Hud.prototype.reCreate = function() {
			this.page.clearElements();
			this.image.cleanup() ;
			this.page.cleanup() ;
			this.display.cleanup() ;
			
			
			this.display = new hemi.hud.HudDisplay();
			this.page = new hemi.hud.HudPage();
			this.page.drawBackground = false;
			this.image = new hemi.hud.HudImage();
			this.image.setImageUrl('images/leftnav.png?we');
		
		this.msgHandler = this.image.subscribe (
		  hemi.msg.load,
		  this,
		  'show'
		);
		
			//this.display.hide();
		//	this.create();
			//this.display.hide();
		//	this.image.texture.height =400;
		//	this.image.texture.width =70;
			//this.create();
		//	this.page.addElement(this.image);
		//	this.display.addPage(this.page);
		
		//this.image.loadImage();
		//this.image.cleanup() ;
		//this.page.cleanup() ;
		//this.display.cleanup() ;
		
		//this.create();
	}
	
	Hud.prototype.show = function() {
		
		this.msgHandler = this.image.unsubscribe (
		  hemi.msg.load
		);
		
		this.page.addElement(this.image);
		this.display.addPage(this.page);	
		this.display.show();
	}

					