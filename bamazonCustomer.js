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
start();
//
function start(){
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
        },
        {
          type: 'number',
          name:'itemQty',
          message:"What is the quantity of the item you want to purchase?"
      }
      ])
      .then(answers => {

        //Query database for one product 
        connection.query('SELECT * FROM `products` WHERE item_id=?', [answers.itemId], function (error, results, fields) {
          if(error) throw error;
          if (results.length > 0){
            //we know we have a valid product and it should be only object in array AKA results[0]
            var item  = results.pop();
            if(item.stock_quantity >= answers.itemQty){
              //We do ahve a valid qty to sell to user
              var newQty = item.stock_quantity - answers.itemQty
              connection.query('UPDATE `products` SET stock_quantity=? WHERE item_id=?', [newQty, item.item_id], function (error, results, fields) {
                if(error) throw error;
                console.log("The amount for these items is " + answers.itemQty * item.price)
                start();
              })
            }
            else {
              //there is not enough stock qty to fulfill the request
              console.log("There isn't enough quantity to sell that much.");
              setTimeout(function(){

                start();
              }, 2000);
            }
          }
          else {
            //user entered an invalid ID and we should let them know that
            console.log("The product is not in the database.");
            setTimeout(function(){

              start();
            }, 2000);
          }
        });
        //Verify we have enough QTY
        //Update DB to represent a sale
        //Respond to user with full cost
        //IF QTY not enough 
        //Do not update DB
        //Let user know not enough QTY
      });
  });
}
  //
