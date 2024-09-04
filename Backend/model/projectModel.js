import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reason: { type: String, required: true },
  type: { type: String, required: true },
  division: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, required: true },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
