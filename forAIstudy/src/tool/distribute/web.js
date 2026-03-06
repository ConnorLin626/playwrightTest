const http = require('http');
const fs = require('fs');
const process = require('node:process')
const { DistributeServer } = require('./server');

class WebServer{
    //启动分布式处理Server
    startDistibuteServer(){
        this.distributeServer = new DistributeServer();
        
        this.distributeServer.on('exit', (code) => {
            this.distributeServer.processExit(code);
        });
      
        this.distributeServer.on('event',event=>{
            this.distributeServer.processEvent(event.action).then(result=>{
                event.res.statusCode = 200;
                event.res.setHeader('Content-Type', 'application/json; charset=utf-8');
                event.res.end(JSON.stringify(result));
           });
        });
    
        this.distributeServer.start();
    }
    
    //启动webServer
    start(){
        const port = 3000;
        this.server = http.createServer((req, res) => {
            //console.info(req.url, req.method);
        
            if(req.url=="/"){
                // 设置响应头部信息
                this.distributeServer.emit('event',{ action: 'getAllClients' ,req,res});
            }
            //let data = fs.readFileSync("./index.html","utf-8");
            // 写入并结束响应
            //res.end(data);
        
            // res.statusCode = 200;
            // res.setHeader('Content-Type', 'application/json');
            // res.end(JSON.stringify({
            //     data: 'Hello World!',
            // }));
        })
        
        this.server.listen(port, () => {
            console.log(`web started,running on http://127.0.0.1:${port}/`);
            this.startDistibuteServer();
        });
    
    }

    exit(){
        this.distributeServer.emit('exit',-1);
    }
}

let webServer = new WebServer();
//process ctrl+c
process.on('SIGINT', function () {
    console.log('web exit now!!');
    process.exit();
});

process.on('exit',()=>{
    console.info('notify server exit');
    webServer.exit();
})

webServer.start();