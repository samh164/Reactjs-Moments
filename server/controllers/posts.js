import mongoose from 'mongoose';
import express from 'express';
import PostMessage from "../models/postMessage.js";

const router = express.Router();
//get posts, async action
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages); //successful
  } catch (error) {
    res.status(404).json({ message: error.message }); //client error
  }
};
//create posts, async action
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save();

    res.status(201).json(newPost); //successful
  } catch (error) {
    res.status(409).json({ message: error.message }); //client error
  }
};
//update posts function
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  //const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  
  await PostMessage.findByIdAndUpdate( id, updatedPost, {new: true});

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');

  await PostMessage.findByIdAndRemove(id);


  res.json({message: 'Post deleted sucessfully'});
}
//like post very similair to updated post as it is basically updating the post in a sense
export const likePost = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new:true});

  res.json(updatedPost);
}

export default router;