const baseRoute = require("./baseRoute");
const depositModel = require("../model/depositModel");

let router = baseRoute.router;

router.get("/getCurrentValue/:id",baseRoute.auth,async (req,res)=>{
  
  let spparams = baseRoute.convertBodyToArray(req.params);
  try{
    spparams[0] = parseInt(spparams[0]);
    console.log(spparams);
    let dataSend = await depositModel.getCurrentValue(spparams);
    res.json(dataSend);
  }
  catch(e){
    res.json({message:e});
  }
});

module.exports = router;
