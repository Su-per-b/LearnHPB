
/**
 * @namespace
 */
var lgb = (function(lgb){



    lgb.util = lgb.util || {};
    
    /**
     * @class initilizes the Kuda/O3d world and handles the loading of meshes
     * fires off a PROGRESS_UPDATE events and an ALL_MESHES_LOAD_COMPLETE event
     */
    lgb.util.Loader = function(){
        lgb.Base.call(this);
		
        this.subscriberWorldReady = null;
        this.subscriberCameraStopped = null;
        this.meshList = [];
    };
    
    
    lgb.util.Loader.prototype = {
    

        loadMeshes: function(meshList){
            this.meshList = meshList;
            o3djs.webgl.makeClients(this.d(this.onMakeClientsComplete));
        },
		
        onMakeClientsComplete: function(clientElements){
            hemi.core.init(clientElements[0]);
			
			//at this point we init theworld camera again so 
			// that we can use a sublcass
			lgb.Cam.staticInit();
			var cam = new lgb.Cam();
			cam.init();
			
			hemi.world.setCamera(cam);
            hemi.view.setBGColor(lgb.Config.BACKGROUND_COLOR);

            this.subscriberWorldReady = hemi.world.subscribe(hemi.msg.ready, this.d(this.onWorldReady));
            this.subscriberOnProgress = hemi.world.subscribe(hemi.msg.progress, this.d(this.onProgress));
            
            //loop through all the filenames and set them up to load asynchronously
            var len = this.meshList.length;
            
			this.dispatch(lgb.event.Loader.ALL_MESHES_LOAD_START);
			
            for (var i = 0; i < len; i++) {
                var mesh = this.meshList[i];
                mesh.load();
            }
            
            hemi.world.ready(); // Indicate that we are ready to start our script
        },
		
        onWorldReady: function() {
            hemi.world.camera.unsubscribe(this.subscriberWorldReady, hemi.msg.stop);
			this.dispatch(lgb.event.Loader.ALL_MESHES_LOAD_COMPLETE);			
        },
		
        onProgress: function(event){
			hemi.world.camera.unsubscribe(this.subscriberOnProgress, hemi.msg.progress);
			
			var p = parseInt(event.data.percent, 10);
			this.dispatch(lgb.event.Loader.PROGRESS_UPDATE, p);
        }
        
    };
    
    
    lgb.util.Loader.inheritsFrom(lgb.Base);
    
    
    return lgb;
    
})(lgb || {});












