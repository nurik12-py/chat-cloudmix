import moment from "moment";

const formatDate = (date: number) => {
  const today = moment().startOf("day");
  const givenDate = moment(date);

  if (today.isSame(givenDate, "day")) {
    return givenDate.format("h:mm A");
  } else {
    return givenDate.format("DD.MM.YYYY");
  }
};

export default formatDate;
