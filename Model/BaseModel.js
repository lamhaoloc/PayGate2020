

const mysql = require('mysql');
let con = mysql.createConnection({
	host: "27.72.62.136",
	user: "accountforpaygate",
	password: "chauanh535",
	database: "paygate",
	port: 3306,
	multipleStatements: true
});
con.connect(function (err) {
	if (err) throw err;
	console.log("Database Connected!");
});

let writeSystemLog = async (error)=>{
	let param = [].push(error);
	let sql = `call SystemLog_AddNew(?)`;
	test = new Promise((resolve, reject) => {
		con.query(sql,param, (err, result, field) => {
			if (!result) {
				reject(err);
			} else {
				// console.log(result);
				resolve(result);
			}
		});
	});
	let dataReturn;
	await test
		.then((d) => {
			dataReturn = d;
		})
		.catch((e) => dataReturn = e);
	
}	

//storename: ten store
//data: du lieu truyen vao theo array,
// return state: 1 la return array, 0 la return 1 gia tri
let execStore = async (storeName, data) => {
	try {
		let sql = `call ${storeName}()`;
		console.log(data);
		if (data) {
			let queryString = "";
			for (let i = 0; i < data.length; i++) {
				queryString += ",?";
			}
			queryString = queryString.substring(1, queryString.length);
			; sql = `call ${storeName}(${queryString})`;

		}
		console.log(sql);

		let dataReturn;
		let test;
		if (!data) {
			console.log(`Running on dataless`);
			test = new Promise((resolve, reject) => {
				con.query(sql, (err, result, field) => {
					if (!result) {
						reject(err);
					} else {
						// console.log(result);
						resolve(result);
					}
				});
			});
			await test
				.then((d) => {
					dataReturn = d;
				})
				.catch((e) => dataReturn = e);

			return dataReturn;
		}
		else {
			console.log(`Running on datapull`);

			test = new Promise((resolve, reject) => {
				con.query(sql, data, (err, result, field) => {
					if (!result) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
			await test
				.then((d) => {
					dataReturn = d;
				})
				.catch((e) => dataReturn = e);
			
			return dataReturn;

		}

	} catch (error) {
		writeSystemLog();
		console.log(error);
		throw error;
	}
}



//storename: ten store
//data: du lieu truyen vao theo array,
// return state: 1 la return array, 0 la return 1 gia tri
let execQuery = async (sql, data) => {
	try {
		let dataReturn;
		let test;
		if (!data) {
			console.log(`Running on dataless`);

			test = new Promise((resolve, reject) => {
				con.query(sql, (err, result, field) => {
					console.log(result);
					if (!result) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
			await test
				.then((d) => {
					dataReturn = d;
				})
				.catch((e) => dataReturn = e);
			
			return dataReturn;
		}
		else {
			console.log(`Running on data`);

			test = new Promise((resolve, reject) => {
				con.query(sql, data, (err, result, field) => {
					if (!result) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
			await test
				.then((d) => {
					dataReturn = d;
				})
				.catch((e) => dataReturn = e);
			return dataReturn;
		}

	} catch (error) {
		writeSystemLog();
		throw error;
	}
}


let model = {
	execStore: execStore,
	execQuery: execQuery
}

module.exports = model;