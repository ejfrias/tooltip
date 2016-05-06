$(function(){
	
	$.tooltip = {
		
		/**
		 *	Initialization and event listeners
		 */
		init: function(){
			$this = this; // this points to $.tooltip object
			
			//create the tooltip element if it doesn't exists
			if( ! $('.tooltip').length ){
				$('<div class="tooltip" />').appendTo('body');
			}
			
			//listeners for element with tooltip
			$(document).off('mouseenter mouseleave').on({
				mouseenter: $this.show,
				mouseleave: $this.hide
			}, '[data-tooltip]'); //selector for tooltip
		},
		
		/**
		 *	Get all options declared on the element
		 */
		getOptions: function( $el ){
			var $options = {
				el			: $el,
				window		: $(window),
				offset		: $el.offset(),
				klass		: $el.data('class') || '',
				source		: $el.data('tooltip') || '',
				content		: $el.data('tooltip') || '',
				placement	: $el.data('placement') || 'top',
				distance	: $el.data('distance') || 8,
			};
			
			return $options;
		},
		
		/**
		 *	Calculate the 
		 */
		getPosition: function( $options, $tooltip ){
			var distance = $options.distance;
			
			return	$options.placement == 'left'	? { top: $options.offset.top + ( ($options.el.outerHeight() / 2) - ($tooltip.outerHeight() / 2) ), left: $options.offset.left - $tooltip.outerWidth() - distance } :
					$options.placement == 'right'	? { top: $options.offset.top + ( ($options.el.outerHeight() / 2) - ($tooltip.outerHeight() / 2) ), left: $options.offset.left + $options.el.outerWidth() + distance } :
					$options.placement == 'bottom'	? { top: $options.offset.top + $options.el.outerHeight() + distance, left: $options.offset.left + ( ($options.el.outerWidth() / 2) - ($tooltip.outerWidth() / 2) ) } :
													  /* default to top position */
													  { top: $options.offset.top - $tooltip.outerHeight() - distance, left: $options.offset.left + ( ($options.el.outerWidth() / 2) - ($tooltip.outerWidth() / 2) ) };
		},
		
		/**
		 *	Shows tooptip
		 */
		show: function(){
			var $el = $(this);
			var $options = $this.getOptions( $el );
			
			if( $options.source ){
				if( /^#|^\./i.test( $options.source ) ){
					//the source is a class name or id, check if the element with that class name or id exists then get the contents of it
					if( $( $options.source ).length ){
						$options.content = $( $options.source ).html();
					}
				}
				
				//show the tooltip
				if( $options.content ){
					//set the tooltip position, for now just show it on the center top of the element
					var $tooltip = $('.tooltip');
						$tooltip.html( $options.content );
					var $viewportPos = $this.getPosition( $options, $tooltip );
					
					if( $tooltip.text() != '' ){
						$tooltip.css( $viewportPos ).addClass( $options.klass + ' ' + $options.placement ).show();
					}
				}
			}
		},
		
		/**
		 *	Hides tooltip
		 */
		hide: function(){
			var $tooltip = $('.tooltip');
			
			$tooltip.hide().empty().removeClass().addClass('tooltip').hide();
		}
		
	};
	
	$.tooltip.init(); //initialize the tooltip
	
});
