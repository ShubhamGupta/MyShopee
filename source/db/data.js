var Data = {    
	meetings: [
			{type: 'available', id: 1, start_at: $.datemaker("1.hour.ago"), end_at: $.datemaker("30.minutes.ago"), name: 'Widget Sync-Up', members: members()},
			{type: 'available', id: 2, start_at: $.datemaker("30.minutes.ago"), end_at: $.datemaker("10.minutes.from_now"), name: 'Bi-Weekly Shareholder Annual Earnings Call', members: members()},
			{type: 'available', id: 3, start_at: $.datemaker("0.minutes.from_now"), end_at: $.datemaker("15.minutes.from_now"), name: 'Daily Standup', members: members()}, 
			{type: 'available', id: 4, start_at: $.datemaker("15.minutes.from_now"), end_at: $.datemaker("1.hour.from_now"), name: 'Project Retrospective', members: members()},
			{type: 'recent', id: 5, name: 'Recent 1', members: members()}, 
                        {type: 'recent', id: 6, name: 'Recent 2', members: members()}, 
                        {type: 'recent', id: 7, name: 'Recent 3', members: members()}
	],

        members: function(){
            return members();
        }
}

function members(){
    return [
       {jid: 'http://rhino04@logitech.com/gmail.994187DE1', type: 'phone', name: 'Lisa Rogers', photo: 'images/main/people/lisa_rogers-thumb.jpg'},
       {jid: 'http://rhino04@logitech.com/gmail.994187DE2', type: 'user',  name: 'Tom Simmons', photo: 'images/main/people/tom_simmons-thumb.jpg'},
       {jid: 'http://rhino04@logitech.com/gmail.994187DE3', type: 'room',  name: 'Board Room',  photo: 'images/main/people/in_meeting-thumb.jpg' },
    ]
}