export const sqlDateToJSDate = (date) => {
  if (date) {
    var dateParts = date.split("-");
    var jsDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2].substr(0, 2)
    );
    return jsDate;
  } else {
    return new Date();
  }
};
