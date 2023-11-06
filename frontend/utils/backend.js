import axios from 'axios'

/* -----------------------------------------------
                api/posts routes
-------------------------------------------------*/
export async function getPosts() {
    const { data } = await axios.get(`api/posts/`)
    return data
}

export async function createPost(post) {
    const { data } = await axios.post('api/posts', post)
    return data
}

export async function updatePost(post, id) {
    const { data } = await axios.put(`api/posts/${id}`, post)
    return data
}

export async function deletePost(id) {
    const { data } = await axios.delete(`api/posts/${id}`)
    return data
}


/* -----------------------------------------------
                api/comments routes
-------------------------------------------------*/
export async function getComments(postId) {
    const { data } = await axios.get(`api/comments/${postId}`)
    return data
}

export async function postComment(comment) {
    const { data } = await axios.post('api/comments', comment)
    return data
}

export async function updateComment(comment, id) {
    const { data } = await axios.put(`api/comments/${id}`, comment)
    return data
}

export async function deleteComment(id) {
    const { data } = await axios.delete(`api/comments/${id}`)
    return data
}