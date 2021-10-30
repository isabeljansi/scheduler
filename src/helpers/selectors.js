

export function getAppointmentsForDay(state, day) {
  let result = [];
  
  if(!state.days){
    return result;
  }
  let filteredDays = state.days.filter(eachDay => eachDay.name === day)[0];
  if(!filteredDays){
    return result;
  }
  
  for(const id of filteredDays.appointments){
    const appointment = state.appointments[id]; //is an object
    result.push(appointment);
  }
  return result;
}

