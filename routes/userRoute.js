const baseRoute = require("./baseRoute");
const userModel = require("../model/userModel");
let router = baseRoute.router;

/* GET home page. */

router.get("/", async (req, res) => {

  try {
    let usersend = await userModel.getAllUser();
    console.log(await usersend);
    res.json(usersend);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/login",baseRoute.auth, async (req, res) => {
  try {
    const validatorParam = await ["phone", "password"];
    let result = await baseRoute.validator(validatorParam, req.body);
    
    if (result.success) {
      let spparams = await baseRoute.convertBodyToArray(req.body);
      // await console.log(spparams);
      let dataSend = await userModel.getUserByPhoneAndPass(spparams);
      if (dataSend) {
        res.json(dataSend);
      }
      else {
        res.status(404).json({
          "message": "No user"
        });
      }
    } else {
      res.json({ "message": result.response.errorMessage });
    }


  } catch (e) {
    res.status(404).send(e);
  }
});


router.post("/register", async (req, res) => {
  try {
    const validatorParam = await ["phone", "password", "name", "gender", "dateofbirth"];
    let result = await baseRoute.validator(validatorParam, req.body)
    if (result.success) {
      let spparams = baseRoute.convertBodyToArray(req.body);
      console.log(spparams);
      let dataSend = await userModel.registerUser(spparams);
      res.json(dataSend);

    } else {
      res.json({ "message": result.response.errorMessage });
    }


  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
