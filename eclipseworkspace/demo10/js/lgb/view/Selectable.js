
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Visibility
	 */
	lgb.view.Selectable = function(transform, transformBox, transformName) {
		lgb.Base.call(this);
		
		this.transform = transform;
		this.transformBox = transformBox;
		this.transformName = transformName;
		
		var func = this.d(this.onPick);
		hemi.world.subscribe(hemi.msg.pick, func);
		
		this.transformBox.visible = false;
	};
	
	lgb.view.Selectable.prototype = {
	
		onPick : function(msg) {
			var pickedName = msg.data.pickInfo.shapeInfo.parent.transform.name;
			console.log("hemi.msg.pick: " + pickedName);
			
			if (pickedName == this.transformName) {
				
				var visibleState = !this.transformBox.visible;
				//this.transformBox.setTransformVisible(this.transform, visibleState);
				
				this.transformBox.visible = visibleState;

			}
		}

	};

	lgb.view.Selectable.inheritsFrom(lgb.Base);

	return lgb;
	
})(lgb || {});











