$.fn.floatingShare = function(){

	var 
		  $this = $(this)
		, $thisHeight = 0
		, $parent = $this.parent()
		, $articleBody = $('.articleBody')
		, $articleMedia = $('.articleMedia')
		, navHeight = $('#nav').height()
	;

	// Update waypoints offset when window scrolling event trigger
	// Cannot get a correct thisHeight initally. Therefore update in scrolling event
	$(window).scroll(function(event) {
		$.waypoints('refresh');
		$thisHeight = $this.outerHeight(true);
	});

	// If a hero image/video/gallery etc. exists, then start the floating share buttons after it
	if($articleMedia.exists() && !$articleMedia.is(':empty') && !$articleMedia.hasClass('altImage')){

		$articleMedia.waypoint({
			handler: function(){
				$this
					.toggleClass('floatingShare floatingShareTop')
					.css('top', $articleMedia.outerHeight(true) - ($parent.offset().top - $articleMedia.offset().top))
				;

				if(!$this.hasClass('floatingShareTop'))
					$this.css('top', '');
			},
			offset: function() {
			    return navHeight;
			}
		});

		$articleMedia.next().waypoint({
			handler: function(){
				$this
					.toggleClass('floatingShareTop')
					.css('top', '')
				;

				if($this.hasClass('floatingShareTop'))
					$this.css('top', $articleMedia.outerHeight(true) - ($parent.offset().top - $articleMedia.offset().top));
			},
			offset: function() {
			    return navHeight;
			}
		});
	// Else start the floating share buttons when scrolling past the share buttons
	} else {
		$articleBody.waypoint({
			handler: function(){
				$this.toggleClass('floatingShare');
			},
			offset: function() {
			    return navHeight;
			}
		});
	}

	// When reaching the bottom of the article, stick the floating share icons above the email and print buttons
	$('.articleEmailLink').waypoint({
		handler: function(){
			$this.toggleClass('floatingShareBtm');

			if($this.hasClass('floatingShareBtm')) {
			    $this.css('top', Math.abs($parent.offset().top - $(this).offset().top) - $thisHeight);
			} else {
				$this.css('top', '');
			}
		},
		offset: function() {
		    return navHeight + $thisHeight;
		}
	});

};

$('.topShareBtns .shareLinks').floatingShare();
