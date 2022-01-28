import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useApplication() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // appointments: appointments
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      // async
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => setState({...state, appointments}))
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // make a new function that returns a new days array
    
    let spots = state.days;
    if (!state.appointments[id].interview) {
      spots = state.days.map((item) => {
        if (item.appointments.includes(id)) {
          item.spots --;
          return item;
        } else {
          return item;
        }
      })
    }

    console.log("third", interview)

    return axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => setState({...state, spots, appointments}))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let spots = state.days;

    if (state.appointments[id].interview) {
      spots = state.days.map((item) => {
        if (item.appointments.includes(id)) {
          if (item.spots < 5) {
            item.spots ++;
            return item;
          } else {
            return item;
          }
        }
      })
    }

    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      setState(state => ({...state, spots, appointments}))
      console.log("spots", state.spots)
      console.log("app", state.appointments)
   })
  }

  return { state, setDay, editInterview, bookInterview, cancelInterview }

};