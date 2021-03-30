const baseRoute = require("./baseRoute");
const bankModel = require("../model/bankModel");

let router = baseRoute.router;

router.get("/getAllBank",baseRoute.auth,async (req,res)=>{
  
  try{
    let dataSend = await bankModel.getAllBank();
    res.json(dataSend);
  }
  catch(e){
    res.json({message:e});
  }
});

module.exports = router;
