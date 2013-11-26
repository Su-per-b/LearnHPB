/**
 * based on THREE.TrackballControls
 * @author Eberhard Graether / http://egraether.com/
 * @author modified by Raj Dye
 */

THREE.TrackballControlsEx = function ( object, domElement ) {

	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API (public properties)
	this.screen = { width: window.innerWidth, height: window.innerHeight, offsetLeft: 0, offsetTop: 0 };
	this.radius = ( this.screen.width + this.screen.height ) / 4;

	this.rotateSpeed = 1.0;
	this.zoomSpeed = 1.2;
	this.panSpeed = 0.3;

	this.noZoom = false;
	this.noPan = false;

	this.staticMoving = false;
	this.dynamicDampingFactor = 0.2;

	this.minDistance = 0;
	this.maxDistance = Infinity;

	this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ , 84 /*t*/ ];
  this.target = new THREE.Vector3( 0, 0, 0 );

	// internals
	var _keyPressed = false,
	_state = this.STATE.NONE,

	_eye = new THREE.Vector3(),

	_rotateStart = new THREE.Vector3(),
	_rotateEnd = new THREE.Vector3(),

	_zoomStart = new THREE.Vector2(),
	_zoomEnd = new THREE.Vector2(),

	_panStart = new THREE.Vector2(),
	_panEnd = new THREE.Vector2();

  this.isDirty = true;
	// methods
	
	this.zoomNow = function(delta) {
		delta = -1.0 * delta / 40.0;
		 _zoomStart = new THREE.Vector2(0,0); 
		 _zoomEnd = new THREE.Vector2(0,delta);
		 this.isDirty = true;

	};
  this.resetZoom = function() {
    //delta = -1.0 * delta / 40.0
     _zoomStart = new THREE.Vector2(); 
     _zoomEnd = new THREE.Vector2();
     this.isDirty = true;

  };
	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	this.getMouseOnScreen = function( clientX, clientY ) {

		return new THREE.Vector2(
			( clientX - this.screen.offsetLeft ) / this.radius * 0.5,
			( clientY - this.screen.offsetTop ) / this.radius * 0.5
		);

	};

	this.getMouseProjectionOnBall = function( clientX, clientY ) {

		var mouseOnBall = new THREE.Vector3(
			( clientX - this.screen.width * 0.5 - this.screen.offsetLeft ) / this.radius,
			( this.screen.height * 0.5 + this.screen.offsetTop - clientY ) / this.radius,
			0.0
		);

		var length = mouseOnBall.length();

		if ( length > 1.0 ) {

			mouseOnBall.normalize();

		} else {

			mouseOnBall.z = Math.sqrt( 1.0 - length * length );

		}

		_eye.copy( this.object.position ).sub( this.target );

		var projection = this.object.up.clone().setLength( mouseOnBall.y );
		
		var theClone = this.object.up.clone();
		var result = theClone.cross( _eye );
		
		projection.add( theClone.setLength( mouseOnBall.x ) );
		projection.add( _eye.setLength( mouseOnBall.z ) );

		return projection;

	};

	this.rotateCamera = function() {

		var angle = Math.acos( _rotateStart.dot( _rotateEnd ) / _rotateStart.length() / _rotateEnd.length() );

		if ( angle ) {

      var newVector = new THREE.Vector3();
      newVector.crossVectors( _rotateStart, _rotateEnd );
      
			var axis = newVector.normalize();
			var	quaternion = new THREE.Quaternion();

			angle *= this.rotateSpeed;

			quaternion.setFromAxisAngle( axis, -angle );

			_eye.applyQuaternion( quaternion );
			this.object.up.applyQuaternion( quaternion );
			
			_rotateEnd.applyQuaternion( quaternion );
			

			if ( this.staticMoving ) {

				_rotateStart = _rotateEnd;

			} else {

				quaternion.setFromAxisAngle( axis, angle * ( this.dynamicDampingFactor - 1.0 ) );
				quaternion.multiplyVector3( _rotateStart );

			}

		}

	};

	this.zoomCamera = function() {

		var delta = _zoomEnd.y - _zoomStart.y;

		
		var factor = 1.0 + delta * this.zoomSpeed;

		if ( factor !== 1.0 && factor > 0.0 ) {

			
			_eye.multiplyScalar( factor );

			if ( this.staticMoving ) {

				_zoomStart = _zoomEnd;

			} else {

				_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

			}

		}

	};

	this.panCamera = function() {

		var mouseChange = _panEnd.clone().sub( _panStart );

		if ( mouseChange.lengthSq() ) {

			mouseChange.multiplyScalar( _eye.length() * this.panSpeed );

			var pan = _eye.clone().cross( this.object.up ).setLength( mouseChange.x );
			pan.add( this.object.up.clone().setLength( mouseChange.y ) );

			this.object.position.add( pan );
			this.target.add( pan );

			if ( this.staticMoving ) {

				_panStart = _panEnd;

			} else {

				_panStart.add( mouseChange.sub( _panEnd, _panStart ).multiplyScalar( this.dynamicDampingFactor ) );

			}

		}

	};

	this.checkDistances = function() {

		if ( !this.noZoom || !this.noPan ) {

			if ( this.object.position.lengthSq() > this.maxDistance * this.maxDistance ) {

				this.object.position.setLength( this.maxDistance );

			}

			if ( _eye.lengthSq() < this.minDistance * this.minDistance ) {

				this.object.position.add( this.target, _eye.setLength( this.minDistance ) );

			}

		}

	};
	
	
  this.traceInfo = function() {
    
    //var msg = this.object.getInfo();
   // lgb.logInfo(msg);
    
  };
  
  
	this.update = function() {
    
    if (!this.isDirty) {
      return;
    }
    
    this.isDirty= false;
    
		_eye.copy( this.object.position ).sub( this.target );

		this.rotateCamera();

		if ( !this.noZoom ) {

			this.zoomCamera();

		}

		if ( !this.noPan ) {

			this.panCamera();

		}

		this.object.position.addVectors( this.target, _eye );
		this.checkDistances();
		this.object.lookAt( this.target );

	};


	// listeners

	function keydown( event ) {
    this.isDirty = true;
		if ( _state !== this.STATE.NONE ) {

			return;

		} else if ( event.keyCode === this.keys[ this.STATE.ROTATE ] ) {

			_state = this.STATE.ROTATE;

		} else if ( event.keyCode === this.keys[ this.STATE.ZOOM ] && !this.noZoom ) {

			_state = this.STATE.ZOOM;

		} else if ( event.keyCode === this.keys[ this.STATE.DEBUG ] ) {

      var p = this.object.matrixWorld.getPosition();
      var r = this.object.rotation;
      
      console.log('position: ' + p.toString());
      console.log('rotation: ' + r.toString());

    } else if ( event.keyCode === this.keys[ this.STATE.PAN ] && !this.noPan ) {

			_state = this.STATE.PAN;

		}

		if ( _state !== this.STATE.NONE ) {

			_keyPressed = true;

		}

	};

	function keyup( event ) {
    this.isDirty = true;
		if ( _state !== this.STATE.NONE ) {

			_state = this.STATE.NONE;

		}

	};

	function mousedown( event ) {
    this.isDirty = true;
		event.preventDefault();
		//event.stopPropagation();

		if ( _state === this.STATE.NONE ) {

			_state = event.button;

			if ( _state === this.STATE.ROTATE ) {

				_rotateStart = _rotateEnd = this.getMouseProjectionOnBall( event.clientX, event.clientY );

			} else if ( _state === this.STATE.ZOOM && !this.noZoom ) {

				_zoomStart = _zoomEnd = this.getMouseOnScreen( event.clientX, event.clientY );

			} else if ( !this.noPan ) {

				_panStart = _panEnd = this.getMouseOnScreen( event.clientX, event.clientY );

			}

		}

	};

	function mousemove( event ) {

		if ( _keyPressed ) {

			_rotateStart = _rotateEnd = this.getMouseProjectionOnBall( event.clientX, event.clientY );
			_zoomStart = _zoomEnd = this.getMouseOnScreen( event.clientX, event.clientY );
			_panStart = _panEnd = this.getMouseOnScreen( event.clientX, event.clientY );

			_keyPressed = false;

		}

		if ( _state === this.STATE.NONE ) {

			return;

		} else if ( _state === this.STATE.ROTATE ) {

			_rotateEnd = this.getMouseProjectionOnBall( event.clientX, event.clientY );

		} else if ( _state === this.STATE.ZOOM && !this.noZoom ) {

			_zoomEnd = this.getMouseOnScreen( event.clientX, event.clientY );

		} else if ( _state === this.STATE.PAN && !this.noPan ) {

			_panEnd = this.getMouseOnScreen( event.clientX, event.clientY );

		}
		  this.isDirty = true;

	};

	function mouseup( event ) {
    this.isDirty = true;
		event.preventDefault();
		//event.stopPropagation();
      
		_state = this.STATE.NONE;
		
		this.traceInfo();

	};



	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

        

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( 'mousemove', bind( this, mousemove ), false );
	this.domElement.addEventListener( 'mousedown', bind( this, mousedown ), false );
	this.domElement.addEventListener( 'mouseup',   bind( this, mouseup ), false );

	window.addEventListener( 'keydown', bind( this, keydown ), false );
	window.addEventListener( 'keyup',   bind( this, keyup ), false );

};

THREE.TrackballControlsEx.prototype.STATE = { NONE : -1, ROTATE : 0, ZOOM : 1, PAN : 2, DEBUG : 3 };
