import { Document } from 'mongoose';

enum QuestionType {
  MULTIPLE_CHOICE,
  SELECT_MULTIPLE_CHOICE,
  OPEN_TEXT,
  YES_NO,
}

interface IQuestion {
  title: string;
  questionType: QuestionType;
}

export default interface ISurvey extends Document {
  title: string;
  coordinator: any;
  questions: IQuestion[];
}
