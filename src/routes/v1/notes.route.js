import express from 'express';
import Note from '../../models/note.js';

const router = express.Router();

// POST endpoint to create a new note
router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const createdBy = '657e9f32661ae6b5dae7e20d'; // For testing

    const newNote = await Note.create({ title, content, createdBy });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in POST /notes:", error);
    next(error);
  }
});

// GET endpoint to fetch all notes
router.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in GET /notes:", error);
    next(error);
  }
});

// PATCH endpoint to update an existing note
router.patch('/:noteId', async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in PATCH /notes/:noteId:", error);
    next(error);
  }
});

// DELETE endpoint to delete a note
router.delete('/:noteId', async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note successfully deleted' });
  } catch (error) {
    console.error("Error in DELETE /notes/:noteId:", error);
    next(error);
  }
});

export default router;