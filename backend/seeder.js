import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import students from './data/students.js';
import User from './models/userModel.js';
import Student from './models/studentModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Student.deleteMany();

    const createdUsers = await User.insertMany(users);

    const sampleStudents = students.map((s, i) => {
      return { ...s, user: createdUsers[i + 1] };
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
