import React from 'react';
import "components/InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem';

function InterviewerList(props) {
  const { value, onChange, interviewers } = props

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewer) => {
          return (
            <InterviewerListItem 
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === value}
              setInterviewer={() => onChange(interviewer.id)}    
            />
          );
        })}
      </ul>
    </section>
  );
}

export default InterviewerList;