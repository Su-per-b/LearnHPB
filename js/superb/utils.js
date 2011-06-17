function delegate ( that, thatMethod )	
{
	return function() { return thatMethod.call(that); }
}