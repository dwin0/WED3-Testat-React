export function getCurrentMonth () {
  var month = new Date().getMonth() +1
  if (month < 10) {
    month = '0' + month
  }

  return month
}

export function getStartDate(year, month) {
  return `${year}-${month}-01T00:00:00.000Z`
}

export function getEndDate(year, month) {
  var endDay = daysInMonth(parseInt(month, 10), parseInt(year, 10))
  return `${year}-${month}-${endDay}T23:59:00.000Z`
}

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate().toString();
}
