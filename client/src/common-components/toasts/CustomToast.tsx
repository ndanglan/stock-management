import React from 'react';

interface ICustomToast {
  type?: string;
  title?: string;
  message?: string;
}

const CustomToast = (props: ICustomToast) => {
  const { type, message = 'This is custom toast', title = 'toast' } = props;
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className={`me-auto text-${type}`}>{title}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default CustomToast;
