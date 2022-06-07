function formatDate(date) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getTimeAgo(date) {
  const dateObj = new Date(date);
  const seconds = Math.floor(Date.now() / 1000 - dateObj / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  let resultStr = "";

  if (hours > 24) {
    resultStr = dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } else if (hours > 1) {
    resultStr = hours + " hours ago";
  } else if (hours === 1) {
    resultStr = hours + " hour ago";
  } else if (minutes > 1) {
    resultStr = minutes + " minutes ago";
  } else if (minutes === 1) {
    resultStr = minutes + " minute ago";
  } else {
    resultStr = "just now";
  }

  return resultStr;
}

export { formatDate, getTimeAgo };
