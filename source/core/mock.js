var Mock = {
	joinMember: function(){
            setTimeout(function(){
                //console.log("Mock.joinMember");
                Proxy.joinMember({id: 999, name: "Tin Tin", type: "phone", photo: "images/main/people/lisa_rogers.jpg"});
            }, 10000);
	},
        
        joinMeeting: function(meeting){
            //console.log("Mock.joinMeeting");
            setTimeout(function(){
                Proxy.joinMeeting(meeting);
            }, 2500);
            
        }
}
