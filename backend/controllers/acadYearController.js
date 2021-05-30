import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import AcadYear from '../models/acadYearModel.js';
import Semester from '../models/semesterModel.js';

const yearValidations = [
  check('year', 'Year is required.').notEmpty(),
  check('year', 'Year format is not correct.').matches(/^\d{4}-\d{4}$/)
];

const semesterValidations = [
  check('name', 'Semester should be either first, second, or summer.').isIn([
    'first',
    'second',
    'summer'
  ]),
  check('startDate', 'Start Date format is not correct.').isDate(),
  check('endDate', 'End Date format is not correct.').isDate()
];

// @desc   Create an academic year
// @route  POST /api/acadYears
// @access  Private/Admin
const createAcadYear = asyncHandler(async (req, res) => {
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

  const { year } = req.body;

  const yearExists = await AcadYear.findOne({ year });
  if (yearExists) {
    res.status(400);
    throw new Error('Academic year already exists.');
  } else {
    const acadYear = new AcadYear({ year });
    const createdYear = await acadYear.save();

    res.status(201).json(createdYear);
  }
});

// @desc   Update an academic year
// @route  PUT /api/acadYears/:id
// @access  Private/Admin
const updateAcadYear = asyncHandler(async (req, res) => {
  const acadYear = await AcadYear.findById(req.params.id);
  if (!acadYear) {
    res.status(404);
    throw new Error('Academic year not found.');
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

  const { year } = req.body;

  acadYear.year = year;

  const updatedAcadYear = await acadYear.save();
  res.json(updatedAcadYear);
});

// @desc   Get a academic year by id
// @route  GET /api/acadYears/:id
// @access  Private/Admin
const getAcadYearById = asyncHandler(async (req, res) => {
  const acadYear = await AcadYear.findById(req.params.id).populate(
    'semesters -courses'
  );

  if (acadYear) {
    res.json(acadYear);
  } else {
    res.status(404);
    throw new Error('Academic year not found.');
  }
});

// @desc    Get all academic years
// @route   GET /api/acadYears
// @access  Private/Admin
const getAcadYears = asyncHandler(async (req, res) => {
  const keyword = req.query.year
    ? {
        year: {
          $regex: req.query.year,
          $options: 'i'
        }
      }
    : {};

  const acadYears = await AcadYear.find({ ...keyword }).sort('-createdAt');

  res.json(acadYears);
});

// @desc    Add a semester to department
// @route   POST /api/acadyear/:id/semesters
// @access  Private/Admin
const addSemToYear = asyncHandler(async (req, res) => {
  const acadYear = await AcadYear.findById(req.params.id).populate(
    'semesters name'
  );
  if (!acadYear) {
    res.status(404);
    throw new Error('Academic year not found.');
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
  const { name, startDate, endDate } = req.body;

  const semExists = acadYear.semesters.find((s) => s.name === name);
  if (semExists) {
    res.status(400);
    throw new Error('Semester already exists.');
  }

  const semester = new Semester({ name, startDate, endDate });
  const createdSem = await semester.save();

  acadYear.semesters.push(createdSem);
  await acadYear.save();

  res.json({ message: 'Semester added.' });
});

export {
  yearValidations,
  createAcadYear,
  updateAcadYear,
  getAcadYearById,
  getAcadYears,
  addSemToYear,
  semesterValidations
};
