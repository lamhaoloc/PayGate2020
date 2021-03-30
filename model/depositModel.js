const baseModel = require("./baseModel");

// ---------------------------------FUNCTION -----------------------------------//
let getCurrentValue = async (data) => {
  try {
    let sql = "SELECT Value FROM wallet WHERE UserId = ? AND WalletTypeId = 'MW'";
    return (await baseModel.execQuery(sql,data));
  } catch (error) {
    throw error;
  }
};


// ---------------------------------FUNCTION -----------------------------------//

// ---------------------------------IMPORT -----------------------------------//

let model = {
  getCurrentValue: getCurrentValue,

};
module.exports = model;
// ---------------------------------IMPORT -----------------------------------//
