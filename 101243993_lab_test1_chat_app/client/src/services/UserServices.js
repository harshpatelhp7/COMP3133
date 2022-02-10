import axios from "axios";

const USER_BASEURL = "http://localhost:3001/users";

class UserService {
  addUser(user) {
    return axios.post(USER_BASEURL, user);
  }
  getUsers() {
    return axios.get(USER_BASEURL);
  }
  getUserByUserName(username) {
    return axios.get(USER_BASEURL + "/" + username);
  }
}

export default new UserService();
