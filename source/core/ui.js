var UI = {
    screenSaver: function(display, options){
        var el = $('#splash-screen');
        var date = options['date'];
        
        $('.header .time').html(date.format('ddd - mmm dd - h:MM').replace(/-/g, "<span>&nbsp;</span>")).css('cursor','pointer');
        
        // Format date and time for splash screen
        $('.splash-time').html(date.format('h:MM'));
        $('.splash-date').html(date.format('ddd - mmm dd').replace(/-/g, "<span>&nbsp;</span>"))
        
        if(display!= -1){display ? el.show() : el.hide();}
    },
    
    showPage: function(page_id, animate){
        var active_page = $(page_id);
        active_page.show();
        if(Global.current_page != '' && animate == 1){
            var current_page = $(Global.current_page);
            
            current_page.addClass('switchOut_Animation');
            current_page.bind('webkitAnimationEnd', this.postAnimateOut);
            
            active_page.addClass('switchIn_Animation');
            active_page.bind('webkitAnimationEnd', this.postAnimateIn);
        }else if(Global.current_page != '' && animate != 1){
            var current_page = $(Global.current_page);
            current_page.hide();
        }else{
            // If there is no current page and we dont need animation
            
        }
            
        Global.previous_page = Global.current_page;
        Global.current_page  = page_id;
    },

    showPreviousPage: function(){
        this.showPage(Global.previous_page);
    },
    
    postAnimateIn: function(event){
      var el = $(this);
      el.unbind('webkitAnimationEnd', this.postAnimateIn);
      el.removeClass('switchIn_Animation');
      el.show();
    },
    
    postAnimateOut: function(){
      var el = $(this);
      
      el.unbind('webkitAnimationEnd', this.postAnimateOut);
      el.removeClass('switchOut_Animation');
      el.hide();
    },
    
    loadMeetings: function(options){
        var current_time = new Date().getTime();
        var lowest_diff = 0;
        $('#home .tiles').html("");
        options['meetings'].forEach(function(meeting, i){
            var current_diff = Math.abs(current_time - meeting.start_at.getTime());
            //console.log("N:"+meeting.name+" D:"+current_diff);
            if( current_diff < lowest_diff || lowest_diff == 0){Global.upcoming_meeting = meeting; lowest_diff = current_diff;}
            $('#home .tiles').append("<a id='meeting-"+ meeting.id +"' href='javascript:void(0);'><h3>"+ meeting.start_at.format('h:MM') + ' - ' + meeting.end_at.format('h:MM') +"</h3><p>"+ meeting.name +"</p></a>");
            
            $('#meeting-'+ meeting.id).dblclick(function(){
                // Temp hack to prevent meeting connect
                // Need more stable method
                if(Global.if_scrolling == 1){Global.if_scrolling = 0;}else{
                    API.connectMeeting(meeting);
                }
            });
            
        });
        
        
        UI.loadRecentMeetings();
        
        this.showPage('#home-container');
        SwipeMaster.init('.tiles');
        $("#meeting-"+ Global.upcoming_meeting.id).focus();
    },

    loadRecentMeetings: function(){
        $('#quickconnect .tiles').html("");
        API.recentMeetings().forEach(function(meeting, i){
           $('#quickconnect .tiles').append("<a id='meeting-"+ meeting.id +"' href='javascript:void(0);'><p>"+ meeting.name +"</p></a>"); 
           $('#quickconnect .tiles #meeting-'+ meeting.id).dblclick(function(event){
                // Temp hack to prevent meeting connect
                // Need more stable method
                if(Global.if_scrolling == 1){Global.if_scrolling = 0;}else{
                    API.connectMeeting(meeting);
                }
           });
        });
    },
    
    processingPopup: function(display, options){
            if(display){Global.if_processing_canceled = 0;}
            if(!display){$('#toast').hide();return;}
            var message = options['message'];
            var title = options['title'];
            var toast_cancel = false;
            var cancelCallback = options['cancelCallback'];
            var timeout = options['timeout'] || 0;

            if(title){$('#toast p').html( title );}
            $('#toast h2').html( message );
            $('#cancel-toast').unbind('click tap').bind('click tap', function(){
                $('#toast').hide('fast');
                toast_cancel = true;
                Global.if_processing_canceled = 1;
                if(cancelCallback){
                    cancelCallback();
                }
                return false;
            })

            $('#toast').show();

            if(timeout > 0){
                $('#cancel-toast').hide();
                setTimeout(function(){
                    $('#cancel-toast').show();
                    $('#toast').hide();
                }, timeout);
            }
    },
    
    connectMeeting: function(meeting){
        $('#inmeeting .tiles').html("");
        meeting.members.forEach(function(member, i){ 
            API.joinMember(member);
        });
        
        $('#inmeeting h1').text(meeting['name']);
        
        this.showPage("#inmeeting", 1);
    },
    
    updateMeetingTimeElapsed: function(time){
            $('.small-time').html('' + time['m'] + ':' + time['s']);
    },
    
    joinMember: function(member){
        $('#inmeeting .tiles').append(
            "<a id='member-"+ member['jid'] + 
            "' href='javascript:void(0);' data-type='" + member['name'] + 
            "' class='" + member['type'] + (member['type'] == 'room' ? " current " : "") +
            "'><div style='background-image:url(" + member['photo'] + 
            ")'><span class='"+
            (member['type'] == 'room' ? "settings" : "control") +" '></span><img src='images/main/tiles/highlight.png'></div><h3>"+ member['name'] +"</h3></a>");

        $('#member-'+ Util.escapeId(member['jid'])).bind('click tap', function(event){
           API.pinMember(member);
        });

        $('#member-'+ Util.escapeId(member['jid']) +' .control').bind('click tap', function(event){
            API.muteMember(member);
            event.preventDefault();
            return false;
        });

        $('#member-'+ Util.escapeId(member['jid']) +' .settings').bind('click tap', function(event){
            API.cameraSettings(member);
            event.preventDefault();
            return false;
        });
    },
    
    exitMember: function(member){
        $('#member-'+Util.escapeId(member['jid'])).remove();
    },
    
    muteMember: function(member, state){  
        var memberMuteControlEl = $("#member-"+ Util.escapeId(member['jid']) +" .control");
        
        if(state){
            memberMuteControlEl.addClass('selected');
        }else{
            memberMuteControlEl.removeClass('selected');
        }
    },
    
    pinMember: function(member, state){
        var memberEl = $("#member-"+ Util.escapeId(member['jid']));
        
        if(state){
            memberEl.addClass('selected');
        }else{
            memberEl.removeClass('selected');
        }
    },
    
    cameraSettings: function(meeting){
        this.showPage('#adjustcamera');
    },
    
    muteCamera: function(state){
        var contentEl = $("#adjustcamera .ui-content");
        state ? contentEl.addClass("hidden") : contentEl.removeClass("hidden");
    },

    dialerStatus: function(options){
        var status = options['update_action'];
        var phone  = options['phone'];
        var status_text = "";

        if(status == 'creating'  ){status_text = 'Creating Meeting...' ;}
        if(status == 'calling'   ){status_text = 'Calling '+phone+'...';}
        if(status == 'connecting'){status_text = 'Connecting...'       ;}
        if(status == 'connected' ){status_text = 'Connected'           ;}

        if(status == 'connected' ){
            jQuery(".dialpad .ui-keyboard-connect").addClass('ui-keyboard-connected');
            jQuery(".dialpad .ui-keyboard-connect").unbind('mouseup');
            jQuery(".dialpad .ui-keyboard-connect").bind('mouseup', function(){
                Global.dialpad.getkeyboard().destroy();
                Global.dialpad = DialpadInput.init();     
                jQuery(".ui-keyboard").removeClass("dialpad");                       
            });
        }


        jQuery(".ui-keyboard-preview").val(status_text);
    },

    emailInvite: function(options){
        var status = options['update_action'];
        var email  = options['email'];
        var name   = options['name'];
        var status_text = "";
        
        if(status == 'joined'){
            // Dont do anything for now. User will be joined into the meeting via a mock call
        }

        if(status == 'invited'){
            UI.processingPopup(true, {title: 'Invited<br/>'+name, message: email, timeout: 2000})
        }
        
    },

    /* Setup methods begin */

    startSetup: function(options){
        UI.screenSaver(0, API.screenSaver()); // Hide screensaver
        UI.languageSelect();
    },

    languageSelect: function(){
        Data.languages.forEach(function(l, i){
            jQuery('#language-select-screen .bottom-bar').append('<li id="language-'+ i +'"><a href="javascript:void(0);">'+ l +'<img src="images/settings/arrow-continue.gif" class="floatRight" /></a></li>');
            jQuery('#language-'+i).dblclick(function(){
                API.selectLanguage({language: l});
                UI.welcomeScreen();
            });        
        });

        VerticalSwipeMaster.init('#language-select-screen .bottom-bar');
        UI.showPage('#language-select-screen');
    },

    timezoneSelect: function(){
        Data.timezones.forEach(function(l, i){
            jQuery('#timezone-select-screen .bottom-bar').append('<li id="timezone-'+ i +'"><a href="javascript:void(0);">'+ l +'<img src="images/settings/arrow-continue.gif" class="floatRight" /></a></li>');
            jQuery('#timezone-'+i).dblclick(function(){
                API.selectTimezone({timezone: l});
                API.checkUpdates({update_action: "checking"});
                return false;
                
            });        
        });

        VerticalSwipeMaster.init('#timezone-select-screen .bottom-bar');
        UI.showPage('#timezone-select-screen');
    },

    connectionSelect: function(){
        UI.showPage('#connection-select-screen');
    },

    loading: function(options){
        if(options['text']) jQuery("#loading-screen .message").html(options['text']);
        if(Global.current_page != '#loading-screen'){UI.showPage('#loading-screen');}
    },

    wiredSetup: function(){
        this.continueScreen({title: 'Wired Setup', text: 'Make sure your ethernet cable is properly connected, then press "continue".',
                             action: function(){
                                UI.loading({text: "Connecting..."});
                                Mock.wiredSetup();
                             }});
    },

    wirelessSetup: function(networks){
        jQuery('#wireless-select-screen .bottom-bar').text('');
        networks.forEach(function(n, i){
            jQuery('#wireless-select-screen .bottom-bar').append('<li id="network-'+ i +'"><a href="javascript:void(0);">'+ n.label +'<img src="images/settings/arrow-continue.gif" class="floatRight" /></a></li>');
            jQuery('#network-'+i).dblclick(function(){
                if(n['callback']){
                    n['callback']();
                }else{
                    API.selectNetwork({network: n});
                }
                //UI.welcomeScreen();
            });        
        });

        VerticalSwipeMaster.init('#wireless-select-screen .bottom-bar');
        this.showPage('#wireless-select-screen');
    },

    wirelessPassword: function(){
        this.showPage('#wireless-password-screen');
    },

    displaySetup: function(displays){
        jQuery('#display-settings-screen .bottom-bar2').text('');
        displays.forEach(function(n, i){
            jQuery('#display-settings-screen .bottom-bar2').append('<li id="display-'+ i +'"><a href="javascript:void(0);"><img src="'+ n['image'] +'" alt="" class="img"><span class="text">'+ n.label +'</span><img src="images/settings/arrow-continue.gif" class="floatRight"></a></li>');
            jQuery('#display-'+i).dblclick(function(){
                Global.current_display = n;
                API.displaySetup({update_action: 'select', display: n});
            });        
        });

        VerticalSwipeMaster.init('#display-settings-screen .bottom-bar2');
        this.showPage('#display-settings-screen');
        
    },

    welcomeScreen: function(){
        this.continueScreen({title: 'WELCOME', text: "Welcome to [Logitech Grizzly]. Let's get you set up and connected.", 
                             action: UI.connectionSelect});
    },

    continueScreen: function(options){
        jQuery("#continue-screen .header-bg").text(options['title']);
        jQuery("#continue-screen .text").html(options['text']);
        if(options['label']){        
            jQuery("#continue-screen .btnLabel").html(options['label']);
        }else{
            jQuery("#continue-screen .btnLabel").html('Continue');
        }


        jQuery("#continue-screen .continue-link").bind('click tap', function(){
            if(options['action']){
                jQuery("#continue-screen .continue-link").unbind('click tap');
                options['action'](); // Must run callback after unbind else continue in continue screen fails
            }
            return false;
        });

        if(Global.current_page != '#continue-screen'){UI.showPage('#continue-screen')};
    },

    /* Setup methods end */

    endMeeting: function(){},
    switchMeeting: function(){},
    newMeeting: function(){},
    newPhoneCall: function(){},
    
    
    memberCameraSettings: function(){},
    muteMemberCamera: function(){}

}
