import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import User from '../models/userModel.js';
import Student from '../models/studentModel.js';

export const studentValidations = [
  check('fullNameEn', 'English name is required.').notEmpty(),
  check('fullNameAr', 'Arabic name is required.').notEmpty(),
  check('nid', 'National id is required.').notEmpty(),
  check('birthday', 'Birthday is required.').notEmpty(),
  check('gender', 'gender is required.').notEmpty(),
  check('militaryStatus', 'Military Status is required.').notEmpty(),
  check('photo', 'Photo is required.').notEmpty(),
  check('degree', 'Degree is required.').notEmpty(),
  check('gradYear', 'Graduation year is required.').notEmpty(),
  check('address', 'Address is required.').notEmpty(),
  check('phoneNumber', 'Phone number is required.').notEmpty(),
  check('department', 'Department is required.').notEmpty(),
  check('email', 'Email address is not valid.').isEmail(),
  check('password', 'Password should be 6 or more characters.').isLength({
    min: 6
  })
];

// @desc   Create student
// @route  POST /api/students
// @acess  Private/Admin
const createStudent = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join(' ')
    );
  }

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

  const user = new User({
    name: fullNameEn && fullNameEn.split(' ')[0],
    email,
    password,
    role: 'student'
  });

  const createdUser = await user.save();

  const student = new Student({
    user: createdUser._id,
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
    department
  });

  const createdStudent = await student.save();

  res.status(201).json({ ...createdStudent.toObject(), email });
});

// @desc   Get the last 10 created students
// @route  GET /api/students
// @acess  Private/Admin
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});
});

export { createStudent };
