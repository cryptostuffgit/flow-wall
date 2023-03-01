export const formatTimestamp = (timestamp) => {
<<<<<<< Updated upstream
    if (timestamp == "now") {
        return timestamp
    }
    return new Date(Number(timestamp)).toLocaleString().split(',')[0]
}
=======
  if (timestamp == 'now') {
    return timestamp;
  }
  return new Date(Number(timestamp) * 1000).toLocaleString().split(',')[0];
};
>>>>>>> Stashed changes
