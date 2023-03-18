import {CommentType} from "../Comment";

interface CommentState {
    comments: CommentType[];
}

interface CommentAction {
    type: CommentActionType;
    comment?: CommentType;
}

type CommentActionType = "STORE" | "UPDATE";

const CommentReducer = (state: CommentState, action: CommentAction): CommentState => {
    const newState: CommentState = {...state, comments: [...state.comments]};
    switch (action.type) {
        case "STORE":
            if (action.comment) {
                newState.comments.push(action.comment);
                localStorage.setItem('comment', JSON.stringify(newState.comments));
            }
            break;
        case "UPDATE":
            break;
        default:
            break;
    }

    return newState;
}

export default CommentReducer;