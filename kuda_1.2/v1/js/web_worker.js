


function startupnow() {
    //setupParticleSystems1();
    console.log("startupnow");
}

/* arithmetic.js */
 
function addNumbers(x,y) {
    return x + y;
}
 
function mulNumbers(x,y) {
    return x*y;
}
 
onmessage = function(event) {

    // console.log('In worker: ') + event.data;
        alert('In worker: ');
    // var message = "In worker on message method  :" + event.data;
     //postMessage(message);
};
 
/* 
   Add a event listener to the worker, this will
   be called when the worker receives a message
   from the main page.
*/
this.onmessage2 = function (event) {
     console.log("onmessage");
     return;
     
    var data = event.data;
 
    switch(data.op) {
        case 'mult':
        postMessage(mulNumbers(data.x, data.y));
        break;
        case 'add':
        postMessage(addNumbers(data.x, data.y));
        break;
        default:
        postMessage("Wrong operation specified");
    }
};
