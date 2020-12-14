import postApi from "../api/postApi"

export const CreatePost = async (body) => {
    return dispatch => {
        await postApi.createPost(body).then((response) => {
            console.log(response);
            return dispatch({type: "CREATED_POST"});
        }).catch((error) => {
            console.log(error);
        });
    }
}
export const DeletePost = async (id) => {
    return dispatch => {
        await postApi.deletePost(id).then((response) => {
            return dispatch({type: "DELETED_POST"});
        }).catch((error) => {
            console.log(error);
        });
    }
}
export const UpdatePost = async (id, body) => {
    return dispatch => {
        await postApi.updatePost(id,body).then((response) => {
            return dispatch({type: "UPDATED_POST"});
        }).catch((error) => console.log(error));
    }
}