import moment from "moment";

const formatDate = (date: number) => {
  const today = moment().startOf("day");
  const givenDate = moment(date);

  if (today.isSame(givenDate, "day")) {
    return givenDate.format("HH:mm");
  } else {
    return givenDate.format("DD.MM.YYYY");
  }
};

export default formatDate;
