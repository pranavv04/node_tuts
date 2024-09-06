const express = require('express');
const router = express.Router();

const Menu = require('../models/Menu')
router.post('/' , async(req,res) => {
    try{
        const data = req.body;
        const newMenu = Menu(data);
        const response = await newMenu.save();
        console.log("Data saved");
        res.status(200).json(response);
  
    }
    catch(error){
         console.log(error);
         res.status(500).json({error : "Internal server error"})
    }
  })
  

router.get('/' , async(req,res)=>{
    try{
        const data = await Menu.find();
        console.log("Data fetched");
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
       res.status(500).json({error : "Internal server error"})
    }
})


router.get('/:name' , async(req,res)=>{

   try{
    const menuName = req.params.name;
    if(menuName){
        
        const response = await Menu.find({name : menuName});
        if(response.length === 0){
            return res.status(404).json({error: "Item not available"})
        }
        console.log('Data fetched');
        res.status(200).json(response);
    
    }
   }
   catch(error){
    
    res.status(500).json({error : "Internal Server error"})
   }
})

module.exports = router;