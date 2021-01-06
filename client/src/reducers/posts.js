//reducers are functions, it is equal to the function that accepts the state and action
import { FETCH_ALL, UPDATE, DELETE, CREATE } from "../constants/actionTypes";
//used for index.js
export default (posts = [], action) => {
  switch (action.type) {
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE:
      /*like button basically the same as update so not needed here*/
      return posts.map((post) =>
        (post._id === action.payload._id ? action.payload : post
      )); /*mapping over an array and displaying the change made*/

    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload]; //seperate new posts and brings in a new post from payload
    default:
      return posts;
  }
};
