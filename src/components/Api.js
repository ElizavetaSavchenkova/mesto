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
  addCard(data) {
    console.log(data)
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

}

  //return fetch(`${this._baseUrl}/users/me`, {
    //headers: this._headers
 //})
  //GET https://nomoreparties.co/v1/cohortId/users/me

  //addTask(data){
    //return fetch(this._url, {
      //method: 'POST',
      //headers: this._headers,
      //body:JSON.stringify(data)
    //}).then((res) => {
      //if (res.ok) {
        //return res.json()
      //}
      //return Promise.reject('Произошла ошибка')
    //});
  //}
//}

//Загрузка информации о пользователе с сервера

//getProfileInfo
//return fetch(
  //`${this._url}users/me`,
  //{
   // headers: this._headers
  //}
//)

//получить карточки
//getInitialCards() { // получить карточки метотд GET
  //return fetch(
    //`${this._url}cards`,
    //{
     //headers: this._headers
    //}
  //)
   //.then(onError)
//}

//setUserInfo(name, about) { // запрос на изменение данных пользователя метод PATCH
  //return fetch(
    //`${this._url}users/me`,
    //{
      //method: 'PATCH',
      //headers: this._headers,
      //body: JSON.stringify({
        //name,
        //about,
      //})
    //})
    //.then(onError)
//}

//createCard(card) { // создать карточку метотд POST
  //return fetch(
    //`${this._url}cards`,
    //{
      //method: 'POST',
      //headers: this._headers,
      //body: JSON.stringify({
       // name: card.name,
       // link: card.link,
      //})
    //})
    //.then(onError)
//}

//deleteCard(id) { // удалить карточку метотд DELETE
  //return fetch(
   // `${this._url}cards/${id}`,
    //{
     // method: 'DELETE',
     // headers: this._headers,
    //})
    //.then(onError)
//}

//deleteLike(id) { // удалить карточку метотд DELETE
  //return fetch(
    //`${this._url}cards/${id}/likes`,
    //{
      //method: 'DELETE',
      //headers: this._headers,
    //})
    //.then(onError)
//}

//addLike(id) { // удалить карточку метотд DELETE
  //return fetch(
   // `${this._url}cards/${id}/likes`,
   //{
     // method: 'PUT',
     // headers: this._headers,
    //})
    //.then(onError)
//}

//setUserAvatar(avatar) { // запрос на изменение аватара пользователя, метод PATCH
  //return fetch(
    //`${this._url}users/me/avatar`,
    //{
     // method: 'PATCH',
     // headers: this._headers,
     // body: JSON.stringify({
     //   avatar
     //}),
    //})
   //.then(onError)
//}
//setLike(card) {
      //return fetch(`${this._url}/cards/likes/${card._id}`, {
         // method: 'PUT',
          //headers: this._headers
      //})
          //.then(this._checkData);
  //}
