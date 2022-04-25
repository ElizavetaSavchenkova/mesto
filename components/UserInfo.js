export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = document.querySelector(profileNameSelector)
    this._profileDescription = document.querySelector(profileDescriptionSelector);
  }

  getUserInfo() {
    const information = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent
    }
    return information;
  };

  setUserInfo(data) {
    this._profileName.textContent = data.titleInput;
    this._profileDescription.textContent = data.subtitleInput;
    console.log(data.titleInput)
  }
}
