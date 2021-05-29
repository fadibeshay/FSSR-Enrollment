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

  const studentExists = await Student.findOne({ nid });
  if (studentExists) {
    res.status(400);
    throw new Error('Student already exists.');
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error('Email already exists.');
  }

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
  const keyword = req.query.nid
    ? {
        nid: {
          $regex: req.query.nid
        }
      }
    : req.query.name
    ? {
        fullNameEn: {
          $regex: req.query.name,
          $options: 'i'
        }
      }
    : {};

  console.log(keyword);

  const students = await Student.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(students);
});

// @desc   Get a student by id
// @route  GET /api/students/:id
// @acess  Private/Admin
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error('Student not found.');
  }
});

// @desc   Create student
// @route  POST /api/students/:id
// @acess  Private/Admin
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  console.log(student.toObject());

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

  const user = await User.findById(student.user);
  // console.log(user.toObject());
  user.email = email;
  user.password = password;
  await user.save();

  student.fullNameEn = fullNameEn;
  student.fullNameAr = fullNameAr;
  student.nid = nid;
  student.birthday = birthday;
  student.gender = gender;
  student.militaryStatus = militaryStatus;
  student.photo = photo;
  student.degree = degree;
  student.gradYear = gradYear;
  student.address = address;
  student.phoneNumber = phoneNumber;
  student.department = department;

  await student.save();

  res.status(201).json({ ...student.toObject(), email });
});

// @desc   Delete student
// @route  DELETE /api/students/:id
// @acess  Private/Admin
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await student.remove();
    res.json({ message: 'Student removed.' });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

export {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent
};
