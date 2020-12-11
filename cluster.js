const cluster=require("cluster");
//const numCPUS = require("os").cpus().length;
const numCPUS = 2;

const clusterEvents=()=>{

}

const workerEvents=(worker)=>{
    
    worker.on("listening",(address)=>{
        console.log(`worker is listening address `,address );
    });
    worker.on("online",()=>{
        console.log(`worker is online`);
    });
    
    worker.on("disconnect",()=>{
        console.log(`worker disconnected ${process.pid}`);
    });
    // worker.on("message",(message)=>{
    //     console.log(`worker on message ${process.pid}`);
    //     console.log("message ",message);
    // });

    worker.on("message",function(message){
         console.log(`worker message ${JSON.stringify(message)} pid ${this.pid}`);
    })

    worker.on("exit",(code,signal)=>{
        console.log(`worker exited `);
        console.log("code ",code," signal ",signal);
    });

}



if(cluster.isMaster){
    console.log("numCPUS ",numCPUS," process.pid ",process.pid)
    let workerCollection=[];
    for(let i=0;i<numCPUS;i++){
        let worker = cluster.fork();
        workerCollection.push(worker);
        workerEvents(worker);
    }
   
    workerCollection.forEach((worker)=>{
        console.log(`master ${process.pid} sends message to worker ${worker.process.pid} worker.id ${worker.id}`)
        worker.send(
            {
                type:"default",
                msg : `message from master ${process.pid}`            
            }
        );
    });

    cluster.on("message",(worker,message)=>{

        console.log("cluster onmessage ",worker.id,message," processid ",process.pid)
        console.log("workerCollection ",workerCollection.length)
        /*
        workerCollection.forEach((worker)=>{
            worker.send({
                type:"chat",
                msg : `from master ${process.pid} to ${worker.process.pid}`
            })
        })
        */
       if(workerCollection.length >0){
            console.log("before ",workerCollection.length)
           // console.log("aaa - ",workerCollection[workerCollection.length-1].process.pid)
           // console.log("aaa - ",workerCollection[workerCollection.length-1])
           workerCollection[workerCollection.length-1].process.disconnect();
           workerCollection = workerCollection.slice(0,workerCollection.length-1);
           console.log("after ",workerCollection.length)
       }
    })
}
else{
    console.log("else worker process.pid ",process.pid)
    // process.on("online",()=>{
    //     console.log(`worker is online  ${process.pid}`);
    // });
    require("./app")();
}