import { linkInput } from "../utils/constants";

export default class Api {
  constructor(config) {
    this._url = config.url //baseUrl;
    this._headers = config.headers // headers;
  }

  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Произошла ошибка')
    });
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Произошла ошибка')
    });
  }

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
  //addCard(name, link) {
    //return fetch(`${this._url}/cards`, {
      //method: "POST",
      //headers: this._headers,
      //body: JSON.stringify({
        //name,
       // link,
      //}),
    //}).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  //}
  addCard(name, link) {
console.log(name, link)
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

}
