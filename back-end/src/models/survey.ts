import mongoose, { Schema } from 'mongoose';

import ISurvey from '@interfaces/survey';

const SurveySchema: Schema = new Schema({
  title: { type: String, required: true },
  coordinator: { type: Number, required: true },
  questions: [{ title: String, questionType: Number }],
});

export default mongoose.model<ISurvey>('Survey', SurveySchema);
