import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import Semester from '../models/semesterModel.js';
import Course from '../models/courseModel.js';
import Subject from '../models/subjectModel.js';
import Enrolment from '../models/enrolModel.js';
import Grade from '../models/gradeModel.js';

const gradesValidations = [
  check('grades', 'No grades submitted.').isArray({ min: 1 })
];
// @desc   Get a course by id
// @route  GET /api/courses/:id
// @access  Private/Admin
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate({ path: 'subject', select: 'code title' })
    .populate({
      path: 'semester',
      select: 'name acadYear',
      populate: { path: 'acadYear', select: 'year' }
    });

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found.');
  }
});

// @desc   Update a course
// @route  PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate({ path: 'subject', select: 'code title' })
    .populate({
      path: 'semester',
      select: 'name acadYear',
      populate: { path: 'acadYear', select: 'year' }
    });

  if (!course) {
    res.status(404);
    throw new Error('Course not found.');
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

  const { subjectCode, instructor } = req.body;

  const subject = await Subject.findOne({ code: subjectCode }).select(
    'code title'
  );
  if (!subject) {
    res.status(404);
    throw new Error('Subject not found.');
  }

  course.subject = subject._id;
  course.instructor = instructor;
  await course.save();

  res.json(course);
});

// @desc   Delete a course
// @route  DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    const semester = await Semester.findById(course.semester);
    const updatedCourses = semester.courses.filter(
      (c) => c._id.toString() !== course._id.toString()
    );
    semester.courses = updatedCourses;
    await semester.save();

    await course.remove();
    res.json({ message: 'Course removed.' });
  } else {
    res.status(404);
    throw new Error('Course not found.');
  }
});

// @desc   Get all students enrolled in a course
// @route  GET /api/courses/:id/students
// @access  Private/Admin
const getEnrolledStudents = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error('Course not found.');
  }

  const enrolledStudents = await Enrolment.find({ courses: course._id })
    .select('student')
    .populate('student', 'fullNameEn nid department');

  res.json(enrolledStudents);
});

// @desc   Grade all students enrolled in a course
// @route  POST /api/courses/:id/grades
// @access  Private/Admin
const gradeStudents = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error('Course not found.');
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

  const { grades } = req.body;

  (async (grades) => {
    let grade;
    for (const g of grades) {
      grade = new Grade({
        student: g.student,
        percent: g.percent,
        course: course._id
      });
      await grade.save();
    }

    const createdGrades = await Grade.find({ course: course._id })
      .select('student percent')
      .populate('student', 'fullNameEn nid department');

    res.status(201);
    res.json(createdGrades);
  })(grades);
});

// @desc   Get all students' gades
// @route  GET /api/courses/:id/grades
// @access  Private/Admin
const getGrades = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error('Course not found.');
  }

  const grades = await Grade.find({ course: course._id })
    .select('student percent')
    .populate('student', 'fullNameEn nid department');

  res.json(grades);
});

export {
  gradesValidations,
  getCourseById,
  updateCourse,
  deleteCourse,
  getEnrolledStudents,
  gradeStudents,
  getGrades
};