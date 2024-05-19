function timeFormatter(time){
    let seconds = time > 60 ? time % 60 : time;
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    let minuts = time > 60 ? Math.round((time / 60), 0) : 0;
    minuts = minuts >= 10 ? minuts : "0" + minuts;
    let hours = time < 3600 ? 0 : Math.round((time / 3600), 1);
    hours = hours >= 10 ? hours : "0" + hours;
    return `${hours}:${minuts}:${seconds}`
}

export { timeFormatter };