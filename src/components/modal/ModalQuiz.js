import React from 'react';
import {Link} from "react-browser-router";

const ModalQuiz = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";
    return (
      <div className={showHideClassName}>
        <div className="modal-container modalQuiz">
           <img src="/image/exit.png" className="float-right" onClick={handleClose}></img>
          {children}
          <Link to="/home" className="btn btn-info ml-3 float-right">
            Kết thúc
          </Link>
        </div>
      </div>
    );
  };
  export default ModalQuiz;