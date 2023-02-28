export const formatTimestamp = (timestamp) => {
    if (timestamp == "now") {
        return timestamp
    }
    return new Date(Number(timestamp)).toLocaleString().split(',')[0]
}