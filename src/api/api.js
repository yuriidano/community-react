import { retry } from "@reduxjs/toolkit/query";
import axios from "axios";


let instanceKey = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '9d3c2c13-9a3c-426a-9da9-73356b20f629'
    }
});


let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
});


export let usersApi = {
    getUsers(pageSize, currentPage) {
        return instance.get(`/users?count=${pageSize}&page=${currentPage}`)
            .then((response) => {
                return response.data;
            })
    }
};

export let followApi = {
    followPost(userId) {
        return instanceKey.post(`follow/${userId}`, {},)
            .then((response) => {
                return response.data;
            })
    },

    followDelete(userId) {
        return instanceKey.delete(`follow/${userId}`)
            .then((response) => {
                return response.data;
            })
    }
};

export let authApi = {
    authMe() {
        return instance.get('auth/me')
        .then((response) => response.data)
    },

    login(email, password, rememberMe) {
        return (
            instanceKey.post('auth/login', {email, password, rememberMe})
                .then(response => {return response.data})
        )   
    },
    logout() {
        return (
            instanceKey.delete('auth/login')
                .then(response => {return response.data})
        )   
    },
}

export let profileApi = {
    getProfileId(userId) {
        return instance.get(`profile/${userId}`)
            .then((response) => response.data)
    },
    
    getUserStatus(userId) {
        return (
            instance.get(`profile/status/${userId}`)
                .then(response => response.data)
        )
    },

    updateUserStatus(status) {
        return (
            instanceKey.put('profile/status', {status})
                .then(response => response.data)
        )
    }
}



let instanceTest = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    'headers': {
        'API-KEY': '05f184ea-0f3b-4931-ad90-59f01c0f5749'
    }
})


export const musicApi = {
    getMusic(pageSize = 2, currentPage = 1) {
        return (
            instanceTest.get(`users?count=${pageSize}&page=${currentPage}`)
                .then(response => response.data)
        )
    }
};


