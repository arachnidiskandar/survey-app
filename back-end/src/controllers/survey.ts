import { Request, Response } from 'express';
import mongoose from 'mongoose';

import logging from '@config/logging';
import Survey from '@models/survey';

const NAMESPACE = 'Survey Controller';

const getAllSurveys = (req: Request, res: Response): void => {
  Survey.find()
    .exec()
    .then((results) => res.status(200).json({ surveys: results }))
    .catch((error) => res.status(500).json({ message: error.message, error }));
};

const createSurvey = (req: Request, res: Response) => {
  const { title, coordinator, questions } = req.body;

  const survey = new Survey({
    _id: new mongoose.Types.ObjectId(),
    title,
    coordinator,
    questions,
  });

  return survey
    .save()
    .then((result) => res.status(201).json({ survey: result }))
    .catch((error) => res.status(500).json({ message: error.message, error }));
};
export default { getAllSurveys, createSurvey };
