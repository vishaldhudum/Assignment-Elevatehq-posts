import { configureStore } from "@reduxjs/toolkit";
import forumReducer from "./redux/forum";

export default configureStore({
  reducer: {
    forum: forumReducer,
  },
});
