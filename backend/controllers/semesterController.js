import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import Semester from '../models/semesterModel.js';
import Course from '../models/courseModel.js';
import Subject from '../models/subjectModel.js';

const courseValidations = [
  check('subjectCode', 'Subject is required.').notEmpty(),
  check('instructor', 'Instructor is required.').notEmpty()
];

// @desc   Get a semester by id
// @route  GET /api/semesters/:id
// @access  Private/Admin
const getSemById = asyncHandler(async (req, res) => {
  const semester = await Semester.findById(req.params.id)
    .populate({
      path: 'courses',
      select: 'subject instructor',
      populate: {
        path: 'subject',
        select: 'code title'
      }
    })
    .populate('acadYear', 'year');

  if (semester) {
    res.json(semester);
  } else {
    res.status(404);
    throw new Error('Semester not found.');
  }
});

// @desc   Update a semester
// @route  PUT /api/semesters/:id
// @access  Private/Admin
const updateSem = asyncHandler(async (req, res) => {
  const semester = await Semester.findById(req.params.id);

  if (!semester) {
    res.status(404);
    throw new Error('Semester not found.');
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

  const { startDate, endDate, isEnrollAvail } = req.body;

  semester.startDate = startDate;
  semester.endDate = endDate;
  if (typeof isEnrollAvail === 'boolean')
    semester.isEnrollAvail = isEnrollAvail;

  const updatedSem = await semester.save();
  res.json(updatedSem);
});

// @desc    Add a course to semester
// @route   POST /api/semesters/:id/courses
// @access  Private/Admin
const addCourseToSem = asyncHandler(async (req, res) => {
  const semester = await Semester.findById(req.params.id).populate(
    'courses',
    'subject'
  );

  if (!semester) {
    res.status(404);
    throw new Error('Semester not found.');
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

  const subject = await Subject.findOne({ code: subjectCode });
  if (!subject) {
    res.status(404);
    throw new Error('Subject not found.');
  }

  const subjectExists = semester.courses.find(
    (c) => c.subject.toString() === subject._id.toString()
  );
  if (subjectExists) {
    res.status(400);
    throw new Error('Subject already added before to this semester.');
  }

  const course = new Course({
    subject: subject._id,
    instructor,
    semester: semester._id
  });
  const createdCourse = await course.save();

  semester.courses.push(createdCourse);
  await semester.save();

  res.json(createdCourse);
});

export { courseValidations, getSemById, updateSem, addCourseToSem };
