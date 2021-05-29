import mongoose from 'mongoose';

const derpartmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    generalSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      }
    ],
    majorSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      }
    ],
    electiveSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      }
    ],
    minorSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      }
    ]
  },
  { timestamps: true }
);

const Department = mongoose.model('Department', derpartmentSchema);

export default Department;
