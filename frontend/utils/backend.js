import axios from 'axios'

// Function to get usertoken from localStorage and put it into a header
// Needs to be a function because on the JWT lesson, the userToken was not changing
// unless the browser was refreshed

function getHeader(){
    // let authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
}

/* -----------------------------------------------
                api/users routes
-------------------------------------------------*/
export async function signUp(user) {
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    return data
}



/* -----------------------------------------------
                api/posts routes
-------------------------------------------------*/
export async function getPosts() {
    const { data } = await axios.get(`api/posts/`)
    return data
}

export async function createPost(post) {
    let authHeader = getHeader()
    const { data } = await axios.post('api/posts', post, authHeader)
    return data
}

export async function updatePost(post, id) {
    let authHeader = getHeader()
    const { data } = await axios.put(`api/posts/${id}`, post, authHeader)
    return data
}

export async function deletePost(id) {
    let authHeader = getHeader()
    const { data } = await axios.delete(`api/posts/${id}`, authHeader)
    return data
}


/* -----------------------------------------------
                api/comments routes
-------------------------------------------------*/
export async function getComments(postId) {
    const { data } = await axios.get(`api/comments/${postId}`)
    return data
}

export async function createComment(comment) {
    let authHeader = getHeader()
    const { data } = await axios.post('api/comments', comment, authHeader)
    return data
}

export async function updateComment(comment, id) {
    let authHeader = getHeader()
    const { data } = await axios.put(`api/comments/${id}`, comment, authHeader)
    return data
}

export async function deleteComment(id) {
    let authHeader = getHeader()
    const { data } = await axios.delete(`api/comments/${id}`, authHeader)
    return data
}