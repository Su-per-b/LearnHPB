//@author Raj Dye raj@pcdigi.com



THREE.Loader.prototype.extractUrlBase = function(url) {

    var parts = url.split( '/' );
    parts.pop();
    return ( parts.length < 1 ? '.' : parts.join( '/' ) );


  
};


