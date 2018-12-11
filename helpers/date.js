export const formatSecondsToString = (totalSeconds = 0, format) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;

  // round seconds
  seconds = Math.round(seconds * 100) / 100;
  let result = '';
  switch (format) {
    case 'MM:SS':
      result += `${minutes < 10 ? `0${minutes}` : minutes}`;
      result += `:${seconds < 10 ? `0${seconds}` : seconds}`;
      return result;
    default:
      result = hours < 10 ? `0${hours}` : hours;
      result += `:${minutes < 10 ? `0${minutes}` : minutes}`;
      result += `:${seconds < 10 ? `0${seconds}` : seconds}`;
      return result;
  }
};

export const formatStringToSeconds = (value) => {
  const time = value || '00:00:00';
  const timeArray = time.split(':');
  return +timeArray[0] * 60 * 60 + +timeArray[1] * 60 + +timeArray[2];
};
