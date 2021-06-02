import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import Student from '../models/studentModel.js';
import Enrolment from '../models/enrolModel.js';

const enrolValidations = [check('courses', 'No courses submitted.').notEmpty()];

// @desc   Create an enrolment
// @route  POST /api/enrolments
// @access  Private
const createEnrol = asyncHandler(async (req, res) => {
  if (req.user.role !== 'student') {
    res.status(403);
    throw new Error('Enrollments are only allowed for students.');
  }

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

  const { courses } = req.body;

  const userId = req.user._id;
  const student = await Student.findOne({ user: userId });

  const enrol = new Enrolment({ student: student._id, courses });
  const createdEnrol = await enrol.save();

  res.json(createdEnrol);
});

// @desc   Get logged in student active enrolment
// @route  GET /api/enrolments/my
// @access  Private
const getMyEnrol = asyncHandler(async (req, res) => {
  if (req.user.role !== 'student') {
    res.status(403);
    throw new Error('Enrollments are only allowed for students.');
  }

  const userId = req.user._id;
  const student = await Student.findOne({ user: userId });

  const enrol = await Enrolment.findOne({
    student: student._id,
    isActive: true
  }).populate({
    path: 'courses',
    select: 'subject instructor',
    populate: { path: 'subject', select: 'code title' }
  });

  if (enrol) {
    res.json(enrol);
  } else {
    res.status(404);
    throw new Error('Enrollment request not found.');
  }
});

// @desc   Update logged in student active enrolment
// @route  PUT /api/enrolments/my
// @access  Private
const updateMyEnrol = asyncHandler(async (req, res) => {
  if (req.user.role !== 'student') {
    res.status(403);
    throw new Error('Enrollments are only allowed for students.');
  }

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

  const { courses } = req.body;

  const userId = req.user._id;
  const student = await Student.findOne({ user: userId });

  const enrol = await Enrolment.findOne({
    student: student._id,
    isActive: true,
    isApproved: false
  });

  if (enrol) {
    enrol.courses = courses;
    const updatedEnrol = await enrol.save();

    res.json(updatedEnrol);
  } else {
    res.status(403);
    throw new Error('Enrollment modification is not allowed.');
  }
});

// @desc   Get an enrolment by id
// @route  GET /api/enrolments/:id
// @access  Private/Admin
const getEnrol = asyncHandler(async (req, res) => {
  const enrol = await Enrolment.findById(req.params.id)
    .populate('student', 'fullNameEn fullNameAr nid')
    .populate({
      path: 'courses',
      select: 'subject instructor',
      populate: { path: 'subject', select: 'code title' }
    });

  if (enrol) {
    res.json(enrol);
  } else {
    res.status(404);
    throw new Error('Enrollment request not found.');
  }
});

// @desc   Update enrolment
// @route  PUT /api/enrolments/:id
// @access  Private/Admin
const updateEnrol = asyncHandler(async (req, res) => {
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

  const { courses } = req.body;

  const enrol = await Enrolment.findById(req.params.id);

  if (enrol) {
    enrol.courses = courses;
    const updatedEnrol = await enrol.save();

    res.json(updatedEnrol);
  } else {
    res.status(403);
    throw new Error('Enrollment requst not found.');
  }
});

// @desc   Delete enrolment
// @route  DELETE /api/enrolments/:id
// @access  Private/Admin
const deleteEnrol = asyncHandler(async (req, res) => {
  const enrol = await Enrolment.findById(req.params.id);

  if (enrol) {
    await enrol.remove();

    res.json('Enrollment was removed.');
  } else {
    res.status(403);
    throw new Error('Enrollment requst not found.');
  }
});

export {
  enrolValidations,
  createEnrol,
  getMyEnrol,
  updateMyEnrol,
  getEnrol,
  updateEnrol,
  deleteEnrol
};
