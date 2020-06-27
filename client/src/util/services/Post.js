import { Api } from '../../util';

export default new class Post {
    getPosts () {
        return Api.get('/posts');
    }
}