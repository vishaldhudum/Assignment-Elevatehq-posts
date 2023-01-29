import { createSlice } from "@reduxjs/toolkit";

export const forumSlice = createSlice({
    name: "forum",
    initialState: {
        posts: [],
        searchedPosts: [],
        users: [],
    },
    reducers: {
        setPostsAndUsers: (state, action) => {
            state.posts = action.payload.posts;
            state.users = action.payload.users;
        },
        setSearchedPosts: (state, action) => {
            state.searchedPosts = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setPostsAndUsers, setSearchedPosts } = forumSlice.actions;

export default forumSlice.reducer;
