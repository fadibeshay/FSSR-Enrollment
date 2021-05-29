import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Student from '../models/studentModel';

// @desc   Create student
// @route  POST /api/students
// @acess  Private/Admin
const createStudent = asyncHandler(async (req, res) => {
  const {
    fullNameEn,
    fullNameAr,
    nid,
    birthday,
    gender,
    militaryStatus,
    photo,
    degree,
    gradYear,
    address,
    phoneNumber,
    email,
    department,
    password
  } = req.body;

  const user = new user({
    name: fullNameEn.split(' ')[0],
    email,
    password,
    role: 'student'
  });

  const createdUesr = await user.save();
});

export { createStudent };
