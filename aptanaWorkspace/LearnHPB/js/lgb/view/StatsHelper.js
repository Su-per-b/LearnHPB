/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.StatsHelper');

goog.require('lgb.view.ViewBase');




/**
 * @constructor
 * @param {Element} containerDiv The DOM element to append to.
 * @extends {lgb.view.ViewBase}
 */
lgb.view.StatsHelper = function(containerDiv) {
  lgb.view.ViewBase.call(this);

  this.init_(containerDiv);
  this._NAME = 'lgb.view.StatsHelper';
};
goog.inherits(lgb.view.StatsHelper, lgb.view.ViewBase);



/**
 * Initializes the View
 * @param {Element} containerDiv The DOM element to append to.
 * @private
 */
lgb.view.StatsHelper.prototype.init_ = function(containerDiv) {


 this._mode = 0;
 this._modesCount = 2;

 this._frames = 0;
 this._time = new Date().getTime();
 this._timeLastFrame = this._time;
 this._timeLastSecond = this._time;

 this._fps = 0;
 this._fpsMin = 1000;
 this._fpsMax = 0;

 this._ms = 0;
 this._msMin = 1000;
 this._msMax = 0;

 this._mb = 0;
 this._mbMin = 1000;
 this._mbMax = 0;

 //ok
  this._colors = {
    fps: {
      bg: { r: 16, g: 16, b: 48 },
      fg: { r: 0, g: 255, b: 255 }
    },
    ms: {
      bg: { r: 16, g: 48, b: 16 },
      fg: { r: 0, g: 255, b: 0 }
    },
    mb: {
      bg: { r: 48, g: 16, b: 26 },
      fg: { r: 255, g: 0, b: 128 }
    }
  };

  this._container = document.createElement('div');
  this._container.style.cursor = 'pointer';
  this._container.style.width = '80px';
  this._container.style.opacity = '0.9';
  this._container.style.zIndex = '10001';

  var delegate = this.d(this.swapMode);
  this._container.addEventListener('click', delegate, false);

  this._fpsDiv = document.createElement('div');
  this._fpsDiv.style.backgroundColor =
    'rgb(' + Math.floor(this._colors.fps.bg.r / 2) +
    ',' + Math.floor(this._colors.fps.bg.g / 2) + ',' +
    Math.floor(this._colors.fps.bg.b / 2) + ')';

  this._fpsDiv.style.padding = '2px 0px 3px 0px';
  this._container.appendChild(this._fpsDiv);

  this._fpsText = document.createElement('div');
  this._fpsText.style.fontFamily = 'Helvetica, Arial, sans-serif';
  this._fpsText.style.textAlign = 'left';
  this._fpsText.style.fontSize = '9px';
  this._fpsText.style.color =
    'rgb(' + this._colors.fps.fg.r + ',' +
      this._colors.fps.fg.g + ',' +
      this._colors.fps.fg.b + ')';

  this._fpsText.style.margin = '0px 0px 1px 3px';
  this._fpsText.innerHTML = '<span style="font-weight:bold">FPS</span>';
  this._fpsDiv.appendChild(this._fpsText);

  this._fpsCanvas = document.createElement('canvas');
  this._fpsCanvas.width = 74;
  this._fpsCanvas.height = 30;
  this._fpsCanvas.style.display = 'block';
  this._fpsCanvas.style.marginLeft = '3px';
  this._fpsDiv.appendChild(this._fpsCanvas);

  //OK
  this._fpsContext = this._fpsCanvas.getContext('2d');
  this._fpsContext.fillStyle =
    'rgb(' + this._colors.fps.bg.r +
     ',' + this._colors.fps.bg.g + ',' +
     this._colors.fps.bg.b + ')';

  this._fpsContext.fillRect(
    0, 0, this._fpsCanvas.width, this._fpsCanvas.height);

  this._fpsImageData = this._fpsContext.getImageData(
    0, 0, this._fpsCanvas.width, this._fpsCanvas.height);

  this.performance = false;

  // ms
  this._msDiv = document.createElement('div');
  this._msDiv.style.backgroundColor =
    'rgb(' + Math.floor(this._colors.ms.bg.r / 2) +
    ',' + Math.floor(this._colors.ms.bg.g / 2) + ',' +
    Math.floor(this._colors.ms.bg.b / 2) + ')';

  this._msDiv.style.padding = '2px 0px 3px 0px';
  this._msDiv.style.display = 'none';
  this._container.appendChild(this._msDiv);

  this._msText = document.createElement('div');
  this._msText.style.fontFamily = 'Helvetica, Arial, sans-serif';
  this._msText.style.textAlign = 'left';
  this._msText.style.fontSize = '9px';

  this._msText.style.color =
    'rgb(' + this._colors.ms.fg.r + ',' +
     this._colors.ms.fg.g + ',' +
     this._colors.ms.fg.b + ')';

  this._msText.style.margin = '0px 0px 1px 3px';
  this._msText.innerHTML = '<span style="font-weight:bold">MS</span>';
  this._msDiv.appendChild(this._msText);

  this._msCanvas = document.createElement('canvas');
  this._msCanvas.width = 74;
  this._msCanvas.height = 30;
  this._msCanvas.style.display = 'block';
  this._msCanvas.style.marginLeft = '3px';
  this._msDiv.appendChild(this._msCanvas);

  this._msContext = this._msCanvas.getContext('2d');
  this._msContext.fillStyle =
    'rgb(' + this._colors.ms.bg.r + ',' +
      this._colors.ms.bg.g + ',' + this._colors.ms.bg.b + ')';

  this._msContext.fillRect(0, 0, this._msCanvas.width, this._msCanvas.height);

  this._msImageData = this._msContext.getImageData(
    0, 0, this._msCanvas.width, this._msCanvas.height);

  this._mbDiv = document.createElement('div');
  this._mbDiv.style.backgroundColor =
    'rgb(' + Math.floor(this._colors.mb.bg.r / 2) +
    ',' + Math.floor(this._colors.mb.bg.g / 2) + ',' +
    Math.floor(this._colors.mb.bg.b / 2) + ')';

  this._mbDiv.style.padding = '2px 0px 3px 0px';
  this._mbDiv.style.display = 'none';
  this._container.appendChild(this._mbDiv);

  this._mbText = document.createElement('div');
  this._mbText.style.fontFamily = 'Helvetica, Arial, sans-serif';
  this._mbText.style.textAlign = 'left';
  this._mbText.style.fontSize = '9px';
  this._mbText.style.color = 'rgb(' +
    this._colors.mb.fg.r + ',' +
    this._colors.mb.fg.g + ',' +
    this._colors.mb.fg.b + ')';
    this._mbText.style.margin = '0px 0px 1px 3px';

  this._mbText.innerHTML = '<span style="font-weight:bold">MB</span>';
  this._mbDiv.appendChild(this._mbText);

  this._mbCanvas = document.createElement('canvas');
  this._mbCanvas.width = 74;
  this._mbCanvas.height = 30;
  this._mbCanvas.style.display = 'block';
  this._mbCanvas.style.marginLeft = '3px';
  this._mbDiv.appendChild(this._mbCanvas);

  this._mbContext = this._mbCanvas.getContext('2d');
  this._mbContext.fillStyle = '#301010';
  this._mbContext.fillRect(0, 0, this._mbCanvas.width, this._mbCanvas.height);

  this._mbImageData = this._mbContext.getImageData(
    0, 0, this._mbCanvas.width, this._mbCanvas.height);

  this.domElement = this._container;

};



