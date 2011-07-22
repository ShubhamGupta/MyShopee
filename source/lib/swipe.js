var down_x = null;
var up_x = null;
var mouse_down = false;
var speed = 300;

var SwipeMaster = {
    init: function(cssclass){
	$(cssclass).each(function(i, swipeable){
            swipeable = $(swipeable);
            SwipeMaster.register_swipe(swipeable, function(){SwipeMaster.swipe(swipeable)});
        });
    },
    
    cssTranslate: function(y) {
            return 'translate' + '3d(' + y + 'px,0,0)';
    },
    
    setPosition: function(swipeable, y) {
            scrollY = y;
            swipeable.css('-webkit-transform', cssTranslate(scrollY));
    },


    
    swipe: function(swipeable){
        return true;
        if ((down_x - up_x) > 50){
            this.swipe_left(swipeable);
	}
	else if ((up_x - down_x) > 50){
            this.swipe_right(swipeable);
	}   
    },
    
    swipe_left: function(swipeable){
        this.offset = this.offset - 20;
       this.setPosition(swipeable, this.offset);
    },
    
    swipe_right: function(swipeable){
        this.offset = this.offset + 20;
        this.setPosition(swipeable, this.offset);
    },
    
    register_swipe: function(div, callback){
	div.mousedown(function(e){
		e.preventDefault();
    		down_x = e.pageX;
		up_x = e.pageX;
		mouse_down = true;
		$("body").unbind();
		$("body").mousemove(function(e){
			if (mouse_down)
			{
                                if(Global.if_scrolling != 1){Global.if_scrolling = 1;}
				var diff = e.pageX - up_x;
				var left = parseInt(div.css('left').replace('px',''));
				div.css('left',left+diff);
				up_x = e.pageX;
			}
		});
		$("body").mouseup(function(e){
			up_x = e.pageX;
			callback();
			$(this).unbind();
                        //div.css('left', '0px'); // Uncomment to revert
			mouse_down = false;
                        Global.if_scrolling = 0;
		});
	});
	div.bind('touchstart', function(e){
    		down_x = e.originalEvent.touches[0].pageX;
		up_x = down_x;
		$("body").unbind();
		$("body").bind('touchmove', function(e){
                	e.preventDefault();
                        if(Global.if_scrolling != 1){Global.if_scrolling = 1;}
			var diff = e.originalEvent.touches[0].pageX - up_x;
                        var left = parseInt(div.css('left').replace('px',''));
                        div.css('left',left+diff);
	                up_x = e.originalEvent.touches[0].pageX;
        	});
		$("body").bind('touchend', function(e){
                	callback();
                        // div.css('left', '0px'); // Uncomment to revert
			$(this).unbind();
                        Global.if_scrolling = 0;
        	});
  	});
    }
}