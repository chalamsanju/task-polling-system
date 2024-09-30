import React, { useState } from 'react';
import styles from './UserProfilePage.module.css';

const UserProfilePage = ({ user, pollsCreated, votingActivity }) => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: user.username,
    bio: user.bio,
    profilePicture: user.profilePicture,
  });
  const [imagePreview, setImagePreview] = useState(user.profilePicture || 'default-profile.png');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Preview the image
        setUserData({
          ...userData,
          profilePicture: reader.result, // Store the image as base64 (for simplicity)
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    // Logic to save the updated user data
    setEditMode(false);
    console.log('Profile updated:', userData);
  };

  return (
    <div className={styles['user-profile-page']}>
      <div className={styles['profile-section']}>
        {editMode ? (
          <>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className={styles['profile-input']}
            />
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
              className={styles['profile-input']}
            />
          </>
        ) : (
          <>
            <h2>{userData.username}</h2>
            <p>{userData.bio}</p>
          </>
        )}

        <div className={styles['profile-picture-container']}>
          {editMode ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles['profile-input']}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className={styles['profile-picture']}
                />
              )}
            </>
          ) : (
            <img
              src={imagePreview}
              alt="Profile"
              className={styles['profile-picture']}
            />
          )}
        </div>

        {editMode ? (
          <button onClick={saveChanges} className={styles['save-btn']}>
            Save Changes
          </button>
        ) : (
          <button onClick={() => setEditMode(true)} className={styles['edit-btn']}>
            Edit Profile
          </button>
        )}
      </div>

      <div className={styles['polls-section']}>
        <h3>Polls Created</h3>
        <ul>
          {pollsCreated.map((poll, index) => (
            <li key={index} >
              {poll.title}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles['activity-section']}>
        <h3>Recent Voting Activity</h3>
        <ul>
          {votingActivity.map((activity, index) => (
            <li key={index} >
              {`Voted on ${activity.pollTitle} at ${activity.date}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfilePage;
