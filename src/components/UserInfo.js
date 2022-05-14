export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector)
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    ////
    //this._profileAvatar = document.querySelector(profileAvatarSelector );
    //this._id = userId;
  };

  getUserInfo() {
    const information = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent
    }
    return information;
  };

  setUserInfo(data) {
    console.log(data)
    this._profileName.textContent = data.titleInput;
    this._profileDescription.textContent = data.subtitleInput;
    //this._profileAvatar.src = data.avatarInput;
   // this._profileAvatar.src = data.avatarInput;
    //this._id = data.userId;
  };
};
