import React from "react";
import UserProfilePage from "../Components/UserProfilePage/UserProfilePage"; 

const UserProfile = () => {
  
  const user = { username: "Chalam Sanjay", bio: "Blockchain Developer", profilePicture: "john.png" };
  const pollsCreated = [{ title: "Poll 1" }, { title: "Poll 2" }];
  const votingActivity = [
    { pollTitle: "Poll A", date: "2023-09-29" },
    { pollTitle: "Poll B", date: "2023-09-28" }
  ];

  return <UserProfilePage user={user} pollsCreated={pollsCreated} votingActivity={votingActivity} />;
};

export default UserProfile;
