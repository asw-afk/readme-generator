const inquirer = require("inquirer");
const fs = require("fs");

//The questions the user will be asked

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


function renderLicenseLink(data) {
  if (data.License === "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)") {
    return "[MIT](https://opensource.org/licenses/MIT)";
  } else if (data.License === "ISC") {
    return "[ISC](https://opensource.org/licenses/ISC)";
  } else if (data.License === "MPL") {
    return "[MPL](https://opensource.org/licenses/MPL-2.0)";
  } else {
    return "Unknown License";
  }
}

// [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
// [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
//  [![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

//Saves user input into a new file
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
        if (data.License == "MPL") {
          data.License =
            "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
        }
      }
    }
    const createMarkdown = ` # ${data.Title}
  ${data.License}
  ## Description 
  ${data.Description}


  ## Table of Contents
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [Contributing](#Contributors)
  - [License](#License)
  - [Tests](#Tests)
  - [Questions](#Questions)

  
  ## Installation 
   ${data.Installation}
  
  ## Usage 
  ${data.Usage}
  
  ## License 
    ${renderLicenseLink(data)}

  ## Contributors 
  ${data.Contributors}

  ## Test
  ${data.Tests}

  ## Questions 
  ${data.Questions}`;
    fs.writeFile("GeneratedREADME.md", createMarkdown, (err) => {
      err ? console.log(err) : console.log("success");
    });
  });
}

// Function call to initialize app
init();
