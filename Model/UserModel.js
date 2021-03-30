const baseModel = require("./baseModel");

// ---------------------------------FUNCTION -----------------------------------//
let getAllUser = async () => {
  try {
    let sql = "sp_User_GetAllUser";
    return (await baseModel.execStore(sql))[0];
  } catch (error) {
    throw error;
  }
};

let getUserByPhoneAndPass = async (data) => {
  try {
    let sql = "sp_User_GetUser_Phone_Password";
    return (await baseModel.execStore(sql, data))[0][0];
  } catch (error) {
    throw error;
  }
};

let registerUser = async (data) => {
  try {
    let sql = "sp_User_GetUser_Register";
    data[3] = parseInt(data[3]);
    return (await baseModel.execStore(sql, data))[0][0];
  } catch (error) {
    throw error;
  }

};
// ---------------------------------FUNCTION -----------------------------------//

// ---------------------------------IMPORT -----------------------------------//

let model = {
  getAllUser: getAllUser,

  getUserByPhoneAndPass: getUserByPhoneAndPass,
  registerUser: registerUser,
};
module.exports = model;
// ---------------------------------IMPORT -----------------------------------//
