const net = require('node:net');
let connected=false;
let heartbeatIntervalId;
let cid;
const client = net.createConnection({ port: 8124 }, () => {
  connected=true;
  heartbeatIntervalId = setInterval(()=>{
    send({type:'heartbeat',payload:`${cid}`});
  },5000);
});

function  processMessage(message){
  if(message.type=="client-registe-response"){
    cid=message.payload;
  }else if(message.type=="task-assign"){
    processTask(message);
  }
}

function send(type,payload){
  client.write(JSON.stringify({type,payload:payload}));
}

function processTask(message){
  console.log("receive server assign task : "+ JSON.stringify(message.payload));

  setTimeout(()=>{
    send({cid:cid, tid:message.payload.id, result:'ok'});
  },3000);
}

client.on('data', (data) => {
  console.log(data.toString());
  let messge = JSON.parse(data.toString());
  processMessage(messge);
});
client.on('end', () => {
  clearInterval(heartbeatIntervalId);
  console.log('disconnected from server');
}); 

client.on('error', err => {
  clearInterval(heartbeatIntervalId);
  console.log(`disconnected from server,${err}`);
}); 
