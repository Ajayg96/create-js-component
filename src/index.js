#!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");

async function createFile() {
  const fileName = process.argv[2];
  if (fileName) {
    const { framework, component } = await inquirer.prompt([
      {
        type: "list",
        message: "Pick the framework you're using:",
        name: "framework",
        choices: ["React", "React-Native"],
      },
      {
        type: "list",
        name: "component",
        message: "Type of component ?",
        choices: ["Functional Component", "Class Component"],
      },
    ]);
    let data = createComponent(component, fileName, framework);
    const cwd = process.cwd();
    if (fileName.includes(".js") || fileName.includes(".jsx")) {
      fs.writeFileSync(`${cwd}/${fileName}`, data);
      console.log(`${framework}:- ${component} ${fileName} created at ${cwd}`);
      console.log("Thank you for using create-js-component :)");
    } else {
      console.log("Extension should be either .js or .jsx");
    }
  } else {
    console.log("Please enter filename");
  }
}

function createComponent(componentType, fileName, framework) {
  let componentName = "";
  let component = "";
  if (fileName.includes(".js")) {
    componentName = fileName.slice(0, -3);
  }
  if (fileName.includes(".jsx")) {
    componentName = fileName.slice(0, -4);
  }
  if (framework === "React") {
    if (componentType === "Functional Component") {
      component = `
import React from 'react';

const ${componentName} = () => {
  return (
    <div>${componentName} component</div>
  );
}

export default ${componentName};
    `;
    } else {
      component = `
import React, { Component } from 'react';

class ${componentName} extends Component {
  render() {
    return (
      <div>${componentName} component</div>
    );
  }
}

export default ${componentName};
    `;
    }
  } else {
    if (componentType === "Functional Component") {
      component = `
import React from 'react';
import { View, Text } from 'react-native';

const ${componentName} = () => {
  return (
    <View>
      <Text>${componentName} component</Text>
    </View>
  );
}

export default ${componentName};
    `;
    } else {
      component = `
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ${componentName} extends Component {
  render() {
    return (
      <View>
        <Text> ${componentName} component </Text>
      </View>
    );
  }
}

export default ${componentName};
    `;
    }
  }
  return component;
}

createFile();
