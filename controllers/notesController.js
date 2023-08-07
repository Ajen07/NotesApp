import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Note from "../models/Note.js";
import checkPermission from "../utils/checkPermission.js";

const getAllNotes = async (req, res) => {
  const { search,page} = req.query;
  const queryOptions = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryOptions.title = { $regex: search, $options: "i" };
  }
  const limit = 6;
  const skip = (Number(page) - 1) * limit;
  const result = Note.find(queryOptions).skip(skip).limit(limit);
  const notes = await result;
  const totalNotes = await Note.countDocuments(queryOptions);
  const numofPages = Math.ceil(totalNotes / limit);

  res.status(StatusCodes.OK).json({ notes, totalNotes, numofPages });
};
const getSingleNote = async (req, res) => {
  console.log("single note");
};
const updateNote = async (req, res) => {
  const { id: noteId } = req.params;
  const { title, body } = req.body;
  const note = await Note.findOne({ _id: noteId });
  if (!note) {
    throw new NotFoundError(`No Note with id ${noteId}`);
  }
  if (!title) {
    throw new BadRequestError("Please provide the title of the note");
  }
  //check permission
  checkPermission(req.user.userId, note.createdBy);
  const alreadyExists = await Note.findOne({
    title,
    createdBy: req.user.userId,
    _id: { $not: { $eq: noteId } },
  });
  if (alreadyExists) {
    throw new BadRequestError(`A note named ${title} already exists`);
  }
  note.title = title;
  note.body = body;
  await note.save();
  res.status(StatusCodes.CREATED).json({ msg: "Successfully Updated !!!" });
};
const createNote = async (req, res) => {
  const { title, body } = req.body;
  if (!title) {
    throw new BadRequestError("Please provide the title of the note");
  }
  const noteAlreadyExists = await Note.findOne({
    title: { $regex: title, $options: "i" },
    createdBy: req.user.userId,
  });
  if (noteAlreadyExists) {
    throw new BadRequestError(`A note named ${title} already exists`);
  }
  const note = await Note.create({ title, body, createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ msg: "Successfull !!!" });
};
const deleteNote = async (req, res) => {
  const { id: noteId } = req.params;
  const note = await Note.findOne({ _id: noteId });
  if (!note) {
    throw new NotFoundError(`No note with id ${noteId}`);
  }
  checkPermission(req.user.userId, note.createdBy);
  const deletedJob = await Note.findOneAndDelete({ _id: noteId });
  res.status(StatusCodes.OK).json({ msg: "Successfully deleted" });
};

export { getAllNotes, getSingleNote, updateNote, createNote, deleteNote };
