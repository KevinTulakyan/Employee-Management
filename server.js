
const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
let mysql = require('promise-mysql');

const connectionInfo ={
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password1",
    database: "employee_DB"
};
const connection= mysql2.createConnection(connectionInfo);

connection.connect((err) => {
    if (err) throw err;
    console.log("Main Menu");
    mainMenu();
});

function mainMenu(){
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
        "Update an employee role",
        "End Session"
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
            case "Add an employee":
                addEmp();
                break;
            case "Update an employee role":
                updateRole();
                break;
            case "End Session":
                connection.end();
                break;
        }
});
}

function viewAllDep(){
    connection.query(
        `SELECT * FROM department ORDER BY dep_id ASC`,
        function(err,data){
            if(err) throw err;
            console.table(data);
            mainMenu();
        }
    )

}

function viewAllRoles(){
    connection.query(
        `SELECT r_id AS role_id, title AS job, name AS department, salary
        FROM role
        INNER JOIN department
        ON role.department_id = department.dep_id
        ORDER BY r_id ASC`,
        function(err,data){
            if(err) throw err;
            console.table(data); 
            mainMenu();
        }
    )
}

function viewAllEmp(){
    connection.query(
        `SELECT emp_id, first_name, last_name, title, name, salary, manager_id
        FROM employee
        INNER JOIN role
        ON employee.role_id = role.r_id
        INNER JOIN department
        ON role.department_id = department.dep_id
        ORDER BY emp_id ASC`,
        function(err,data){
            if(err) throw err;
            console.table(data);
            mainMenu();
        }
    )
    
}

function addDep(){
    inquirer.prompt(
        {
            type: "input", 
            name: "deptName",
            message: "Department Name: "
        }
        ).then((answer) => {
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    name: answer.deptName
                },
                function(err, res) {
                if(err) return err;
                console.log("Department Added.");
                mainMenu();
            });
        });
}

function indexFinder(matchName, arrayName) {
    let index = 0;
    for (let i = 0; i < arrayName.length; i++) {
        if (arrayName[i] === matchName) {
            index = i ;
        }
    }
    return index+1;
}

function addRole() {
    let departmentArr = [];
    mysql.createConnection(connectionInfo)
    .then((conn) =>{
        return conn.query(`SELECT dep_id, name FROM department ORDER BY dep_id ASC`);
   }).then((department) => {
        for (i=0; i < department.length; i++){
            departmentArr.push(department[i].name);
        }
        return department;
    }).then((department) => {
        inquirer.prompt([
            {
                type: "input",
                name: "newRole",
                message: "New role:"
            },
            {
                type: "number",
                name: "salary",
                message: "Enter salary:"
            },
            {   
                type: "list",
                name: "dept",
                message: "Department:",
                choices: departmentArr
            }]).then(({ newRole, salary, dept }) => {
                let index = indexFinder(dept,departmentArr);
               connection.query(
                   `INSERT INTO role set ?`,
                   {
                       title: newRole,
                       salary: salary,
                       department_id: index
                   },
                   function(err,res){
                       if(err) throw err;
                       mainMenu();
                   }
               )
                })
        })
}

function addEmp() {
    let employeeArr = [];
    let rolez = [];
    
    mysql.createConnection(connectionInfo
    ).then((conn) =>{
       return Promise.all([
            conn.query(`SELECT r_id, title FROM role ORDER BY r_id ASC`),
            conn.query(`SELECT emp_id, first_name, last_name FROM employee ORDER BY emp_id ASC`)
        ])
       
   }).then(([roles,employees]) => {
        for (i=0; i < employees.length; i++){
            let name = employees[i].first_name + ' ' + employees[i].last_name
            employeeArr.push(name);
        }
        for (i=0; i < roles.length; i++){
            rolez.push(roles[i].title);
        }
        return Promise.all ([roles, employees]);
    }).then(([roles,employee]) => {
        inquirer.prompt([
            {
                type: "input",
                name: "first",
                message: "First name:"
            },
            {
                type: "input",
                name: "last",
                message: "Enter lastname:"
            },
            {   
                type: "list",
                name: "rolePick",
                message: "Role:",
                choices: rolez
            },
            {
                type: "list",
                name: "manager",
                message: "manager:",
                choices: employeeArr
            }
        ]).then(({ first, last, rolePick,manager }) => {
                let index2 =indexFinder(rolePick,rolez)
                let index = indexFinder(manager,employeeArr);
               connection.query(
                   `INSERT INTO employee set ?`,
                   {
                       first_name: first ,
                       last_name: last,
                       role_id: index2,
                       manager_id: index
                   },
                   function(err,res){
                       if(err) throw err;
                       mainMenu();
                   }
               )
                })
        })
}
function updateRole(){
    let employeeArr = [];
    let roleArr = [];
    mysql.createConnection(connectionInfo
    ).then((conn) => {
        return Promise.all([
            conn.query('SELECT r_id, title FROM role ORDER BY r_id ASC'), 
            conn.query("SELECT emp_id, first_name ,last_name AS Employee FROM employee ORDER BY emp_id ASC")
        ]);
        
    }).then(([roles, employees]) => {

        for (i=0; i < roles.length; i++){
            roleArr.push(roles[i].title);
        }

        for (i=0; i < employees.length; i++){
            employeeArr.push(employees[i].Employee);
        }

        return Promise.all([roles, employees]);
    }).then(([roles, employees]) => {

        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Who would you like to edit?",
                choices: employeeArr
            }, 
            {
                name: "role",
                type: "list",
                message: "What is their new role?",
                choices: roleArr
            }
            ]).then((answer) => {
                let roleID = indexFinder(answer.role, roleArr);
                let employeeID = indexFinder(answer.employee, employeeArr);
                connection.query(
                    'UPDATE employee SET ? WHERE ?',
                    [{
                        role_id: roleID
                    },
                    {
                        emp_id: employeeID
                    }],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + ' Employee role successfully updated\n');
                        mainMenu();
                   }
                )
            });
    });
    
}