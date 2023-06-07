import request from "../request"

const findAll = (name) => {
    return request.get(`/cart-detail?customerName=${name}`)
}

const listTotalALL = (name,page) => {
    return request.get(`/cart-detail/list?page=${page?page:0}&customerName=${name}`)
}

const save = (cartDetail, name) => {
    return request.post(`/cart-detail?customerName=${name}`, {...cartDetail})
}

const remove = (id) => {
    return request.delete(`/cart-detail/${id}`)
}

const update = (id, quantity) => {
    return request.put(`cart-detail/${id}/${quantity}`)
}

const resetCount = () => {
    return request.get(`/cart-detail/log-out`)
}


const cartDetailService = {
    findAll,
    save,
    remove,
    update,
    listTotalALL,
    resetCount
}

export default cartDetailService