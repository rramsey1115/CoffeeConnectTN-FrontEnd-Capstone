import { useEffect, useState } from "react";
import "./Recommendations.css";
import { getNonAdminUsers } from "../services/userServices";
import { MatchingPrefCard } from "./MatchingPrefCard";

export const Recommendations = ({ user }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [matchingPrefsArray, setMatchingPrefsArray] = useState([]);

  //gets all non-admin users, and then filters for users with matching preferences to currentUser
  useEffect(() => {
    getNonAdminUsers().then((data) => setAllUsers(data));
    //filter allNonAdminUsers for users who have similar preferences
    const matches = allUsers.filter((u) => {
      return (
        u.coffeePreferenceId === user.coffeePreferenceId ||
        u.atmospherePreferenceId === user.atmospherePreferenceId &&
        u.id !== user.id
      );
    });
    //filters out current user so you don't see yourself as recommendation
    const recsArray = matches.filter(match => match.id !== user.id)
    setMatchingPrefsArray(recsArray);
  }, [user]);

  return (
    <section className="recs">
      <div className="recs-header">
        <h1>Recommendations</h1>
      </div>
      <div className="recs-list">
        {matchingPrefsArray.map((match) => (
          <MatchingPrefCard key={match.id} matchingUserObject={match} />
        ))}
      </div>
    </section>
  );
};
