export const convertMsToS = (milliseconds) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  const hoursX = hours ? hours + ":" : "";
  const minX = minutes ? minutes + ":" : "";
  const secX = seconds < 10 ? "0" + seconds : "00";
  var result = hoursX + minX + secX;
  return result;
};

export const convertMsToHMS = (milliseconds) => {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  // Format the result
  // var result = hours + "h " + minutes + "m " + seconds + "s";
  const hoursX = hours ? hours + "h " : "";
  const minX = minutes ? minutes + "m " : "";
  const secX = seconds ? seconds + "s " : "";
  var result = hoursX + minX + secX;

  return result;
};
