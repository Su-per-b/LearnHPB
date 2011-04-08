var maxprogress = 200;   // total to reach
var actualprogress = 0;  // current value
var itv = 0;  // id to setinterval

function prog()
{
  if(actualprogress >= maxprogress) 
  {
    clearInterval(itv);   	
    return;
  }	
  var progressnum = document.getElementById("progressnum");
  var indicator = document.getElementById("indicator");
  actualprogress += 1;	
  indicator.style.width=actualprogress + 'px';
  progressnum.innerHTML = actualprogress;
  if(actualprogress == maxprogress) clearInterval(itv);   
}

function progressUpdate(percent) {
	
  var px = maxprogress * (percent / 100);
	
  console.log ('px: ' + px);
				
  if(actualprogress >= px) 
  {
    clearInterval(itv);   	
    return;
  }
  
  var progressnum = document.getElementById("progressnum");
  var indicator = document.getElementById("indicator");
  
  actualprogress += 1;	
  indicator.style.width=px + 'px';
  progressnum.innerHTML = actualprogress = +percent + '%';
  
  if(actualprogress == maxprogress) clearInterval(itv);  
  
	
}