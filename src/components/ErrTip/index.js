import React from "react";
import style from "./style.less";

const ErrTip = props => {
  return (
    <div
      className={style.ErrTipWrap}
    >
      {props.children}
    </div>
  );
};

export default ErrTip;
