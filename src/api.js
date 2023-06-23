class Api {
  constructor(token) {
    this.path = "https://api.react-learning.ru/v2/group-12";
    this.token = token;
  }
  setHeaders(isCT = false, noToken = false) {
    const headerObj = {
      Authorization: `Bearer ${this.token}`,
    };
    if (isCT) {
      headerObj["Content-Type"] = "application/json";
    }
    if (noToken) {
      delete headerObj["Authorization"];
    }
    return headerObj;
  }
  setBody(body) {
    return JSON.stringify(body);
  }
  getAllCards() {
    return fetch(`${this.path}/posts`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  addCard(body) {
    return fetch(`${this.path}/posts`, {
      method: "POST",
      headers: this.setHeaders(true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
  getSingleCard(cardId) {
    return fetch(`${this.path}/posts/${cardId}`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  updSingleCard(postId, body) {
    console.log(postId, body);
    return fetch(`${this.path}/posts/${postId}`, {
      method: "PATCH",
      headers: this.setHeaders(true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
  delSingleCard(cardId) {
    return fetch(`${this.path}/posts/${cardId}`, {
      method: "DELETE",
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  setLike(cardId, isLike) {
    return fetch(`${this.path}/posts/likes/${cardId}`, {
      method: isLike ? "PUT" : "DELETE",
      headers: this.setHeaders(true),
    }).then((res) => res.json());
  }
  reg(body) {
    return fetch(`${this.path}/signup`, {
      method: "POST",
      headers: this.setHeaders(true, true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
  auth(body) {
    return fetch(`${this.path}/signin`, {
      method: "POST",
      headers: this.setHeaders(true, true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
  // getProfile() {
  //     return fetch(`${this.path}/users/me`, {
  //         headers: this.setHeaders()
  //     }).then(res => res.json())
  // }

  // updProfile(body, updImg = false) {
  //     return fetch(`${this.path}/users/me/${updImg ? "avatar" : ""}`, {
  //         method: "PATCH",
  //         headers: this.setHeaders(true),
  //         body: this.setBody(body)
  //     }).then(res => res.json())
  // }
}
export default Api;
