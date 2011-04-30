jqUnit.module("PASS");

jqMock.addShortcut();  


o3djs.require('lgb.core');
o3djs.require('lgb.animation');
o3djs.require('lgb.gui');
o3djs.require('lgb.loader');
o3djs.require('lgb.progressBar');
o3djs.require('lgb.utils');




	//jQuery(document).ready($.proxy(this.onDocumentReady, this));	

	
//var onDocumentReady = function(event) {


//}

	
jqUnit.test("LGB", function() {
	
	jqMock.assertThat(lgb,is.anything);
	jqMock.assertThat(lgb.core,is.anything);
	jqMock.assertThat(lgb.animation,is.anything);
	jqMock.assertThat(lgb.gui,is.anything);
	
	jqMock.assertThat(lgb.loader,is.anything);
	jqMock.assertThat(lgb.progressBar,is.anything);
	jqMock.assertThat(lgb.utils,is.anything);
	
});




