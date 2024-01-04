'use client';
import express from 'express';
import notesController from '../../controllers/notes.controller.js';
import auth from '../../middlewares/auth.js'; // Import your authentication middleware
import validate from '../../middlewares/validate.js';
import noteValidation from '../../validation/note.validation.js';

const router = express.Router();

router.use(auth()); 

router
  .route('/')
  .post(validate(noteValidation.createNote), notesController.createNote)
  .get(notesController.getNotes);

router
  .route('/:noteId')
  .patch(validate(noteValidation.updateNote), notesController.updateNote)
  .delete(validate(noteValidation.deleteNote), notesController.deleteNote);

export default router;