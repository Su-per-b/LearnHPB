
goog.require ("lgb.Base");
goog.require ("lgb.controller.ControllerBase");
goog.require ("lgb.controller.MainController");
goog.require('lgb.controller.LoaderController');		

function main() {
  
  //var base = new lgb.Base();
  
  //var x = 0;
  //base.load();
  
  //var controllerBase = new lgb.controller.ControllerBase();
  //controllerBase.load();
  
 var mainController = new lgb.controller.MainController();
 mainController.init();
    
}

