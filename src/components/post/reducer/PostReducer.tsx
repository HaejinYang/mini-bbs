import {PostType} from "../../types";

interface PostReducerState {
    posts: PostType[];
}

type PostReducerActionType = "STORE" | "UPDATE";

interface PostReducerAction {
    type: PostReducerActionType;
    post?: PostType;
}

const PostReducer = (state: PostReducerState, action: PostReducerAction): PostReducerState => {
    const newState: PostReducerState = {...state, posts: [...state.posts]};
    switch (action.type) {
        case "STORE":
            if (action.post) {
                newState.posts.push(action.post);
            }
            break;
        case "UPDATE":
            if (action.post) {
                const index = newState.posts.findIndex((element) => element.id === action.post?.id);
                if (index !== -1) {
                    newState.posts[index] = {...action.post};

                    localStorage.setItem('post', JSON.stringify(newState.posts));
                }
            }
            break;
        default:
            break;
    }

    return newState;
}

export default PostReducer;