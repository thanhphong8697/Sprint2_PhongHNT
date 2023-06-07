import request from "../request"

const pay = ({amount}) => {
    const token = localStorage.getItem('token')
    return request.post(`/api/payment/create_payment`, {amount}, {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    })
}

const sendEmail = (paymentInfo) => {
    return request.post(`/api/payment/send-email`, {...paymentInfo})
}

const paymentService = {
    pay,
    sendEmail
}

export default paymentService