import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import subjects from './data/subjects.js';
import departs from './data/departs.js';
import users from './data/users.js';
import students from './data/students.js';
import Subject from './models/subjectModel.js';
import Department from './models/departmentModel.js';
import User from './models/userModel.js';
import Student from './models/studentModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Subject.deleteMany();
    await Department.deleteMany();
    await User.deleteMany();
    await Student.deleteMany();

    // Insert subjects
    const subjects1 = subjects.filter((s) => s.prerequisite === null);
    let subjects2 = subjects.filter((s) => s.prerequisite !== null);
    const insertedSubs1 = await Subject.insertMany(subjects1);
    subjects2 = subjects2.map((s) => {
      return {
        ...s,
        prerequisite: insertedSubs1.find((is) => is.code === s.prerequisite)._id
      };
    });
    const insertedSubs2 = await Subject.insertMany(subjects2);
    const insertedSubs = insertedSubs1.concat(insertedSubs2);

    // Insert departments
    departs[0].subjects = departs[0].subjects.map((s) => {
      return {
        ...s,
        subject: insertedSubs.find((is) => is.code === s.code)._id
      };
    });
    const insertedDeparts = await Department.insertMany(departs);

    // Insert Students
    const insertedUsers = await User.insertMany(users);
    const sampleStudents = students.map((s, i) => {
      return {
        ...s,
        user: insertedUsers[i + 1],
        major: insertedDeparts.find((d) => d.name === s.major)._id
      };
    });
    await Student.insertMany(sampleStudents);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroytData = async () => {
  try {
    await Subject.deleteMany();
    await User.deleteMany();
    await Student.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroytData();
} else {
  importData();
}
