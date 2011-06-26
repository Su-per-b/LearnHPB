

var lgb = (function(lgb){

    lgb.controller = lgb.controller || {};
    
    
    /**
     * @class MVC controller for the Admin interface
     * @extends lgb.controller.ControllerBase
     */
    lgb.controller.GuiController = function(){
    
        lgb.controller.ControllerBase.call(this);
        
    };
    
    
    lgb.controller.GuiController.prototype = {
    
        init: function(dataModelArray){
        
            this.latestResizeWidth = window.innerWidth;
            this.latestResizeHeight = window.innerHeight;
            
            var oTop = document.documentElement.scrollTop;
            document.documentElement.scroll = "no";
            document.documentElement.style.overflow = "hidden";
            document.documentElement.scrollTop = oTop;
            
			this.listen(lgb.event.Event.WINDOW_RESIZE, this.onWindowResize);
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
        onWindowResize: function(event){
        
            if ((this.latestResizeWidth == window.innerWidth) && (this.latestResizeHeight == window.innerHeight)) {
                return;
            }
            
            this.latestResizeWidth = window.innerWidth;
            this.latestResizeHeight = window.innerHeight;
            this.setCanvasSize();
            
        },
		/*
		*@function shows the heads up display, note this does not call the Kuda API
		*/
        showHud: function(){
        
            this.initMenu('leftNav', {targetBottom: 90,targetLeft: -63});
            this.initMenu('topTitle',  {centerX: true,targetTop: -41});
            this.initMenu('adminPanel',  { targetRight: -40,targetBottom: 180});
            
            floatingMenu.init();
            
            floatingArray[0].targetLeft = 0;
            floatingArray[1].targetTop = 0;
            floatingArray[2].targetRight = 8;
            
        },
        initMenu: function(id, floatingMenuConfig){
        
        
            element = document.getElementById(id);
            floatingMenuConfig.snap = true;
            
            if (null === element) {
                throw new Error('GuiController.initMenu() id: {0} not found in HTML document'.format(id));
            }
            else {
                floatingMenu.add(id, floatingMenuConfig);
            }
        }
        
        
        
        
    };
    
    lgb.controller.GuiController.inheritsFrom(lgb.controller.ControllerBase);
    
    return lgb;
    
})(lgb || {});










