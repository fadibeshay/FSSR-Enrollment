import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import AcadYear from '../models/acadYearModel.js';
import Semester from '../models/semesterModel.js';
import Course from '../models/courseModel.js';
import Subject from '../models/subjectModel.js';

// @desc   Get a course by id
// @route  GET /api/courses/:id
// @access  Private/Admin
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('subject', 'code title')
    .populate('semester', 'name acadYear');

  if (course) {
    const acadYear = await AcadYear.findById(course.semester.acadYear).select(
      'year'
    );
    const year = acadYear.toObject().year;

    res.json({ ...course.toObject(), year });
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
    .populate('subject', 'code title')
    .populate('semester', 'name acadYear')
    .populate('students', 'fullNameEn department');

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

  const semester = await Semester.findById(course.semester).populate(
    'courses',
    'subject'
  );

  if (subjectCode !== course.subject.code) {
    const subjectExists = semester.courses.find(
      (c) => c.subject.toString() === subject._id.toString()
    );
    if (subjectExists) {
      res.status(400);
      throw new Error('Subject already added before to this semester.');
    }
  }

  course.subject = subject._id;
  course.instructor = instructor;
  await course.save();

  res.json({ ...course.toObject(), subject: subject.toObject() });
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

export { getCourseById, updateCourse, deleteCourse };
