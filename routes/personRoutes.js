const express=require('express');
const router=express.Router();
const person=require('./../models/person')

router.post('/',async(req,res)=>{
    try{
    const data=req.body;
  
    const newPerson=new person(data);
    const respone=await newPerson.save();
    console.log('data saved');
    res.status(200).json(respone);
  
    }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal error'});
  }
  })

    router.get('/',async(req,res)=>{
    try{
       const data= await person.find();
       console.log('data fetched');
       res.status(200).json(data);
    }catch(e){
      console.log(e);
      res.status(500).json({error:'internal server error'})
  
    }finally{
  
    }
  })

  router.get('/:workType',async(req,res)=>{
  try{
    //Extract the worktype because it is of parameter type
    const workType=  req.params.workType;
    // validation check if the worktype is valid or not
    if(workType=='chef'|| workType=='waiter'|| workType=='manager'){
        const response=await person.find({work:workType})
        console.log('response fetched succesufully')
        res.status(200).json(response);
    }
    else{
      res.status(404).json({error:'Invalid work type'})
    }
  }catch(err){
    console.log(e);
    res.status(500).json({error:'internal server error'})
  }
    
})


router.put('/:id',async(req,res)=>{
    try{
      
      const personId=req.params.id;// Extract the id from the url parameter
      const updatedPersonData=req.body;// update data for the person
      const response=await person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,// return the updated document
        runValidators:true,//run moongose validation
      })
       
       if(!response){
         return res.status(404).json({error:'Response not found'})
      }
      console.log('data updated')
      res.status(200).json(response)
    }
    
    catch(err){
        console.log('Error inside the id part')
        res.status(500).json({error:'Internal error'})
        
    }
})

router.delete('/:id',async(req,res)=>{ 
  try{
    const personId=req.params.id;
    const response=await person.findByIdAndDelete(personId);
    if(!response){
      console.log('not deleted')
      return res.status(404).json({error:'Person Not found'})
    }
    console.log("Data deleted succuesfully");
    res.status(200).json({message:'person data delted'})
   }
  
  catch(err){

    console.log(err);
    res.status(500).json({err:'Internal Error'});
  }
     
     
})
module.exports=router;
  