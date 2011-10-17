$(window).load(function (){
    // Functionality that needs to run on page load
    Events.init.ui();
    Events.init.screenSaver();
    Events.init.meetings();
    Events.init.settings();
    Global.current_keyboard          = KeyboardInput.init();
    Global.current_invite_keyboard   = InviteKeyboardInput.init();
    Global.dialpad                   = DialpadInput.init();
    Global.current_network_keyboard  = NetworkKeyboardInput.init({  callback: API.wirelessSetup });
    Global.current_password_keyboard = PasswordKeyboardInput.init({ callback: API.wirelessSetup });
    Global.current_passcode_keyboard = PasscodeKeyboardInput.init({ callback: API.passcodeSetup });


    // Now lets init setup
    Events.init.setup();
});

var Events = {
    init: {
        setup: function(){
            API.ifSetup();
        },

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

        settings: function(){
            $('#settings-container .help-link').bind('click tap', function(){
                UI.screenSaver(0, API.screenSaver());
                UI.showPage('#help-screen');
                return false;
            });

            $('#settings-container .back-link').bind('click tap', function(){
                UI.showPreviousPage();
                return false;
            });

            $('#settings-container .connect-wifi-link').bind('click tap', function(){
                Mock.wirelessSetup();
                return false;
            });

            $('#connection-select-screen .connect-eth-link').bind('click tap', function(){
                UI.wiredSetup();
                return false;
            });

            $('#settings-container .connect-network-link').bind('click tap', function(){
                UI.showPage('#connection-select-screen');
                return false;
            });

            $('#settings-container .wireless-manual-link').bind('click tap', function(){
                UI.showPage('#wireless-manual-screen');
                Global.current_network_keyboard.getkeyboard().reveal();
                Global.current_network_keyboard.getkeyboard().options.visible();
                return false;
            });

            $('#settings-container .device-association-yes-link').bind('click tap', function(){
                API.displaySetup();
                return false;
            });

            $('#settings-container .device-association-no-link').bind('click tap', function(){
                UI.continueScreen({ title:  "Check gtalk passcode",
                                    text:   "Please check that the password you've entered corresponds to the correct room.",
                                    action: API.passcode,
                                    label:  "Re-enter passcode"
                                  })
                return false;
            });

            $('#settings-container .display-test-no-link').bind('click tap', function(){
                UI.continueScreen({ title:  "Check display",
                                    text:   "Please check that your [HDMI/VGA] cable is connected properly and that your display is turned on and set to the correct input.",
                                    action: function(){API.displaySetup({update_action: 'select', display: Global.current_display})},
                                    label:  "Try again"
                                  })
                return false;
            });

            $('#settings-container .display-test-yes-link').bind('click tap', function(){
                    UI.showPage('#camera-test-screen');
                return false;
            });


            $('#settings-container .camera-test-yes-link').bind('click tap', function(){
                UI.continueScreen({title: "Setup Complete",
                                   text:  "[Grizzly] Setup is complete! Enjoy your meeting!",
                                   action: function(){UI.screenSaver(1, API.screenSaver());return false;}
                })
                return false;
            });


            $('#settings-container .camera-test-no-link').bind('click tap', function(){
                UI.continueScreen({ title:  "Check Camera",
                                    text:   "Please check that your camera is connected properly.",
                                    action: function(){UI.showPage('#camera-test-screen');},
                                    label:  "Try again"
                                  })
                return false;
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
