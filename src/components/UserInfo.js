export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector),
            this._about = document.querySelector(jobSelector),
            this._avatar = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        this._userInfo = {}
        this._userInfo.name = this._name.textContent
        this._userInfo.about = this._about.textContent
        this._userInfo.avatar = this._avatar.textContent
        return this._userInfo
    }

    setUserInfo(userObj) {
        this._name.textContent = userObj.name
        this._about.textContent = userObj.about
        this._avatar.src = userObj.avatar
    }
}