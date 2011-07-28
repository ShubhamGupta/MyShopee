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
        API.getMeetings({type: 'available'}).forEach(function(meeting, i){
            $('#home .tiles').append("<a id='meeting-"+ meeting.id +"' href='javascript:void(0);'><h3>"+ meeting.start_at + ' - ' + meeting.end_at +"</h3><p>"+ meeting.name +"</p></a>");
            /*
            $('#meeting-'+ meeting.id).bind('click tap', function(){
                // Temp hack to prevent meeting connect
                // Need more stable method
                
                //API.connectMeeting(meeting);
                
            });
            */
        });
        
        API.getMeetings({type: 'recent'}).forEach(function(meeting, i){
           $('#quickconnect .tiles').append("<a id='meeting-"+ meeting.id +"' href='javascript:void(0);'><p>"+ meeting.name +"</p></a>"); 
           $('#meeting-'+ meeting.id).dblclick(function(event){
                // Temp hack to prevent meeting connect
                // Need more stable method
                if(Global.if_scrolling == 1){Global.if_scrolling = 0;}else{
                    API.connectMeeting(meeting);
                }
           });
        });
        
        this.showPage('#home-container');
        SwipeMaster.init('.tiles');
    },
    
    processingPopup: function(display, options){
            if(!display){$('#toast').hide();return;}
            var message = options['message'];
            var toast_cancel = false;
            
            $('#toast h2').text( message );
            $('#cancel-toast').unbind('click tap').bind('click tap', function(){
                $('#toast').hide('fast');
                toast_cancel = true;
                return false;
            })

            $('#toast').show();
    },
    
    connectMeeting: function(meeting){
        meeting.members.forEach(function(member, i){ 
            $('#inmeeting .tiles').append("<a id='member-"+ member['id'] + "' href='javascript:void(0);' data-type='" + member['name'] + "' class='" + member['type'] + "'><div style='background-image:url(" + member['photo'] + ")'><span class='control'></span><img src='images/main/tiles/highlight.png'></div><h3>"+ member['name'] +"</h3></a>");
            
            $('#member-'+ member['id']).bind('click tap', function(event){
               API.pinMember(member);
            });
            
            $('#member-'+ member['id']+' .control').bind('click tap', function(event){
                API.muteMember(member);
                event.preventDefault();
                return false;
            });
        });
        
        $('#inmeeting h1').text(meeting['name']);
        
        this.showPage("#inmeeting", 1);
    },
    
    updateMeetingTimeElapsed: function(time){
            $('.small-time').html('' + time['m'] + ':' + time['s']);
    },
    
    muteMember: function(member, state){  
        var memberMuteControlEl = $("#member-"+ member['id'] +" .control");
        
        if(state){
            memberMuteControlEl.addClass('selected');
        }else{
            memberMuteControlEl.removeClass('selected');
        }
    },
    
    pinMember: function(member, state){
        var memberEl = $("#member-"+ member['id']);
        
        if(state){
            memberEl.addClass('selected');
        }else{
            memberEl.removeClass('selected');
        }
    },
    
    endMeeting: function(){},
    switchMeeting: function(){},
    newMeeting: function(){},
    newPhoneCall: function(){},
    
    
    memberCameraSettings: function(){},
    muteMemberCamera: function(){}

}