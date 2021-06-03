import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import Student from '../models/studentModel.js';
import Enrolment from '../models/enrolModel.js';
import Semester from '../models/semesterModel.js';
import Department from '../models/departmentModel.js';
import Grade from '../models/gradeModel.js';

const enrolValidations = [
  check('courses', 'You can submit up to 5 courses only.').isArray({
    min: 1,
    max: 5
  })
];

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

  // Get all the subjects <= student's level from his departement
  const depart = await Department.findById(student.major);
  const stdLvlSubs = depart.subjects.filter((s) => s.level <= student.level);

  // Get student's passed subjects.
  const stdPassedGrades = await Grade.find({
    student: student._id,
    percent: { $gte: 60 }
  }).populate('course', 'subject');
  let stdPassedSubs = [];
  stdPassedGrades.forEach((g) => {
    stdPassedSubs.push(g.course.subject._id.toString());
  });

  // Get student's new & failed subjects
  let stdNewSubs = stdLvlSubs;
  if (stdPassedSubs.length > 0) {
    stdNewSubs = stdLvlSubs.filter(
      (s) => stdPassedSubs.indexOf(s.subject.toString()) < 0
    );
  }

  const stdNewSubsIds = stdNewSubs.map((s) => s.subject);

  // Get current semester's courses
  const currentSem = await Semester.findOne({ isEnrollAvail: true }).populate({
    path: 'courses',
    select: 'subject instructor',
    populate: { path: 'subject', select: 'code title credit' }
  });
  if (!currentSem) {
    res.status(403);
    throw new Error('Enrollment is not available.');
  }

  // select the suitable courses for the student
  let suitableCourses = currentSem.courses.filter(
    (c) => stdNewSubsIds.indexOf(c.subject._id) >= 0
  );
  suitableCourses = suitableCourses.map((c) => {
    return {
      _id: c._id,
      code: c.subject.code,
      title: c.subject.title,
      credit: c.subject.credit,
      type: stdNewSubs.find(
        (ns) => ns.subject.toString() === c.subject._id.toString()
      ).type,
      instructor: c.instructor,
      selected: false
    };
  });

  // Get the student enrolment
  const enrol = await Enrolment.findOne({
    student: student._id,
    isActive: true
  }).populate('courses', 'subject');

  if (enrol) {
    const selectedCourses = enrol.courses.map((c) => c._id);
    suitableCourses = suitableCourses.map((c) => {
      return {
        ...c,
        selected: selectedCourses.indexOf(c._id) >= 0
      };
    });
  }

  res.json(suitableCourses);
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
