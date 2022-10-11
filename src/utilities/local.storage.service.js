class LocalStorageService{

    getRole(){
        return localStorage.getItem('role')
    }

    getToken(){
        return localStorage.getItem('token')
    }

    isAuthenticated(){
        return localStorage.getItem('authenticated')
    }

    setRole(role){
        localStorage.setItem('role', role.toLowerCase())
    }

    setToken(token){
        localStorage.setItem('token', token)
    }

    setIsAuthenticated(authenticated){
        localStorage.setItem('authenticated', authenticated)
    }

    getAllData() {

        return ({
            role: this.getRole(),
            token: this.getToken(),
            authenticated: this.isAuthenticated()

        })

    }

    clear(){
        localStorage.clear();
    }
}

export default new LocalStorageService();