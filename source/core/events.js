$(window).load(function (){
    // Functionality that needs to run on page load
    Events.init.ui();
    Events.init.screenSaver();
    Events.init.meetings();
});

var Events = {
    init: {
        ui: function(){
           $('div[data-role="page"]').hide();
           $('div[data-role="page"]').css('min-height', '378px');
        },
        
        screenSaver: function(){
            setInterval('UI.screenSaver(-1, API.screenSaver())', 1000);
            $('.header .time').bind('click', function(){UI.screenSaver(1, API.screenSaver());});
            $('#splash-screen').bind('click', function(){
                UI.screenSaver(0, API.screenSaver());
                UI.loadMeetings();
            });
        },
        
        meetings: function(){
            $(".collapsible h1").unbind('click tap').bind('click tap', function(){
                if($(this).parent().hasClass('closed')) {
                    $(this).parent().removeClass('closed').addClass('open');
                    $(this).parent().siblings('div').removeClass('open').addClass('closed');
                    return false;
                }
            });
            
            $("#adjustcamera .btnDone").bind('click tap', function(){
                $('#inmeeting').removeClass('pageSpinner');
                UI.showPage("#inmeeting");
            });
            
            $("#togglecamera").bind('click tap', function(){
               API.muteCamera();
            });
        }
    }
}