export function getInterviewersForDay(state, day) {
  const daySelected = state.days.filter(dayObj => dayObj.name === day);
  console.log(daySelected)
  if (daySelected.length === 0) {
    return [];
  }
  return daySelected[0].interviewers.map(item => state.interviewers[item]);
}

export function getAppointmentsForDay(state, day) {
  const daySelected = state.days.filter(dayObj => dayObj.name === day);
  if (daySelected.length === 0) {
    return [];
  }
  return daySelected[0].appointments.map(item => state.appointments[item]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer + "";
  const interviewerObj = state.interviewers[interviewerId]

  return {...interview, interviewer: interviewerObj};
}

// export function getInterview(state, interview) {
//   const appObj = Object.values(state.appointments)
//   const interviewSelected = appObj.filter((item) => item.interview === interview)

//   if (interviewSelected[0].interview === null) {
//     return null;
//   } 

//   let array = [];
//   for (let key in state.interviewers) {
//     if (parseInt(key) === interviewSelected[0].interview.interviewer) {
//       const testObject = {
//         student: interviewSelected[0].interview.student,
//         interviewer: state.interviewers[key]
//       }
//       array.push(testObject);
//     }
//   }
//   return array[0]
// }

// export function getAppointmentsForDay(state, day) {

//   // const arr = [];

//   // for (const days of state.days) {
//   //   if (days.name === day) {
//   //     for (const id of days.appointments) {
//   //       if (state.appointments[id]) {
//   //         arr.push(state.appointments[id])
//   //       }
//   //     }
//   //   }
//   // }
//   // return arr;
// }