export const commonDateFormat = (date) =>{
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    const formattedToday = dd + '-' + mm + '-' + yyyy;
    return formattedToday;
}
export const commonTimeFormat = (date) =>{
  // Create a new Date object
let currentDate = new Date(date);

// Get the hours, minutes, and seconds
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();

// Convert hours to 12-hour format and determine if it's AM or PM
let period = (hours >= 12) ? "PM" : "AM";
hours = (hours > 12) ? hours - 12 : hours;

// Pad minutes and seconds with leading zeros if needed
minutes = (minutes < 10 ? "0" : "") + minutes;
seconds = (seconds < 10 ? "0" : "") + seconds;

// Display the time in AM/PM format
let timeInAMPM = hours + ":" + minutes + period;
    return timeInAMPM;
}