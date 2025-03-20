import { useRef, useState } from "react";
import { updateSettings } from "../../api/userSettings";
import FormGroup from "../ui/FormGroup";
import User from "../../contexts/UserContext";
import { SERVER_BASE_URL } from "../../constants/Constants";

const UserAccountSettings = ({ userInfo }: { userInfo: User }) => {
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const { setUserInfo } = User();

  const handleUpdateUserData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdatingPassword(true);

    const photo = fileInput.current?.files?.[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    if (photo) {
      formData.append("photo", photo);
    }

    const updatedDetails = await updateSettings(formData, "data");

    if (updatedDetails) {
      setUserInfo(updatedDetails);
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
      <form className="form form-user-data" onSubmit={handleUpdateUserData}>
        <FormGroup
          label="Name"
          id="name"
          type="text"
          placeholder="John Doe"
          required
          defaultValue={userInfo.name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormGroup
          label="Email address"
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          defaultValue={userInfo.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="form__group form__photo-upload">
          <img
            className="form__user-photo"
            src={`${SERVER_BASE_URL}/img/users/${userInfo.photo}`}
            alt="User photo"
          />
          <input
            className="form__upload"
            type="file"
            accept="image/*"
            id="photo"
            ref={fileInput}
          />
          <label htmlFor="photo">Choose new photo</label>
        </div>
        <div className="form__group right">
          <button className="btn btn--small btn--green">
            {updatingPassword === true ? "Updating..." : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAccountSettings;
