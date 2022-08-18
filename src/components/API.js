export default class Api {
    constructor({ host, token }) {
        this._host = host;
        this._token = token;
    }

    getCards() {
        return fetch(`${this._host}/cards`, {
            headers: this._token
        })
            .then(this._checkResolve);
    }
    
    getUserInfoFromServer() {
        return fetch(`${this._host}/users/me`, {
            headers: this._token,
            body: JSON.stringify(),
        })
            .then(this._checkResolve);
    }

    _checkResolve(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ай-яй-яй-яй! А кто это сделал?!: ${res.status}`);
    }

    patchUserAvatarToServer(data) {
        return fetch(`${this._host}/users/me/avatar`, {
            method: "PATCH",
            headers: this._token,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        })
            .then(this._checkResolve);
    }

    patchUserInfoToServer(data) {
        return fetch(`${this._host}/users/me`, {
            method: "PATCH",
            headers: this._token,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        })
            .then(this._checkResolve);
    }

    postCard(card) {
        return fetch(`${this._host}/cards`, {
            method: "POST",
            headers: this._token,
            body: JSON.stringify(card),
        })
            .then(this._checkResolve);            
    }

    deleteCard(id) {
        return fetch(`${this._host}/cards/${id}`, {
            method: "DELETE",
            headers: this._token,
        })
            .then(this._checkResolve);
    }

    putLike(id) {
        return fetch(`${this._host}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._token,
        })
            .then(this._checkResolve);
    }

    deleteLike(id) {
        return fetch(`${this._host}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._token,
        })
            .then(this._checkResolve);
    }
}