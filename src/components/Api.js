export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers
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
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Произошла ошибка')
    });
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
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Произошла ошибка')
    });
  }

  addNewLikes(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject('Произошла ошибка')
      });
  }

  deleteLikes(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject('Произошла ошибка')
      });
  }

  //deleteCard(cardId) {
  ////  return fetch(`${this._url}/cards/${cardId}`, {
     // method: "DELETE",
    //  headers: this._headers,
   // }).then((res) => this._addResult(res));

  //}

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject('Произошла ошибка с картинкойййййййййййй, КАК ЖЕ ТЫ МЕНЯ ДОСТАЛА')
      });
  }

  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify
        ({ avatar }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Произошла ошибка с аватаром')
    });
  }





}


