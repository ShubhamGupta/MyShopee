var Util = {
    escapeId:   function(myid){
        return myid.replace(/(:|\.|\/|\@)/g,'\\$1');
    }
}