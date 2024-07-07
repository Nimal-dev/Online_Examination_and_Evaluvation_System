const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: String, required: true },
});

const studentAnswerSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "students", required: true },
  answers: [{ type: String, required: true }],
  marks: { type: Number, default: 0 },
});

const examSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true },
  dateOfExam: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  questions: [questionSchema],
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "teachers", required: true },
  studentAnswers: [studentAnswerSchema],
});

const exam = mongoose.model("exam", examSchema);

module.exports = { exam };
