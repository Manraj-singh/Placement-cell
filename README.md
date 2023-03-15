# Placement cell app using NodeJS

## Tech Stack

_NodeJS , ExpressJS ,MongoDB , passport auth , EJS ,Bootstrap_

**Overview :**

a placement cell web app using nodejs ,expressjs, mongodb where employees can see students,interviews details and update application status

**Features :**

- store the following students details:

  - Batch
  - Student Details (including college, status: [placed, not_placed])
  - Course Scores (including DSA Final Score, WebD Final Score, React Final Score)
  - Interviews (including company name and Date)
  - Results (this is a mapping between company, and student, contains result: [PASS, FAIL, On
    Hold, Didn’t Attempt])

- Pages

  - Sign Up and Sign In only for employees
  - List of students + add new student
  - List of Interviews + form to create an interview (with date)
  - Allocate a student to an interview
  - Select an interview to view the list of all students and mark a result status from the list
    page itself

- External Jobs List:
  - a page which fetches real available jobs .
  - The API request is handled from node.js server
-
- Downloading a complete CSV of all the data with the following columns:
  - Student id, student name, student college, student status, DSA Final Score, WebD Final
    Score, React Final Score, interview date, interview company, interview student result
  - A student can have multiple entries based on the interviews she/he has given.

## Run Locally

1. Clone the project

```bash
  git clone https://github.com/Manraj-singh/Placement-cell.git
```

alternatively , download the code zip file

2. install the nodemodules from package.json :

```bash
  npm install
```

3. make sure you have Node, npm and mongoDB in your system

4. finally start it on your local server

```bash
  npm start
```

Open [http://localhost:8000](http://localhost:8000) to view it in your browser.
NOTE: PORT is defined on root index.js file .

## Folder Structure

```
.gitignore
README.md
assets
   |-- css
   |   |-- sign_in.css
   |-- js
   |   |-- script.js
configs
   |-- index.js
   |-- mongoose.js
   |-- passport-local-strategy.js
controllers
   |-- employeeController.js
   |-- index.js
   |-- interviewController.js
   |-- studentController.js
index.js
middlewares
   |-- employee.js
   |-- index.js
   |-- set-flash.js
   |-- student.js
models
   |-- employee.js
   |-- index.js
   |-- interview.js
   |-- student.js
package-lock.json
package.json
routes
   |-- employee.js
   |-- index.js
   |-- interview.js
   |-- student.js
secretKeys.js
views
   |-- companyInterviewPage.ejs
   |-- externalJobsPage.ejs
   |-- interviewDashboard.ejs
   |-- layout.ejs
   |-- partials
   |   |-- _interviewtable.ejs
   |   |-- _navbar.ejs
   |   |-- _studentTable.ejs
   |-- sign_in.ejs
   |-- studentDashboard.ejs
```

walkthrough:

- assets folder contains static files like css, js, images

- config folder contains all the configurations like mongoose /passport strategy

- controllers contains all the code which executes for a particular route .

- middlewares folder contains custom middleware like precheks before registering /login ,and Flash notification

- models folder has all the schemas defined like employee,review

- routes folder has all the routes , admin.js has routes with admin privilages

- secretkeys file has all the secret keys if any

- ejs views are written in views folder

- root index file contains the express server setup

basic flow: index.js > routes > passport authentication > middlewares > controller logic > renders ejs views in frontend
