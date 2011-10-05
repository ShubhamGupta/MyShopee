var down_y = null;
var up_y = null;
var mouse_down = false;
var speed = 300;
var scroll_diff = 0;
var start_point = 0;

var VerticalSwipeMaster = {
    init: function(cssclass){
	$(cssclass).each(function(i, swipeable){
            swipeable = $(swipeable);
            VerticalSwipeMaster.register_swipe(swipeable, function(){VerticalSwipeMaster.swipe(swipeable)});
        });
    },
    
    cssTranslate: function(y) { return 'translate3d' + '(0px, '+ y +'px, 0px)'; },
    
    setPosition: function(swipeable, y) { swipeable.css('-webkit-transform', this.cssTranslate(y)); },
    
    swipe: function(swipeable){
        scroll_diff = (parseInt(up_y) - parseInt(down_y));
        scroll_diff = scroll_diff + start_point;
        this.setPosition(swipeable, scroll_diff);     
    },
    
    register_swipe: function(div, callback){
	div.mousedown(function(e){
		e.preventDefault();
    		down_y = e.pageY;
		up_y = e.pageY;
		mouse_down = true;
		$("body").unbind();
		$("body").mousemove(function(e){
			if (mouse_down)
			{
                                if(Global.if_scrolling != 1){Global.if_scrolling = 1;}
				//var diff = e.pageY - up_y;
				//var left = parseInt(div.css('left').replace('px',''));
				//div.css('left',left+diff);
                                callback();
				up_y = e.pageY;
			}
		});
		$("body").mouseup(function(e){
			up_y = e.pageY;
                        start_point = scroll_diff;
			$(this).unbind();
			mouse_down = false;
                        Global.if_scrolling = 0;
		});
	});
    }
}
