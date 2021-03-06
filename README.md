# huge-manatee-to-do-list

# Installation & Setup
- To initialize: `npm i`
- To initialize database: `npm run db:init`
- To start database: `npm run db:start`

## Challenge Rating

This goal will likely be within your ZPD if you…

- Can build basic websites with HTML & CSS
- Can add behavior to a website with JavaScript
- Have a basic familiarity with SQL
- Are familiar with Object Oriented programming in JavaScript
- Are familiar with JavaScript promises
- Are interested in building full-stack web applications
- Are interested in how user stories get translated into software design and implementation choices

## Description

In this goal, you will build a simple to-do list app, where users can store their tasks in a database, see their tasks, and mark them complete.

This simple application is a great introduction to learning how the browser communicates with a server, and how the server communicates with a database.

You’ll be working with the Express library for Node.js to help you scaffold and build the server-side logic of your application.

Most learners have used Postgres for their database and pg-promise for connecting to a Postgres database from a Node.js app.

If you are already experienced with this project, you may want to choose a different database such as MongoDB.

You may design your own UI, but it’s probably better to copy someone else’s design.

## Context

One of the main skills we seek to learn here at Learners Guild is the creation of full-stack web applications. This project is an excellent opportunity to see how all your various foundational skills will come together into a complete, functioning website.

When working on this goal, you’ll encounter questions like:

- How could the application logic be structured satisfy this user story?
- How should the code be broken up and organized, and where should the different parts live?
- When and where will users run into errors, and how should the app respond to them?
- What should be tested and how?
- What is the UI needed to satisfy this user story?

# Specifications

### User Stories

 - [x]  Users can create to do list items.
 - [x]  Users can delete unwanted to do list items.
 - [x]  Users can check items off as completed.
 - [x]  Users can rearrange to do list items.
 - [x]  Users can edit the text on existing to do list items.
 - [x]  When an error occurs, the user is notified.

### Additional

 - [x]  Backend uses Node.js and Express.
 - [x]  App persists to do list items in a database.
 - [x]  The artifact produced is properly licensed, preferably with the MIT license.

### Stretch

 - [ ]  App is deployed on Heroku.
 - [ ]  Added: Drag and Drop priorities
 - [ ]  Users can create multiple to-do lists.
 - [ ]  Users have their own account and can sign up and log in/out.
 - [x]  App is written with ES6 and compiled using babel.

## Quality Rubric

### Well formatted code

 - [ ] Code uses a linter, which can be invoked with a command (e.g. npm run lint). [50 points]
 - [ ] Running the linter on all source code files generates no linting errors. [50 points]

### Testing

 - [ ] There is a command to run tests (e.g. npm test) and it is specified in the installation and setup instructions of the README. [50 pts]
 - [ ] There are thorough tests for all functionality involved in interacting with the database. [50 pts]

### Clear and useful README

 - [x] Repository includes a README file with installation and setup instructions. [25 points]
 - [ ] Repository includes a README file with usage instructions and at least one example use case. [25 points]

### Proper dependency management

 - [x] There is a command to install dependencies (e.g. npm install) and it is specified in the installation and setup instructions of the README. [50 points]

### Good project management

 - [ ] Commit messages are concise and descriptive. [25 points]
 - [ ] All features are added via pull requests. [25 points]
 - [ ] Every pull request has a description summarizing the changes made. [25 points]
 - [x] Every pull request has been reviewed by at least one other person. [25 points]
