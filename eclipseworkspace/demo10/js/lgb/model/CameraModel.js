




/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	
	/**
	 * @class MVC model for the building envelope
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.CameraModel = function() {
		
		lgb.model.ModelBase.call(this);


		this.title = "Camera Info";
		this.name = "CAMERA";
		

		

		this.eye = new lgb.model.component.TextInput(
				this.name,
				'Eye:',
				'0'
			);
			
		this.target = new lgb.model.component.TextInput(
				this.name,
				'Target:',
				'0'
			);
			

			

		this.userActions = [this.eye,this.target ];
		
							

		this.dispatch(lgb.event.Event.USER_ACTIONS_CREATED, this);
		this.listen(lgb.event.Cam.UPDATE, this.onCamUpdate);

	};


	lgb.model.CameraModel.prototype = {
		
		onCamUpdate : function (event) {
			
			this.jqEye = $('#' + this.eye.id);
			this.jqTarget = $('#' + this.target.id);
		
			var eye = event.value.eye;
			var target = event.value.target;
			
			eye[0] = eye[0].toFixed(2);
			eye[1] = eye[1].toFixed(2);
			eye[2] = eye[2].toFixed(2);
			target[0] = target[0].toFixed(2);
			target[1] = target[1].toFixed(2);
			target[2] = target[2].toFixed(2);
			
			var eyeStr  = "{0},{1},{2}".format(eye[0].toString(), eye[1].toString(), eye[2].toString());
			var targetStr  = "{0},{1},{2}".format(target[0].toString(), target[1].toString(), target[2].toString());
			
			this.jqEye.attr('value', eyeStr); 
			this.jqTarget.attr('value', targetStr); 

		}

	};
	

	lgb.model.CameraModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












