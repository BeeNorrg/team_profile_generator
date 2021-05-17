const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//init array for employees
let employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//continuePrompts is for determining if we start/loop through the team making process
const  startPrompts= [
    {
        type: 'confirm',
        name: 'teamSelect',
        message: 'Would you like to build a team?'
    },
    {
        type: 'input',
        name: 'teamName',
        message: 'What\'s your team\'s name?'
    },
    {
        type: 'confirm',
        name: 'anotherMember',
        message: 'Do you want to add another employee?'
    },
];

function managerSelect(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of your team\'s Manager',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter your Manager\'s ID:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your Manager\'s email',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter your Manager\'s office number',
        },
    ]).then((res) => {
        //create a new Manager
        let manager = new Manager(res.name, res.id, res.email, res.officeNumber);
        console.log('Manager:', manager);
        //push manager to employees
        employees.push(manager);
        console.log('employees:', employees);
        employeeSelect();
    })
}

function engineerSelect(){
    inquirer.prompt([
        {

        },
    ]).then((res) => {
        
    })
}

function internSelect(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of your new Intern',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter your new Intern\'s ID:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your new Intern\'s email',
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter your new Intern\'s school',
        },
    ]).then((res) => {
        //create new Intern
        let intern = new Intern (res.name, res.id, res.email, res.school)
        console.log('intern:', intern);
        employees.push(intern);
        console.log('employees:', employees);
    })
}


function employeeSelect(){
    inquirer.prompt([
        {
        type: 'list',
        name: 'newMember',
        message: 'add a team member:',
        choices:['Intern', 'Engineer']
        }
    ]).then((res) => {
        console.log(res.newMember);
        if (res.newMember === 'Engineer'){
            engineerSelect();
        } else if (res.newMember === 'Intern'){
            internSelect();
        }
    })
};

function init(){
    inquirer.prompt(startPrompts[0]).then((res) => {
        console.log('res:', res);
        if (res.teamSelect === true) {
            managerSelect();
        } else if (res.teamSelect === false) {
            return;
        }
    });
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
init();