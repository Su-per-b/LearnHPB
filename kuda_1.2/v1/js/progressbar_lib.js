var maxprogress = 200;   // total to reach
//var actualprogress = 0;  // current value


function progressReset() {
	
}

function progressUpdate(percent) {
  var progressnum = document.getElementById("progressnum");
  var indicator = document.getElementById("indicator");
  var progressbarBackground = document.getElementById("progressbarBackground");
  
  	  
  var px = maxprogress * (percent / 100);
	
  //console.log ('px: ' + px);
				
  //if(actualprogress >= px) 
 //// {
    //return;
 // }
  

  
  indicator.style.width=px + 'px';
  progressnum.innerHTML = actualprogress = +percent + '%';
	  
  if (percent == '100') {
  	indicator.style.visibility = "hidden";
  	progressnum.style.visibility = "hidden";
  	progressbarBackground.style.visibility = "hidden";
  	
  }
  	  

  
  


  

  
	
}