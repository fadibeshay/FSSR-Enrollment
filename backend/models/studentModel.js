import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;
