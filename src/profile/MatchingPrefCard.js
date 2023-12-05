import { useNavigate } from "react-router-dom";
import "./Recommendations.css";

export const MatchingPrefCard = ({ matchingUserObject }) => {
  const navigate = useNavigate();

  return (
    <div className="matching-pref-card">
      <div className="matching-card-user">
        <h2 className="matching-profile-name">{matchingUserObject.name}</h2>
        <img
          className="matching-profile-picture"
          src={matchingUserObject.picture}
          alt="user"
          onClick={(e) => {
            window.scrollTo(0, 0);
            navigate(`/profile/${matchingUserObject.id}`);
          }}
        />
      </div>
    </div>
  );
};
