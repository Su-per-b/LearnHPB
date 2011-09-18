
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Visibility
	 */
	lgb.view.SelectedShape = function(theTransform){
		lgb.view.ViewBase.call(this);
		
		
		var bb = theTransform.boundingBox;
		var b = [bb.minExtent, bb.maxExtent];
	
		this.width  = b[1][0] - b[0][0];
		this.height  = b[1][1] - b[0][1];
		this.depth  = b[1][2] - b[0][2];
		this.xPos = b[0][0] + this.width / 2;
		this.yPos = b[0][1] + this.height / 2; 

				
		
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
	
	lgb.view.SelectedShape.prototype = {
	
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

	lgb.view.SelectedShape.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











