
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.FadeEffect = function(transform){
		lgb.view.ViewBase.call(this);
		
		this.transform = transform;
		if (lgb.notNull(this.transform)) {
			this.setOpacity(1);
		}
		

		this.fadeDirection = 0;
		this.fadeDelta = 0.08;
		this.opacityFloat= 1.0;
		this.opacityMax =1.0;
		this.opacityMin = 0.1;
		this.trickleFlag = true;
		
	};
	
	lgb.view.FadeEffect.prototype = {
	
			
		fadeIn: function(){
			
			if (0 == this.fadeDirection) {
				this.fadeDirection = 1;
				hemi.view.addRenderListener(this);
			} else {
				this.fadeDirection = 1;
			}
			
		},
		fadeOut: function(){

			if (0 == this.fadeDirection) {
				this.fadeDirection = -1;
				hemi.view.addRenderListener(this);
			} else {
				this.fadeDirection = -1;
			}
				

		},
		
		onRender : function(event) {
				
			if (
				(this.opacityFloat >= this.opacityMax && this.fadeDirection === 1) ||
				(this.opacityFloat <= this.opacityMin && this.fadeDirection === -1)
				)	
			{
				this.fadeDirection = 0;
				hemi.view.removeRenderListener(this);
			}

			var opacity =  this.opacityFloat += this.fadeDirection * this.fadeDelta;
			this.setOpacity(opacity);

		},
		setOpacity: function(opacity) {
			this.opacityFloat = opacity;
			this.setOpacityHelper_(this.transform);
		},
		setOpacityHelper_: function(transform) {
			
			
			var shapes = transform.shapes,
				o = transform.getParam('opacity');
			
			if (o == null) {
				for (var i = 0, il = shapes.length; i < il; i++) {
					var s = shapes[i],
						elements = s.elements;
					
					for (var j = 0, jl = elements.length; j < jl; j++) {
						hemi.fx.addOpacity(elements[j].material);
					}
				}
				
				o = transform.createParam('opacity','ParamFloat');
			}
			
			o.value = this.opacityFloat;

			if (this.trickleFlag) {
				var children = transform.children;
				
				for (var i = 0, il = children.length; i < il; i++) {
					this.setOpacityHelper_(children[i], true);
				}
			}
		}/*
,
		addParamHelper_: function(transform) {
			var shapes = transform.shapes;
			
			for (var i = 0, il = shapes.length; i < il; i++) {
				var s = shapes[i],
					elements = s.elements;
				
				for (var j = 0, jl = elements.length; j < jl; j++) {
					hemi.fx.addOpacity(elements[j].material);
				}
			}
			
			var o = transform.createParam('opacity','ParamFloat');
			o.value = this.opacityFloat;
			
			if (this.trickleFlag) {
				var children = transform.children;
				
				for (var i = 0, il = children.length; i < il; i++) {
					this.addParamHelper_(children[i]);
				}
			}
			
		}
*/
		
		
	};

	lgb.view.FadeEffect.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











