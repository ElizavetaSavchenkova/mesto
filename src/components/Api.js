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
      return Promise.reject('Ошибка: Произошла ошибка при получении информации о пользователе')
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
      return Promise.reject('Ошибка: Произошла ошибка при получении карточек с сервера')
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
      return Promise.reject('Ошибка: Произошла ошибка при изменении данных профиля')
    });
  }

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
      return Promise.reject('Ошибка: Произошла ошибка при добавлении новой карточки')
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
        return Promise.reject('Ошибка: Произошла ошибка при постановке "Нравится"')
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
        return Promise.reject('Ошибка: Произошла ошибка при удалении "Нравится"')
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject('Ошибка: Не удалось удалить карточку')
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
      return Promise.reject('Ошибка: Произошла ошибка при изменении аватара')
    });
  }
}


