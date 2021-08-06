import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightAnswer = ({ indexChange, isFinish, sectionId, url }) => {
  const {isLoggedIn} = useSelector(state => state.auth);
  return (
    <div className="container">
      <div className="drawer-content checked">
        <div className="page-wrap">
          <div className="ex-feedback-bar icon icon-primary-base fixed-bar">
            <span>
              <img className='w-75' src="/image/tick-lg.png"></img>
            </span>
            <span className="ex-feedback-bar__state-indicator-text">
              Chính xác
            </span>
          </div>
          {!isFinish ? <button className="btn-success feedback-bar-btn feedback-bar-btn-success" onClick={() => {
            {
              indexChange();
            }
          }}>
            Kế tiếp
          </button> : (isLoggedIn ? sectionId ?  <Link
            className="btn feedback-bar-btn"
            to={url || `/sections/${sectionId}/finish`}
          >
            Kết thúc
          </Link> : <Link
            className="btn feedback-bar-btn"
            to={url || `/vocabulary/progress`}
          >
            Kết thúc
          </Link> : <Link className="btn feedback-bar-btn"
            to={url ||`/home`}>Kết thúc</Link> )}
        </div>
      </div>
    </div>
  );
};
export default RightAnswer;
