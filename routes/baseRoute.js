const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const payloadChecker = require("payload-validator");

function convertBodyToArray(body) {
  let spparams = [];
  for (let key in body) {
    if (body.hasOwnProperty(key)) {
      let value = body[key];
      spparams.push(value);
    }
  }
  return spparams;
}

let validator = async (validatorParam, inputParam) => {
  let i;
  let expectedPayload = await{};
  for(i = 0;i<validatorParam.length;i++){
    expectedPayload[validatorParam[i]] = await "";
  }
  return await payloadChecker.validator(inputParam, expectedPayload, validatorParam, false);
}


let baseRoute = {
  router:router,
  convertBodyToArray:convertBodyToArray,
  validator:validator,
  auth:auth.auth
}

module.exports = baseRoute;