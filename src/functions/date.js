export function DateConverter(date){
    let data = new Date(date),
        day = data.getDate() < 10 ? "0" + data.getDate() : data.getDate(),
        month = (data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1,
        year = data.getFullYear()
    return day + "." + month + "." + year
}