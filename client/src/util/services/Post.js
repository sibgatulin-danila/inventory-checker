import { Api } from '../../util';

export default new class Post {
    getPosts = () => {
        return Api.get('/posts');
    }

    createPost = (text) => {
        return Api.post('/posts', {text});
    }

    deletePost = (id) => {
        return Api.post('/posts/delete', {id})
    }
}