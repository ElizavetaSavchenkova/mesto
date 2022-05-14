export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector)
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  };

  getUserInfo() {
    const information = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
    }
    return information;
  };

  setUserInfo(data) {
    console.log(data)
    this._profileName.textContent = data.titleInput;
    this._profileDescription.textContent = data.subtitleInput;
    console.log(data.subtitleInput)
  };

  setAvatar(data) {
    this._profileAvatar.src = data;
  }
};
