import mongoose from 'mongoose';

const enrolSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    courses: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        unique: true
      }
    ],
    isApproved: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Enrolment = mongoose.model('Enrolment', enrolSchema);

export default Enrolment;
