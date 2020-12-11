const cluster=require("cluster");
const numCPUS = 2;

if(cluster.isMaster){
    for(let i=0;i<numCPUS;i++){
        let worker = cluster.fork();
        //...
    }
    /*
        - 2 childProcess will be created at this point. 
        - Lets assume childProcess1 wants to send some data to childProcess2
            - is it possible for a childProcess to directly communicate to another childProcess like childProcess1 --> childProcess2? OR
            - is the communication between childProcesses are possible only via Master like childProcess1 --> Master --> childProcess2 ?

    */
}
else{
    require("./app")();
}