import axios from "axios";


let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'df7dab77-f6e8-4bf9-b5ec-611106eb801d'
    }
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
        return instance.post(`follow/${userId}`, {},)
            .then((response) => {
                return response.data;
            })
    },

    followDelete(userId) {
        return instance.delete(`follow/${userId}`)
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

    login(email, password, rememberMe, captcha = null) {
        return (
            instance.post('auth/login', {email, password, rememberMe, captcha})
                .then(response => {return response.data})
        )   
    },
    logout() {
        return (
            instance.delete('auth/login')
                .then(response => {return response.data})
        )   
    },
    captcha() {
        return (
            instance.get('security/get-captcha-url')
                .then(response => response.data)
        )
    }
}

export let profileApi = {

    getUserStatus(userId) {
        return (
            instance.get(`profile/status/${userId}`)
                .then(response => response.data)
        )
    },

    updateUserStatus(status) {
        return (
            instance.put(`profile/status`, {status})
            .then(response => response.data)
        )
    },

    getProfile(userId) {
        return(
            instance.get(`profile/${userId}`)
                .then(response => response.data)
        )
    },

    updagePhoto(filePhoto) {
        let formData = new FormData();
        formData.append('image', filePhoto)
        return (
            instance.put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data.data)
        )
    },

    updateProfile(profileData) {
        return (
            instance.put('profile', {...profileData})
                .then(response => response.data)
        )
    }
}

export const infoApi = {
    getProfileInfo(userId) {
        return(
            instance.get(`profile/${userId}`)
                .then(response => response.data)
        )
    },
}



