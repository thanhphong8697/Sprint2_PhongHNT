import request from "../request"

const login = (value)=>{
    return request.post('/login', { ...value })
}

const changePassword = (value)=>{
    const token = localStorage.getItem('token')
    return request.put('/change-password',{ ...value }, {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    })
}

const forgotPassword = (value)=>{
    return request.post('/forgot-password', { ...value })
}

const checkOtp = (value)=>{
    return request.put('/check-otp', { ...value } )
}

const resetPassword = (value)=>{
    return request.put('/reset-password',{ ...value })
}

const loginService = {
    login,
    changePassword,
    forgotPassword,
    checkOtp,
    resetPassword
}
export default loginService