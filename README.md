<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1558612869/adonis-readme_zscycu.jpg" width="600px">
</div>

<br />

<div align="center">
  <h3>AdonisJS official documentation</h3>
  <p>Source code and documentation for the official documentation website hosted on <a href="https://docs.adonisjs.com">docs.adonisjs.com</a></p>
</div>

## Installation
AdonisJS is a Node.js framework, and hence it requires Node.js to be installed on your computer. To be precise, we need at least the latest release of Node.js v14.

You can check the Node.js and npm versions by running the following commands.
```bash
# check node.js version
  node -v
```

## Creating a new project
```bash
  npm init adonis-ts-app@latest hello-world
```
The installation process prompts for the following selections.

 Project structure
You can choose between one of the following project structures.

- **web** project structure is ideal for creating classic server-rendered applications. We configure the support for sessions and also install the AdonisJS template engine.
- **api** project structure is ideal for creating an API server.
- **slim** project structure creates the smallest possible AdonisJS application and does not install any additional packages, except the framework core.

## Setup
Follow the below mentioned steps to setup the project on your local.

- Fork the repo
- Pull the repo on your local
- Install all dependencies using `npm install`.
- Start the AdonisJS development server using `node ace serve --watch`
