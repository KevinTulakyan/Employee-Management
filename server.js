
const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password1",
    database: "employees_DB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Main Menu");
    mainMenu();
    // connection.end();
});

function mainMenu(){
// Prompt user to choose an option
inquirer.prompt({
      type: "list",
      name: "action",
      message: "Menu",
      choices: [
        "View all departments", 
        "View all roles", 
        "View all employees", 
        "Add a department", 
        "Add a role", 
        "Add an employee", 
        "Update an employee role"
      ]
    }).then((data) =>{
    console.log(data);
});
}