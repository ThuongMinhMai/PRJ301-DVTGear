const statusToColor: Record<Status, string> = {
  COMPLETE: "badge-success",
  PROCESSING: "badge-warning",
  DELIVERING: "badge-info",
  CANCELLED: "badge-error",
};

export default statusToColor;
