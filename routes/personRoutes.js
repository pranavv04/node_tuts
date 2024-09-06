const express = require('express');
const router = express.Router();
const Person = require('../models/person') 

router.post('/', async(req,res)=>{
    try{
          const data = req.body;
          const newPerson = Person(data);
          const response = await newPerson.save();
          console.log('Data saved');
          res.status(200).json(response);
    }
    catch(err){
         console.log(err);
         res.status(500).json({error : 'Internal server error'})
    }
  
  })
  

router.get('/' ,async(req,res) =>{
    try {
         const data = await Person.find();
         console.log('Data fetched');
         res.status(200).json(data);

    }
     catch (err) {
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
        
    }
})


router.get('/:work' , async(req,res) => {
    try{
       const workType  = req.params.work;
       if(workType == 'chef' || workType == 'manager' ||workType == 'waiter'){
           const response  =await Person.find({work : workType});
           console.log('Data fetched');
           res.status(200).json(response);
       }
    }
    catch(error){  

       res.status(404).json({error : "Invalid work type"} )
    }
})


router.put('/:id' , async(req,res)=>{
    try{
       const personId = req.params.id;
       const updatedPersonData = req.body;

       const response = await Person.findByIdAndUpdate(personId, updatedPersonData , {
        new:true,  //return updated document
        runValidators:true, // run mongoose validation
   });

    if(!response){
        return res.status(404).json({error: "Person not found "})
    }

   console.log("Data Updated");
   res.status(200).json(response);

    }
    catch(error){
       res.status(500).json({error : 'Internal server error'})
    }
})

router.delete('/:id' , async(req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
          return  res.status(404).json({error : "Person not found"});
        }
        console.log('Data deleted');
        res.status(200).json({message : "Person's data deleted successfully"})
    }
    catch(error){
            res.status(500).json({error : "Internal server error"})
    }
})


module.exports = router;