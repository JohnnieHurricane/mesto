export default class UserInfo {
    constructor({nameSelector, jobSelector}){
        this._nameSelector = nameSelector,
        this._jobSelector = jobSelector
    }

    getUserInfo() {
this._userInfo = {}
this._userInfo.name = document.querySelector(this._nameSelector).textContent
this._userInfo.job = document.querySelector(this._jobSelector).textContent
return this._userInfo
    }

    setUserInfo(userObj) {
        this._nameSelector.textContent = userObj.name
        this._jobSelector.textContent = userObj.job
    }
}