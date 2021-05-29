import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import Department from '../models/departmentModel.js';
import Subject from '../models/subjectModel.js';

const departValidations = [
  check('name', 'Department name is required.').notEmpty()
];

// @desc   Create a department
// @route  POST /api/departments
// @access  Private/Admin
const createDepart = asyncHandler(async (req, res) => {
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

  const { name } = req.body;

  const departExists = await Department.findOne({ name });
  if (departExists) {
    res.status(400);
    throw new Error('Department already exists.');
  }

  const department = new Department({ name });
  const createdDepart = await department.save();

  res.status(201).json(createdDepart);
});

// @desc   Get a department by id
// @route  GET /api/departments
// @access  Private/Admin
const getDepartById = asyncHandler(async (req, res) => {
  const depart = await Department.findById(req.params.id)
    .populate('generalSubjects', 'code title')
    .populate('majorSubjects')
    .populate('electiveSubjects')
    .populate('minorSubjects');

  if (depart) {
    res.json(depart);
  } else {
    res.status(404);
    throw new Error('Department not found.');
  }
});

// @desc   Update a department
// @route  PUT /api/departments/:id
// @access  Private/Admin
const updateDepart = asyncHandler(async (req, res) => {
  const depart = await Department.findById(req.params.id);
  if (!depart) {
    res.status(404);
    throw new Error('Department not found.');
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

  const { name } = req.body;

  depart.name = name;

  const updatedDepart = await depart.save();
  res.json(updatedDepart);
});

// @desc   Delete a department
// @route  DELETE /api/departments/:id
// @access  Private/Admin
const deleteDepart = asyncHandler(async (req, res) => {
  const depart = await Department.findById(req.params.id);

  if (depart) {
    await depart.remove();
    res.json({ message: 'Department removed.' });
  } else {
    res.status(404);
    throw new Error('Department not found.');
  }
});

// @desc   Add a subject to department
// @route  PUT /api/departments/:id/subjects
// @access  Private/Admin
const addSubToDepart = asyncHandler(async (req, res) => {
  const { code, type } = req.body;

  const depart = await Department.findById(req.params.id);
  if (!depart) {
    res.status(404);
    throw new Error('Department not found.');
  }

  const subject = await Subject.findOne({ code });
  if (!subject) {
    res.status(404);
    throw new Error('Subject not found.');
  }

  switch (type) {
    case 'general':
      if (!depart.generalSubjects.find((s) => s._id === subject._id))
        depart.generalSubjects.push(subject._id);
      break;
    case 'major':
      if (!depart.majorSubjects.find((s) => s._id === subject._id))
        depart.majorSubjects.push(subject._id);
      break;
    case 'elective':
      if (!depart.electiveSubjects.find((s) => s._id === subject._id))
        depart.electiveSubjects.push(subject._id);
      break;
    case 'minor':
      if (!depart.minorSubjects.find((s) => s._id === subject._id))
        depart.minorSubjects.push(subject._id);
      break;
    default:
      res.status(400);
      throw new Error('Subject type is not correct.');
  }

  await depart.save();
  res.json({ message: 'Subject added.' });
});

// @desc   Remove a subject from department
// @route  DELETE /api/departments/:id/subjects
// @access  Private/Admin
const removeSubFromDepart = asyncHandler(async (req, res) => {
  const { _id, type } = req.body;

  const depart = await Department.findById(req.params.id);
  if (!depart) {
    res.status(404);
    throw new Error('Department not found.');
  }

  const subject = await Subject.findById(_id);
  if (!subject) {
    res.status(404);
    throw new Error('Subject not found.');
  }

  let subjects;
  switch (type) {
    case 'general':
      subjects = depart.generalSubjects.filter(
        (s) => s._id.toString() !== subject._id.toString()
      );
      depart.generalSubjects = subjects;
      break;
    case 'major':
      subjects = depart.majorSubjects.filter(
        (s) => s._id.toString() !== subject._id.toString()
      );
      depart.majorSubjects = subjects;
      break;
    case 'elective':
      subjects = depart.electiveSubjects.filter(
        (s) => s._id.toString() !== subject._id.toString()
      );
      depart.electiveSubjects = subjects;
      break;
    case 'minor':
      subjects = depart.minorSubjects.filter(
        (s) => s._id.toString() !== subject._id.toString()
      );
      depart.minorSubjects = subjects;
      break;
    default:
      res.status(400);
      throw new Error('Subject type is not correct.');
  }

  await depart.save();
  res.json({ message: 'Subject removed.' });
});

// @desc   Get all departments
// @route  GET /api/departments
// @access  Private/Admin
const getDeparts = asyncHandler(async (req, res) => {
  const departs = await Department.find({}).select('name');

  res.json(departs);
});

export {
  departValidations,
  createDepart,
  getDepartById,
  updateDepart,
  deleteDepart,
  addSubToDepart,
  removeSubFromDepart,
  getDeparts
};
