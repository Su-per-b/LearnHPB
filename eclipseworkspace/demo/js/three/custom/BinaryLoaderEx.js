
THREE.BinaryLoader.prototype.load = function( url, callback, loaderParameters ) {

	texturePath = loaderParameters.texturePath ? loaderParameters.texturePath : this.extractUrlBase( url );
	binaryPath = loaderParameters.binaryPath ? loaderParameters.binaryPath : this.extractUrlBase( url );

	var callbackProgress = this.showProgress ? THREE.Loader.prototype.updateProgress : null;

	this.onLoadStart();

	// #1 load JS part via web worker
	this.loadAjaxJSON( this, url, callback, texturePath, binaryPath, callbackProgress );

};
