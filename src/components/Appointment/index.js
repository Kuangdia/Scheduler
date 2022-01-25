import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';
import axios from 'axios';
import "components/Appointment/styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDITING = "EDITING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"
const ERROR_EMPTY = "ERROR_EMPTY"

function Appointment(props) {
  // custom hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    if (!name) {
      transition(ERROR_EMPTY, true)
    } else {
      props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    }
  }

  function deleteInterview(event) {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={()=>transition(EDITING)}/>)}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
      {mode === CONFIRM && <Confirm message="Delete this interview?" onCancel={() => back()} onConfirm={deleteInterview}/>}
      {mode === EDITING && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => transition(SHOW)} onSave={save}/>}
      {mode === SAVING && <Status message="SAVING"/>}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === ERROR_SAVE && <Error message="Error Saving. Try again" onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Error Deleting. Try again" onClose={() => back()} />}
      {mode === ERROR_EMPTY && <Error message="Missing input" onClose={() => back()}/>}
    </article>
  );
}

export default Appointment;
