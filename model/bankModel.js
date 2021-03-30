const baseModel = require("./baseModel");

// ---------------------------------FUNCTION -----------------------------------  //
let getAllBank = async () => {
  try {
    let sql = "SELECT * FROM bank";
    return (await baseModel.execQuery(sql));
  } catch (error) {
    throw error;
  }
};


// ---------------------------------FUNCTION -----------------------------------  //

// ---------------------------------IMPORT -----------------------------------  //

let model = {
  getAllBank: getAllBank,
};


module.exports = model;
// ---------------------------------IMPORT -----------------------------------  //
