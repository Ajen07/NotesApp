import {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import express from "express";

const router = express.Router();

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

export default router;
