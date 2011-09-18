
/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace
	 */
	lgb.view = lgb.view || {};
	lgb.view.component = lgb.view.component || {};


	lgb.view.component.RadioButtonGroup = function(dataModel){
		lgb.view.ViewBase.call(this);
		
		dataModel.assertType(lgb.model.component.SelectionGroup);

		this.dataModel = dataModel;

	};
	
	lgb.view.component.RadioButtonGroup.prototype = {
		

		getHTML : function() {
			
			var selectionItems = this.dataModel.selectionItems;
			selectionItems.assertContainsType(lgb.model.component.SelectionItem);
		
			var len = selectionItems.length;
			var htmlAry = [];
			
			for (var i=0; i<len; i++) {
				
				var oneItem = selectionItems[i];
				
				var chk ='';
				if (oneItem.isSelected) {
					chk=' checked="checked"';
				}

				var id = '{0}_{1}'.format (this.dataModel.id, i.toString());
				oneItem.id = id;
				
				var str = '<input type="radio" id="{0}" name="{1}" value="{2}"{3}>\
				<span class="typeface-js radioButtonText">{4}</span>'.format
				(id, this.dataModel.id, oneItem.value.toString(), chk, oneItem.label );
				
				
				htmlAry.push(str);
				
			}
			

			var title = '<h5>{0}</h5>'.format(this.dataModel.title);
			var radioButtons = htmlAry.join('<br />');
			var htmlStr ='<div class="radioButtonGroup">' + title + radioButtons + '</div>';

			return htmlStr;
		},
		
		bindEvents: function() {
			
			var selectionItems = this.dataModel.selectionItems;
			var len = selectionItems.length;
			var delegateClick = this.d(this.onClick);
			
			for (var i=0; i<len; i++) {
				var oneSectionItem = selectionItems[i];
				var selector = '#{0}'.format(oneSectionItem.id);
				
				$(selector).click( delegateClick );
			}
			
		},
		onClick: function(event){
			
			this.dispatch(this.dataModel.eventName, event.target.value);
		}
		
	};

	lgb.view.component.RadioButtonGroup.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











