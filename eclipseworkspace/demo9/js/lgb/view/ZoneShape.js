
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Visibility
	 */
	lgb.view.ZoneShape = function(height,width,depth, xPos, yPos, zoneNumber){
		lgb.view.ViewBase.call(this);
		
		
		this.height = height;
		this.width = width;
		this.depth = depth;
		this.xPos = xPos;
		this.yPos = yPos;
		this.zoneNumber = zoneNumber;
		
		this.maxOpacity = 0.7;
			
		this.shape = hemi.shape.create(
			{
				shape: 'box',
				color: [1,0,0,this.maxOpacity],
				h:  this.height, 
				w: this.width, 
				d: this.depth 
			}
		);
			
		
		
		this.centerDepth = this.depth /2;
		this.centerHeight = this.height /2;
		this.centerWidth = this.width /2;
		this.shape.visible = false;

		this.fadeEffect = new lgb.kuda.FadeEffect(this.shape);
		this.fadeEffect.setOpacity(0);
		this.fadeEffect.opacityMax = 0.8;
		this.fadeEffect.opacityMin = 0;
		this.fadeEffect.fadeDelta = 0.2;
		this.fadeEffect.trickleFlag = false;

		$(this.fadeEffect).bind(lgb.event.Event.FADE_OUT_COMPLETE, this.d(this.onFadeOutComplete));
			

	};
	
	lgb.view.ZoneShape.prototype = {
	
		position : function(verticalHeight) {
			this.verticalHeight = verticalHeight;
			
			this.shape.identity();
			this.shape.rotateX(4.715);
			
			this.x = this.centerWidth + this.xPos ;
			this.y = this.centerHeight + this.yPos;
			this.z = this.centerDepth + verticalHeight - this.depth;
			
			this.shape.translate(this.x, this.y, this.z);
		},
		onFadeOutComplete : function(event) {
			this.shape.visible = false;
		},

		show : function() {
			this.shape.visible = true;
			this.fadeEffect.fadeIn();
		},
		hide : function() {
			this.fadeEffect.fadeOut();
			//this.shape.visible = false;
		}

	};

	lgb.view.ZoneShape.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











