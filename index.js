const tmi = require('tmi.js');

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    channels: [ 'clem_ant' ]
});
function pressKeyForXSecond(key, time){
    var start = Date.now();
    do{
        robot.keyToggle(key, "down");
        var delta = Date.now() - start;
    }while(delta <= time);
    robot.keyToggle(key, "up");
}


function traitementMessage(message){
    const msg = message.split(' ');
    console.log(msg);
    var temps = 500;
    for(let i = 0; i < msg.length; i++) {
        if(i < msg.length-1 && msg[i+1].toLowerCase().includes("long")){
            temps = 2000;
        }if(i < msg.length-1 && msg[i+1].toLowerCase().includes("lent")){
            temps = 200;
        }if(i < msg.length-1 && msg[i+1].toLowerCase().includes("moyen")){
            temps = 1250;
        }
        if (msg[i].toLowerCase().includes("droite")) {
            pressKeyForXSecond("d", temps);
            temps = 500;
        }
        if (msg[i].toLowerCase().includes("avance")) {
            pressKeyForXSecond("z", temps);
            temps = 500;
        }
        if (msg[i].toLowerCase().includes("recul")) {
            pressKeyForXSecond("s", temps);
            temps = 500;
        }
        if (msg[i].toLowerCase().includes("gauche")) {
            pressKeyForXSecond("q", temps);
            temps = 500;
        }
        if (msg[i].toLowerCase().includes("saut")) {
            robot.keyTap(" ");
            temps = 500;
        }
    }

}

client.connect();
var robot = require("robotjs");
client.on('message', (channel, tags, message, self) => {
    //console.log(`${tags['display-name']}: ${message}`);
    traitementMessage(`${message}`);
});