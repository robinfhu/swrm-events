export function formatDate(date) {
    let [weekday, month, dateNum] = (new Date(date + "T00:00:00")).toString().split(" ");
    return `${weekday}, ${month} ${dateNum}`;
}