/**
 * changes from MS to FPS
 */
lgb.view.StatsHelper.prototype.swapMode = function() {

  this._mode++;
  this._mode == this._modesCount ? this._mode = 0 : this._mode;

  this._fpsDiv.style.display = 'none';
  this._msDiv.style.display = 'none';
  this._mbDiv.style.display = 'none';

  switch (this._mode) {
    case 0:
      this._fpsDiv.style.display = 'block';
      break;
    case 1:
      this._msDiv.style.display = 'block';
      break;
    case 2:
      this._mbDiv.style.display = 'block';
      break;
  }
};


/**
 * called every animation frame to update the stats.
 */
lgb.view.StatsHelper.prototype.update = function() {
    this._frames++;
    this._time = new Date().getTime();

    this._ms = this._time - this._timeLastFrame;
    this._msMin = Math.min(this._msMin, this._ms);
    this._msMax = Math.max(this._msMax, this._ms);

    this.updateGraph(
      this._msImageData.data,
      Math.min(30, 30 - (this._ms / 200) * 30),
      'ms'
    );


    this._msText.innerHTML = '<span style="font-weight:bold">' +
    this._ms + ' MS</span> (' + this._msMin + '-' + this._msMax + ')';

    this._msContext.putImageData(this._msImageData, 0, 0);

    this._timeLastFrame = this._time;

    if (this._time > this._timeLastSecond + 1000) {

      this._fps = Math.round((this._frames * 1000) /
        (this._time - this._timeLastSecond));

      this._fpsMin = Math.min(this._fpsMin, this._fps);
      this._fpsMax = Math.max(this._fpsMax, this._fps);

      this.updateGraph(
        this._fpsImageData.data,
        Math.min(30, 30 - (this._fps / 100) * 30),
        'fps'
      );

      this._fpsText.innerHTML = '<span style="font-weight:bold">' +
        this._fps + ' FPS</span> (' + this._fpsMin + '-' + this._fpsMax + ')';

      this._fpsContext.putImageData(this._fpsImageData, 0, 0);
      this._timeLastSecond = this._time;
      this._frames = 0;
   }
};


/**
 * called every animation frame to update the graph.
 * @param {*} data Th data.
 * @param {number} value Th value.
 * @param {*} color Th color.
 */
lgb.view.StatsHelper.prototype.updateGraph = function(data, value, color) {

  var x, y, index;

  for (y = 0; y < 30; y++) {
    for (x = 0; x < 73; x++) {
      index = (x + y * 74) * 4;
      data[index] = data[index + 4];
      data[index + 1] = data[index + 5];
      data[index + 2] = data[index + 6];
    }
  }

  for (y = 0; y < 30; y++) {
    index = (73 + y * 74) * 4;
    if (y < value) {
      data[index] = this._colors[color].bg.r;
      data[index + 1] = this._colors[color].bg.g;
      data[index + 2] = this._colors[color].bg.b;
    } else {
      data[index] = this._colors[color].fg.r;
      data[index + 1] = this._colors[color].fg.g;
      data[index + 2] = this._colors[color].fg.b;
    }
  }
};

