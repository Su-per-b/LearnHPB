self.addEventListener('message', function (event) {
  
  this.postMessage(  event.data.replace('Worker', 'Main Window')  );

});

