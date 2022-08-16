export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResolve(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ай-яй-яй-яй! А кто это сделал?!: ${res.status}`);
    }

    patchUserAvatarToServer(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        })
            .then(this._checkResolve);
    }

    getUserInfoFromServer() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            body: JSON.stringify(),
        })
            .then(this._checkResolve);
    }

    patchUserInfoToServer(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        })
            .then(this._checkResolve);
    }

    getCards() {
        return fetch(`${this._url}/cards`, { headers: this._headers })
            .then(this._checkResolve);
    }

    postCard(card) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(card),
        })
            .then(this._checkResolve);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResolve);
    }

    putLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(this._checkResolve);
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResolve);
    }    
}