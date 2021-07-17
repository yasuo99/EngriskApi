const WrongAnswer = ({ indexChange}) => {
  return (
    <div className="container">
      <div className="drawer-content checked">
        <div className="page-wrap justify-content-between">
          <div className="ex-feedback-bar icon icon-primary-base fixed-bar">
            <span>
              <img className='w-75' src='/image/remove-lg.png'></img>
            </span>
            <span className="ex-feedback-bar__state-indicator-text text-danger">Không chính xác</span>
          </div>
          {<button className="btn-danger btn-lg feedback-bar-btn feedback-bar-btn-danger" onClick={() => {
            {
              indexChange();
            }
          }}>Kế tiếp</button>}
        </div>
      </div>
    </div>
  );
};
export default WrongAnswer;
