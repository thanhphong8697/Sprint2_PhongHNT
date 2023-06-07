import request from "../request"

const getUserDetail = () => {
  const token = localStorage.getItem("token");
  return request.get("/user/detail", {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

const updateUserDetail = (user) => {
  const token = localStorage.getItem("token");
  return request.post(`/user/update`, {...user}, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
};

const userService = {
    getUserDetail,
    updateUserDetail
}

export default userService