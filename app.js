const cluster=require("cluster");

 const init = ()=>{

    const express = require("express");

    const PORT=4000;
    const app=express()

    // process.on("message",(message)=>{
    //     console.log(`worker message ${JSON.stringify(message)} pid ${process.pid}`);
    // })


    app.get("/viewworkers",(req,res)=>{
       // console.log("workerCollection ",global.workerCollection)
       console.log("cluster.workers ",cluster.workers);

        process.send({
            type : "chat"
        })
        console.log("process.pid ",process.pid)
        res.send({data : "none"})
    })
    app.listen(PORT,()=>{
        console.log(`server listening on port ${PORT}`);
    });


}

module.exports=init;