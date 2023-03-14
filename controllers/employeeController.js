const { Employee, Student } = require("../models");
const mongoose = require("mongoose");
// const fastcsv = require("fast-csv");

const fs = require("fs");

//For registering employee
module.exports.register = async function (req, res) {
  //*NOTE:all prechecks are done in middleware

  const { name, email, password } = req.body;

  //create user in DB
  try {
    const newEmployee = await Employee.create({
      name,
      email,
      password,
    });
    //if cannot create in db
    if (!newEmployee) {
      req.flash("error", "cannot register user , please try again");
      return res.redirect("/signup");
    }

    //else redirect to employee view page
    req.flash("success", "Registration success , please login to continue");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "please try again");
    console.error("error while registering employee", err);
    return res.redirect("back");
  }
};

//creating as session and logging in , as authentication is done by passport
module.exports.login = async function (req, res) {
  req.flash("success", "Logged in successfully");

  return res.redirect(`/employee/dashboard`);
};

//destroying sesion and logginout
module.exports.logout = function (req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    return res.redirect("/signup");
  });
};

//renders employee dashboard
module.exports.viewDashboard = async function (req, res) {
  try {
    // populate all employees
    const students = await Student.find({}).sort({ createdAt: -1 });
    return res.render("studentDashboard", {
      students: students,
    });
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error(err);
    return res.end();
  }
};
module.exports.downloadCSV = async function (req, res) {
  try {
    const studentDetails = await Student.find({}).populate("interviews");
    const students = [...studentDetails];
    // console.log(students);
    let data = "";
    let no = 1;
    let csv =
      "S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result";

    for (let student of students) {
      data =
        no +
        "," +
        student.name +
        "," +
        student.email +
        "," +
        student.college +
        "," +
        student.placement +
        "," +
        student.phone +
        "," +
        student.batch +
        "," +
        student.dsa +
        "," +
        student.webd +
        "," +
        student.react;

      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          data +=
            "," +
            interview.company +
            "," +
            interview.date +
            "," +
            interview.result +
            "\n" +
            ",,,,,,,,,";
        }
      }
      no++;
      if (student.interviews.length > 1) {
        data = data.substring(0, data.length - 9).trimEnd();
      }
      csv += "\n" + data;
    }

    fs.writeFile("reports/student_details.csv", csv, function (error, data) {
      if (error) {
        console.log(error);
        req.flash("error", "please check if file is open elseware");
        return res.redirect("back");
      }
    });
    // req.flash("success", "report downloaded in report folder");
    // return res.redirect("back");
    return res.download("reports/student_details.csv");
  } catch (error) {
    console.log(`Error in downloading file: ${error}`);
    return res.redirect("back");
  }
};
