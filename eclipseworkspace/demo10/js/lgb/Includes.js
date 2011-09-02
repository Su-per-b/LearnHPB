
var delegate = $.proxy(onDocumentReady, this);

/*
$.include("js/lgb/Global.js");
		$.include("js/lgb/controller/Base.js");
				$.include("js/lgb/controller/ControllerBase.js");
	$.include("js/lgb/controller/LoaderController.js");			
$.include("js/lgb/controller/MainController.js");


var functionsAry = [
	$.include("js/lgb/Global.js"),
	$.include("js/lgb/controller/Base.js"),
	$.include("js/lgb/controller/ControllerBase.js")
];
*/

//$.include("js/lgb/Global.js");
//$.include("js/lgb/controller/Base.js");
//$.include("js/lgb/controller/ControllerBase.js");
//$.include( "js/lgb/controller/MainController.js" , onDocumentReady);


	
	
$.include( "js/lgb/controller/MainController.js",
	[
		$.include("js/lgb/Global.js"),
		$.include("js/lgb/controller/Base.js"),
		$.include("js/lgb/controller/ControllerBase.js")
	
	]
);

	
//$.include("js/lgb/controller/MainController.js");
//a$.include("js/lgb/controller/LoaderController.js");




//$.include("js/lgb/controller/LoaderController.js", delegate);

//$(document).ready(onDocumentReady);



/*
$.include( 
	"js/lgb/Base.js" , 
		[	
			$.include( "js/lgb/Global.js" ),
			$.include( "js/lgb/Config.js" )
		]
	);


 * 
parsed Global
parsed Config
parsed Base
 */

function onDocumentReady( event ) {
	//	var mainController = new lgb.controller.MainController();
	//mainController.init();
}


console.log("parsed Includes");

