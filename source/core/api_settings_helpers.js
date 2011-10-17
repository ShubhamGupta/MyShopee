var APISettingsHelpers = {

    // Actual API methods are kept here on purpose to separate functionality
    ifSetup: function(){
        Mock.ifSetup();
    },


    passcode: function(){
        UI.continueScreen({title: "Gtalk passcode", text: "Please locate the passcode sent to you by Google for this device. You'll need to enter this code on the next screen.<br/><br/>If you still need to setup you'r Google account for this device go to http://www.google.com/?????",
                           action: API.passcodeInput        
        });
    },

    passcodeInput: function(){
        UI.showPage('#passcode-screen');
        Global.current_passcode_keyboard.getkeyboard().reveal();
        Global.current_passcode_keyboard.getkeyboard().options.visible();        
    },

    passcodeSetup: function(options){
        if(options['update_action'] == 'passcode'){
            Mock.checkPasscode(options);
        }

        if(options['update_action'] == 'checking'){
            UI.loading({text: "Checking Passcode..."});
        }

        if(options['update_action'] == 'success'){
            UI.showPage('#passcode-accepted-screen');
        }

        if(options['update_action'] == 'failure'){
            UI.continueScreen({ title: "Unrecognized passcode", text: "The passcode you have entered appears to be incorrect. Please check the code and try again.",
                                action: API.passcode
            });
        }



    },

    displaySetup: function(options){
        if(!options){
            Mock.displaySetup();
            return false;
        }

        if(options['update_action'] == 'render'){
            UI.displaySetup(options['displays']);
            return false;
        }

        if(options['update_action'] == 'select'){
            Mock.displaySetup({update_action: 'select', display: options['display']});
            return false;
        }

        if(options['update_action'] == 'selected'){
            UI.showPage('#display-test-screen');
            return false;
        }


    },


    checkUpdates: function(options){
        if(options['update_action'] == 'checking'){
            UI.loading({text: "Checking for new software..."});
            Mock.checkUpdates();
        }

        if(options['update_action'] == 'downloading'){
            UI.loading({text: "Downloading new software...<br/>This may take a while, it's a good time to go take a walk."});
        }

        if(options['update_action'] == 'installing'){
            UI.loading({text: "Installing new software..."});
        }

        if(options['update_action'] == 'rebooting'){
            UI.loading({text: "Rebooting..."});
        }

        if(options['update_action'] == 'done'){
            UI.continueScreen({title: "Software installed", text: "You have successfully installed the latest version of Grizzly software.",
                               action: API.passcode
            });
        }


    },

    selectLanguage: function(options){
        Mock.selectLanguage(options);
    },

    selectTimezone: function(timezone){
        Global.settings.timezone = timezone;
    },

    wirelessSetup: function(options){
        if(options['update_action'] == 'show' && options['networks']){
            var networks = options['networks'].slice();

            networks.push({label: 'I dont see my network', callback: function(){
                UI.showPage('#wireless-troubleshoot-screen');
                return false;
            }});

            UI.wirelessSetup(networks);
        }

        if(options['update_action'] == 'select' && options['network']){
            Global.settings.network = options['network'];
            UI.wirelessPassword();
            Global.current_password_keyboard.getkeyboard().reveal();
            Global.current_password_keyboard.getkeyboard().options.visible();
        }

        if(options['update_action'] == 'password'){
            UI.continueScreen({title: 'Connection successful', text: 'Grizzly is now connected to the internet through '+Global.settings.network.label,
                               action: function(){UI.timezoneSelect();return false;}});
        }
    },

    wiredSetup: function(options){
        if(options['update_action'] == 'show' && options['status'] == 0){
            UI.showPage('#wired-troubleshoot-screen');
        }
    },

    selectNetwork: function(options){
        UI.loading({text: "Connecting..."});
        Mock.selectNetwork(options);
    }
}
