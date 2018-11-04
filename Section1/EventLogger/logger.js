const EventEmiiter = require('events');

class Logger extends EventEmiiter{
    
    log(){
        this.emit("Sending message",{Name:'Vidit',surname:'Shah'});
    }
}
module.exports=Logger;