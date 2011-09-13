$(window).load(function (){
    // Functionality that needs to run on page load
    Events.init.ui();
    Events.init.screenSaver();
    Events.init.meetings();
    Global.current_keyboard         = KeyboardInput.init();
    Global.current_invite_keyboard  = InviteKeyboardInput.init();
    Global.dialpad                  = DialpadInput.init();
});

var Events = {
    init: {
        ui: function(){
            $('div[data-role="page"]').addClass("hidden-pages");
        },
        
        screenSaver: function(){
            setInterval('UI.screenSaver(-1, API.screenSaver())', 1000);
            $('.header .time').bind('click', function(){UI.screenSaver(1, API.screenSaver());});
            $('#splash-screen').bind('click', function(){
                UI.screenSaver(0, API.screenSaver());
                API.loadMeetings({type: 'available'});
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
            
            $("#keyboard-input").val(API.randomNameForMeeting())
            $("#home-newmeeting .touch-container").bind('click tap', API.createMeeting);

            $("#quickconnect h1").bind("click", function(){
                UI.loadRecentMeetings();
            });

            $("#invite").bind("click tap", function(e){
                $("#invite-options").show();
                e.preventDefault();
                return false;
            });

           $("#invite-dialer").bind("click tap", function(e){
                $("#invite-options").hide();
                Global.dialpad.getkeyboard().reveal();
                e.preventDefault();
                return false;
            });

           $("#invite-video").bind("click tap", function(e){
                $("#invite-options").hide();
                Global.current_invite_keyboard.getkeyboard().reveal();
                e.preventDefault();
                return false;
            });

        }
    }
}
