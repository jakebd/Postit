import axios from "axios"

// const axiosOptions={
//     validateStatus: function(status){
//         return true
//     },
//     withCredentials: true
// }

class authService {

    signin(loginData, callback){
        axios.post(`${import.meta.env.VITE_API_URL}/users/login`, loginData)
        .then(response => {
            switch(response.status){
                case 200:{
                    console.log(response.data.id);
                    sessionStorage.setItem("loggedin", loginData.email);
                    sessionStorage.setItem("userId", response.data.id);
                    sessionStorage.setItem("userName", response.data.name);
                    sessionStorage.setItem("userlName", response.data.lname);
                    sessionStorage.setItem("userNick", response.data.username);
                    sessionStorage.setItem("isPro", response.data.isPro);
                    callback(true);
                    break;
                }
                case 400:
                case 401:
                case 500:{
                    callback(false, response.data);
                    break;
                }
            }
            console.log(response)
        })
    }

    register(loginData, callback){
        axios.post(`${import.meta.env.VITE_API_URL}/users/register`, loginData)
                .then(response => {
                    console.log(response)
                    if(response.status == 200){
                        sessionStorage.setItem("loggedin", loginData.email)
                        sessionStorage.setItem("userId", response.data["_id"]);
                        sessionStorage.setItem("userName", loginData.name);
                        sessionStorage.setItem("userlName", loginData.lname);
                        sessionStorage.setItem("userNick", loginData.username);
                        sessionStorage.setItem("isPro", loginData.isPro);
                        callback(true);
                    }else{
                        callback(false);
                    }
                    //console.log(response.headers['x-auth-token'])
                    //localStorage.setItem('token', response.headers['x-auth-token']);
                    //can be sessionStorage as well.
                    console.log(response);
                })
    }

    isSignedIn(){
        //option chaining.
        return sessionStorage.getItem("loggedin")?.length > 0;
    }

    signInEmail(){
        return sessionStorage.getItem("loggedin");
    }

    signInId(){
        return sessionStorage.getItem("userId");
    }

    signInName(){
        return sessionStorage.getItem("userName");
    }

    signInlName(){
        return sessionStorage.getItem("userlName");
    }

    signInNick(){
        return sessionStorage.getItem("userNick");
    }

    signInIsPro(){
        return sessionStorage.getItem("isPro");
    }

    logout(callback){
        axios.post(`${import.meta.env.VITE_API_URL}/users/logout`)
        .then(response => {
            switch(response.status){
                case 204:{
                    sessionStorage.removeItem('loggedin')
                    sessionStorage.removeItem('userId')
                    sessionStorage.removeItem('userNick')
                    sessionStorage.removeItem('userName')
                    sessionStorage.removeItem('userlName')
                    sessionStorage.removeItem('isPro')
                    callback(true);
                    break;
                }
            }
        })
    }

}

export default new authService()