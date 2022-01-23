import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   // classNames ('button', 'button--confirm') => 'button button--confirm'
   // if props.confirm === true
   let buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });
 
   // passing props from stories.index.js
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
}