var UI = {
    screenSaver: function(display, options){
        var el = $('#splash-screen');
        var date = options['date'];
        
        $('.header .time').html(date.format('ddd - mmm dd - h:MM').replace(/-/g, "<span>&nbsp;</span>")).css('cursor','pointer');
        
        // Format date and time for splash screen
        $('.splash-time').html(date.format('h:MM'));
        $('.splash-date').html(date.format('ddd - mmm dd').replace(/-/g, "<span>&nbsp;</span>"))
        
        if(display!= -1){display ? el.fadeIn() : el.fadeOut();}
    },
    
    
    loadMeetings: function(options){
        API.getMeetings({type: 'available'}).forEach(function(meeting, i){
            $('#home .tiles').append("<a id='meeting-"+ meeting.id +"' href='#' target='_blank' data-transition='flip'><h3>"+ meeting.start_at + ' - ' + meeting.end_at +"</h3><p>"+ meeting.meeting_name +"</p></a>");
            $('#meeting-'+ meeting.id).bind('click', function(){API.connectMeeting(meeting);});
        });
        
        API.getMeetings({type: 'recent'}).forEach(function(meeting, i){
           $('#quickconnect .tiles').append("<a id='meeting-"+ meeting.id +"' href='#' data-transition='flip'><p>"+ meeting.meeting_name +"</p></a>"); 
           $('#meeting-'+ meeting.id).bind('click', function(){API.connectMeeting(meeting);});
        });
    },
    
    processingPopup: function(display, options){
            if(!display){$('#toast').fadeOut();return;}
            var message = options['message'];
            var toast_cancel = false;
            
            $('#toast h2').text( message );
            $('#cancel-toast').unbind('click tap').bind('click tap', function(){
                $('#toast').fadeOut('fast');
                toast_cancel = true;
                return false;
            })

            $('#toast').fadeIn();
    },
    
    connectMeeting: function(){},
    updateMeetingTimeElapsed: function(){},
    endMeeting: function(){},
    switchMeeting: function(){},
    newMeeting: function(){},
    newPhoneCall: function(){},
    muteMember: function(){},
    pinMember: function(){},
    memberCameraSettings: function(){},
    muteMemberCamera: function(){}

}