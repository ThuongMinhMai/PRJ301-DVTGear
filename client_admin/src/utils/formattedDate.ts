const options: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
};

const formattedDate = (date: Date) => {
  return date.toLocaleDateString("en-US", options);
};

export default formattedDate;
