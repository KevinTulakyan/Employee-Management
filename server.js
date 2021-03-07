
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
        switch (data.action) {
            case "View all departments":
                viewAllDep();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "View all employees":
                viewAllEmp();
                break;
            case "Add a department":
                addDep();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add a employee":
                addEmp();
                break;
            case "Update an employee role":
                updateRole();
                break;
        }
});
}

function viewAllDep(){
    connection.query(
        `SELECT * FROM department`,
        function(err,data){
            if(err) throw err;
            console.table(data);
        }
    )

}

function viewAllRoles(){
    connection.query(
        `SELECT e_id, first_name, last_name, title, name, salary, manager_id
        FROM employee
        INNER JOIN role
        ON employee.role_id = role.r_id
        INNER JOIN department
        ON role.department_id = department.d_id`,
        function(err,data){
            if(err) throw err;
            console.table(data);
        }
    )
}
