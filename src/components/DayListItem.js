import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  
  function formatSpots() {
    if (props.spots === 0) {
      return "no spots remaining"
    } else if (props.spots === 1) {
      return `${props.spots} spot remaining`
    } else if (props.spots > 1) {
      return `${props.spots} spots remaining`
    }
  }

  let day = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li 
      onClick={() => props.setDay(props.name)} 
      className={day} 
      selected={props.selected}
      data-testid="day"
      >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}