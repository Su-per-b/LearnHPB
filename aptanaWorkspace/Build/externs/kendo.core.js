/** @typedef {Object} */
var kendo;

/**
 * @param {Object} obj
 * @return {jQuery}
 */
jQuery.prototype.kendoGrid = function(obj) {};

/**
 * @param {Object} obj
 * @return {jQuery}
 */
jQuery.prototype.kendoDropDownList = function(obj) {};

/**
 * Selects drop-down list item and sets the value and the text of the dropdownlist.
 * @param {Object | Number | Function} obj
 * @example
 * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
 *
 * // selects by jQuery object
 * dropdownlist.select(dropdownlist.ul.children().eq(0));
 *
 * // selects by index
 * dropdownlist.select(1);
 *
 * // selects item if its text is equal to "test" using predicate function
 * dropdownlist.select(function(dataItem) {
 *     return dataItem.text === "test";
 * });
 */
jQuery.prototype.kendoDropDownList.prototype.select = function(obj) {};

    	
        	

        	
/**
 * @param {Object} obj
 * @return {jQuery}
 */
jQuery.prototype.kendoTabStrip = function(obj) {};

/**@type {Array} */
jQuery.prototype.kendoTabStrip.prototype.tabGroup;

/**@type {Array} */
jQuery.prototype.kendoTabStrip.prototype.tabGroup.children;


/**
 * @param {Object} obj
 * @return {jQuery}
 */
jQuery.prototype.kendoWindow = function(obj) {};

/**
 * @param {Object} obj
 * @return {jQuery}
 */
jQuery.prototype.kendoSlider = function(obj) {};




