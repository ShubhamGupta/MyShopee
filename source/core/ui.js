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
            
        
        Global.current_page = page_id;
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
        API.getMeetings({type: 'available'}).forEach(function(meeting, i){
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
            
            if(title){$('#toast p').text( title );}
            $('#toast h2').text( message );
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
    
    endMeeting: function(){},
    switchMeeting: function(){},
    newMeeting: function(){},
    newPhoneCall: function(){},
    
    
    memberCameraSettings: function(){},
    muteMemberCamera: function(){}

}
