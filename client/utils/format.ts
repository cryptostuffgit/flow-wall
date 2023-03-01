export const formatTimestamp = (timestamp) => {
  if (timestamp == 'now') {
    return timestamp;
  }
  return new Date(Number(timestamp) * 1000).toLocaleString().split(',')[0];
};
