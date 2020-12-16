import React from 'react';

const ModalEdit = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";
    return (
      <div className={showHideClassName}>
        <div className="modal-container">
           <img src="../image/exit.png" className="float-right" onClick={handleClose}></img>
          {children}
          <a href="javascript:;" className="btn btn-danger ml-3" onClick={handleClose}>
            Trở lại
          </a>
        </div>
      </div>
    );
  };
  export default ModalEdit;