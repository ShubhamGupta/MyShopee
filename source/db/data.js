var Data = {    
	meetings: {
		'available': [
			{id: 1, start_at: '1:00', end_at: '2:00', name: 'Widget Sync-Up', members: members()},
			{id: 2, start_at: '3:00', end_at: '4:00', name: 'Bi-Weekly Shareholder Annual Earnings Call', members: members()},
			{id: 3, start_at: '5:00', end_at: '6:00', name: 'Daily Standup', members: members()}, 
			{id: 4, start_at: '7:00', end_at: '8:00', name: 'Project Retrospective', members: members()}
		],
		'recent': [
			{id: 5, name: 'Recent 1', members: members()}, 
                        {id: 6, name: 'Recent 2', members: members()}, 
                        {id: 7, name: 'Recent 3', members: members()}
		],
                
	}
        
        
}

function members(){
    return [
       {id: 1, type: 'phone', name: 'Lisa Rogers', photo: 'images/main/people/lisa_rogers-thumb.jpg'},
       {id: 2, type: 'user',  name: 'Tom Simmons', photo: 'images/main/people/tom_simmons-thumb.jpg'},
       {id: 3, type: 'room',  name: 'Board Room',  photo: 'images/main/people/in_meeting-thumb.jpg' },
    ]
}