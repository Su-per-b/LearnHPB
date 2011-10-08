

var lgb = (function(lgb){

    lgb.controller = lgb.controller || {};
    
    
    /**
     * @class MVC controller for the Admin interface
     * @extends lgb.controller.ControllerBase
     */
    lgb.controller.GuiController = function(){
    
        lgb.controller.ControllerBase.call(this);
        this.init_();
    };
    
    
    lgb.controller.GuiController.prototype = {
    
        init_: function(){
        	
			this.listen(lgb.event.Event.WINDOW_RESIZE, this.onWindowResize);
			
            this.latestResizeWidth = window.innerWidth;
            this.latestResizeHeight = window.innerHeight;
            
            var oTop = document.documentElement.scrollTop;
            document.documentElement.scroll = "no";
            document.documentElement.style.overflow = "hidden";
            document.documentElement.scrollTop = oTop;
            
			this.setCanvasSize();
        },

        setCanvasSize: function(){
            var theO3d = document.getElementById("o3d");
            theO3d.style.width = (window.innerWidth) + 'px';
            theO3d.style.height = (window.innerHeight) + 'px';
        },
		
		/*
		*@function if the window size has actually changed, then resize the HTML5 canvas element
		*/
        onWindowResize: function(event) {
        
            if ((this.latestResizeWidth == window.innerWidth) && (this.latestResizeHeight == window.innerHeight)) {
                return;
            }
            
            this.latestResizeWidth = window.innerWidth;
            this.latestResizeHeight = window.innerHeight;
            this.setCanvasSize();
            
        }

  
    };
    
    lgb.controller.GuiController.inheritsFrom(lgb.controller.ControllerBase);
    
    return lgb;
    
})(lgb || {});










