import React from 'react';

const modalLock = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";
    return (
      <div className={showHideClassName}>
        <div className="modal-container modalLock">
           <img src="/image/exit.png" className="float-right" onClick={handleClose}></img>
          {children}
          <a href="javascript:;" className="btn btn-info ml-3 float-right" onClick={handleClose}>
            Trở lại
          </a>
        </div>
      </div>
    );
  };
  export default modalLock;