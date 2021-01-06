import { FETCH_ALL, UPDATE, DELETE, CREATE } from "../constants/actionTypes"; 
import * as api from "../api";

// action Creators, functions that rerurn an action
//working with async data
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });  /*loads (fetches) post action*/
  } catch (error) {
    
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });  /*create post action*/
  } catch (error) {
    
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); /*returning updated post*/

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);       /*delete post action*/

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);   /*like post action*/

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {

  }
};
