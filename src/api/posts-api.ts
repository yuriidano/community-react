import axios from "axios";
import { PostType } from "../types/types";


const instance = axios.create({
    baseURL: 'https://685823d721f5d3463e5742cd.mockapi.io/'
});


export const postsAPI = {
    getPosts() {
        return (
            instance.get<PostType[]>('posts')
                .then(response => response.data)
        )
    },
    addPost(post: Omit<PostType, 'id'>) {
        return (
            instance.post<PostType>(`posts`, {...post})
                .then(response => response.data)
        )
    },
    updatepost(post: PostType){
        return (
            instance.put<PostType>(`posts/${post.id}`, {...post})
            .then(response => response.data)
        )
    },
    deletePost(id: number) {
       return (
         instance.delete<PostType>(`posts/${id}`)
            .then(response => response.data)
       )
    }
}