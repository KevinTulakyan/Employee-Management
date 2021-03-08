-- department seeds
INSERT INTO department (dep_id, name)
VALUES (1, "Sales");

INSERT INTO department (dep_id, name)
VALUES (2, "Legal");

INSERT INTO department (dep_id, name)
VALUES (3, "Engineering");

INSERT INTO department (dep_id, name)
VALUES (4, "Finance");

-- role seeds
INSERT INTO role (r_id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1);

INSERT INTO role (r_id, title, salary, department_id)
VALUES (2, "Salesperson", 80000, 1);

INSERT INTO role (r_id, title, salary, department_id)
VALUES (3, "Legal Team Lead", 250000, 2);

INSERT INTO role (r_id, title, salary, department_id)
VALUES (4, "Lawyer", 190000, 2);

INSERT INTO role (r_id, title, salary, department_id)
VALUES (5, "Lead Engineer", 150000, 3);

INSERT INTO role (r_id, title, salary, department_id)
VALUES (6, "Software Egineer", 120000, 3);

INSERT INTO role (r_id, title, salary, department_id)
VALUES (7, "Accountant", 125000, 4);

-- employee seeds
INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, 3);

INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (2, "Mike", "Chan", 2, 1);

INSERT INTO employee (emp_id, first_name, last_name, role_id)
VALUES (3, "Ashley", "Rodriguez", 5);

INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (4, "Robert", "Lopez", 6, 3);

INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (5, "Rick", "Sanchez", 6, 3);

INSERT INTO employee (emp_id, first_name, last_name, role_id)
VALUES (6, "Malia", "Brown", 7);

INSERT INTO employee (emp_id, first_name, last_name, role_id)
VALUES (7, "Sarah", "Lourd", 3);

INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (8, "Tom", "Allen", 4, 7);

INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (9, "Zack", "Martin", 7, 8);

INSERT INTO employee (emp_id, first_name, last_name, role_id, manager_id)
VALUES (10, "Tammy", "Galal", 6, 3);
