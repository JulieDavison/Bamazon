-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
  -- Creates a numeric column called "item_id" which will automatically increment its default value as we create new rows and is unique for each product--
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a sting column called "department_name" --
  department_name VARCHAR(30),
  -- Makes an numeric column called "price" which is the cost to customer--
  price DOUBLE(10,2),
  -- Makes an numeric column called "stock_quantity" which is the amount available in stock--
  stock_quantity INTEGER(10),
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lamp", "housewares", 10, 2),
("end table", "furniture", 50, 5),
("clock", "housewares", 5, 12),
("couch", "furniture", 100, 1),
("chair", "furniture", 60, 4),
("recliner", "furniture", 100, 2),
("plates", "housewares", 20, 12),
("glasses", "housewares", 4, 20),
("rug", "housewares", 30, 2),
("wine cooler", "housewares", 90, 2);
