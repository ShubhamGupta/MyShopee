var down_x = null;
var up_x = null;
var mouse_down = false;
var speed = 300;
var scroll_diff = 0;
var start_point = 0;

var SwipeMaster = {
    init: function(cssclass){
	$(cssclass).each(function(i, swipeable){
            swipeable = $(swipeable);
            SwipeMaster.register_swipe(swipeable, function(){SwipeMaster.swipe(swipeable)});
        });
    },
    
    cssTranslate: function(y) { return 'translate3d' + '('+y+'px, 0px, 0px)'; },
    
    setPosition: function(swipeable, y) { swipeable.css('-webkit-transform', this.cssTranslate(y)); },
    
    swipe: function(swipeable){
        scroll_diff = (parseInt(up_x) - parseInt(down_x));
        scroll_diff = scroll_diff + start_point;
        this.setPosition(swipeable, scroll_diff);     
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
				//var diff = e.pageX - up_x;
				//var left = parseInt(div.css('left').replace('px',''));
				//div.css('left',left+diff);
                                callback();
				up_x = e.pageX;
			}
		});
		$("body").mouseup(function(e){
			up_x = e.pageX;
                        start_point = scroll_diff;
			$(this).unbind();
			mouse_down = false;
                        Global.if_scrolling = 0;
		});
	});
    }
}