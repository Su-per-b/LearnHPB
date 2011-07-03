
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Visibility
	 */
	lgb.view.VisibilityView = function(dataModel){
		lgb.view.ViewBase.call(this, dataModel);
	
		//this.dataModel = dataModel;
	//	this.listen(lgb.event.Visibility.DATA_MODEL_CHANGED, this.onDataModelChanged);
	};
	
	lgb.view.VisibilityView.prototype = {
	
			

		show : function() {

		},
			

		
		onDataModelChanged : function(event) {
			//this.dataModel.transform.visible = this.dataModel.isVisible;
			
			this.setTransformOpacity(0.5, true);
		},
		
		setTransformOpacity: function(opacity, opt_trickle) {
			
			var transform = this.dataModel.transform;
			
			var update = this.getTransformUpdate(transform),
				shapes = transform.shapes,
				o = transform.getParam('opacity'),
				trickle = opt_trickle == null ? true : opt_trickle;
			
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
			
			o.value = opacity;
			update.opacity = opacity === 1 ? null : opacity;
			
			if (trickle) {
				var children = transform.children;
				
				for (var i = 0, il = children.length; i < il; i++) {
					this.setTransformOpacity(children[i], opacity, true);
				}
			}
		},


	};

	lgb.view.VisibilityView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











