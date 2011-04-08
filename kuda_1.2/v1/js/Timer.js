function Timer(pre) {
	
	if (pre == null) {
		pre = "";
	} else {
		this.prefix = pre;
	}
	
	
	
	this.title = "title";
}



Timer.prototype.stamp = function(msg) {
	
	if (msg == null) {
		msg = "Timer.stamp";
	}
	
	if (this.startTime == null) {
		this.startTime = parseInt(new Date().getTime());
	}
               
	 var nowTime = parseInt(new Date().getTime());
	 
	 if (this.lastNowTime == null) {
		this.lastNowTime = this.startTime;
	 }	 
	 
	 var theDelta = nowTime - this.lastNowTime;
	 console.log(this.prefix + ' ' + msg + ': ' + String(theDelta)+ 'ms');
	
}