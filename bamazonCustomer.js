var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
 // connection.end();
});

connection.query('SELECT * FROM `products`', function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if(error) throw error;

    // console.log(results);
    for(var result of results){
        console.log("Id: " + result.item_id + " | " + "Product: " + result.product_name + " | " + "Dept: " + result.department_name + " | " + "Price: " + result.price + " | " + "Stock Qty: " + result.stock_quantity )
    }

    //Initiate use of inquirer to interact wth user
    inquirer
      .prompt([
        {
            type: 'number',
            name:'itemId',
            message:"What is the Id of the item you want to purchase?"
        }
      ])
      .then(answers => {
        console.log(answers);

        //Query database for one product 
        //Verify we have enough QTY
        //Update DB to represent a sale
        //Respond to user with full cost
        //IF QTY not enough 
        //Do not update DB
        //Let user know not enough QTY
      });
  });
