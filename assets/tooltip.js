$(function(){
	
	$.tooltip = {
		
		/**
		 *	Initialization and event listeners
		 */
		init: function(){
			$this = this; // this points to $.tooltip object
			
			//create the tooltip element if it doesn't exists
			if( ! $('.tooltip').length ){
				$('<div class="tooltip"><span class="tail"></span></div>').appendTo('body');
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
			
			if( $options.window.width() > 550 ){ //for large screen devices
				var placement = $options.placement == 'left'	? { top: $options.offset.top + ( ($options.el.outerHeight() / 2) - ($tooltip.outerHeight() / 2) ), left: $options.offset.left - $tooltip.outerWidth() - distance } :
								$options.placement == 'right' 	? { top: $options.offset.top + ( ($options.el.outerHeight() / 2) - ($tooltip.outerHeight() / 2) ), left: $options.offset.left + $options.el.outerWidth() + distance } :
								$options.placement == 'bottom'	? { top: $options.offset.top + $options.el.outerHeight() + distance, left: $options.offset.left + ( ($options.el.outerWidth() / 2) - ($tooltip.outerWidth() / 2) ) } :
																/* default to top position */
																{ top: $options.offset.top - $tooltip.outerHeight() - distance, left: $options.offset.left + ( ($options.el.outerWidth() / 2) - ($tooltip.outerWidth() / 2) ) };
				
				if( (placement.left + $tooltip.outerWidth(true)) > $options.window.width() ){
					placement.left = $options.window.width() - $tooltip.outerWidth(true) - 20; //20px for padding
					
					//reposition the arrow
					$tooltip.find('.tail').css({
						left: ($options.offset.left + ($options.el.width()/2) - placement.left) + 'px'
					});
				} else if( placement.left <= 0 ){
					placement.left = 20; //20px for padding
					
					//reposition the arrow
					$tooltip.find('.tail').css({
						left: ($options.offset.left + ($options.el.width()/2) - placement.left) + 'px'
					});
				}
				
				return placement;
			} else { //for small screen devices, only top and bottom positions are applicable
				var placement = $options.placement == 'top' ? { top: $options.offset.top - $tooltip.outerHeight() - distance, left: $options.window.width()/2 - $tooltip.outerWidth()/2 } :
															  /* default to bottom position */
															  { top: $options.offset.top + $options.el.outerHeight() + distance, left: $options.window.width()/2 - $tooltip.outerWidth()/2 };

				//reposition the arrow
				$tooltip.find('.tail').css({
					left: ($options.offset.left + ($options.el.width()/2) - placement.left) + 'px'
				});
				
				return placement;
			}
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
						$tooltip.prepend( $options.content );
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
			
			$tooltip.hide().empty().html('<span class="tail"></span>').removeClass().addClass('tooltip').hide();
		}
		
	};
	
	$.tooltip.init(); //initialize the tooltip
	
});
