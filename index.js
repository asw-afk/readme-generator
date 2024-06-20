// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// TODO: Create an array of questions for user input

const answers = [
  {
    type: "input",
    message: "What is the title of your project?",
    name: "Title",
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return "";
      }
    },
  },
  {
    type: "input",
    message: "Give a description of your project",
    name: "Description",
  },
  {
    type: "input",
    message: "Provide a table of contents",
    name: "Table of Contents",
  },
  {
    type: "input",
    message: "Enter installation instructions",
    name: "Installation",
  },
  {
    type: "input",
    message: "What will this project be used for?",
    name: "Usage",
  },
  {
    type: "input",
    message: "Who contributed to this project?",
    name: "Contributors",
  },
  {
    type: "input",
    message: "Does this project include tests?",
    name: "Tests",
  },
  {
    type: "input",
    message: "Do you have any questions regarding this project?",
    name: "Questions",
  },
  {
    type: "list",
    message: "Select Liscense",
    name: "License",
    choices: ["MIT", "ISC", "MPL"],
  },
];

// [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
// [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
//  [![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(answers).then(function (data) {
    if (data.License === "MIT") {
      data.License =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        if (data.License == "ISC") {
            data.License =
            "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
        } else {
            
        }
    }
    const createMarkdown = ` ## ${data.Title}
  
  ## Description 
  ${data.Description}
  
  ## Installation 
   ${data.Installation}
  
  ## Usage 
  ${data.Usage}
  
  ## Liscense 
  ${data.License}

  ## Contributors 
  ${data.Contributors}

  ## Questions 
  ${data.Questions}`;
    fs.writeFile("GeneratedREADME.md", createMarkdown, (err) => {
      err ? console.log(err) : console.log("success");
    });
  });
}

// Function call to initialize app
init()