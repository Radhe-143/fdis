import dateFormat from 'dateformat'
import moment from 'moment'

const appendMonthFromCurrentDate = (format, month) => {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + month)
  return dateFormat(currentDate, format)
}

function getMondays(date) {
  const d = date ? new Date(date) : new Date();
  const month = d.getMonth()
  const mondays = [];
  d.setDate(1);
  // Get the first Monday in the month
  while (d.getDay() !== 1) {
    d.setDate(d.getDate() + 1);
  }
  // Get all the other Mondays in the month
  while (d.getMonth() === month) {
    mondays.push(new Date(d.getTime()));
    d.setDate(d.getDate() + 7);
  }
  return mondays.map((m) => {
    return {
      start: moment(m).startOf('days').toDate(),
      end: moment(m).endOf('isoWeeks').toDate()
    }
  });
}

function getAllDateInWeek(date) {
  const d = moment(date).startOf('isoWeeks')
  const arr = []
  const endWeek = moment(date).endOf('isoWeeks')
  while (d.isBefore(endWeek)) {
    arr.push({
      start: d.clone().startOf('days').toDate(),
      end: d.clone().endOf('days').toDate()
    })
    d.add('days', 1)
  }
  return arr
}

function getRangeWeeksInMonth(date) {
  const startMonth = moment(date).startOf('months')
  const endMonth = moment(date).endOf('months')
  const arrayDate = getMondays(date);
  if (arrayDate && arrayDate.length > 0) {
    if (moment(arrayDate[0].start).isAfter(startMonth.clone().endOf('isoWeeks'))) {
      arrayDate.unshift({
        start: startMonth.toDate(),
        end: startMonth.endOf('isoWeeks').toDate()
      })
    }
    if (moment(arrayDate[arrayDate.length - 1].end).isAfter(endMonth)) {
      arrayDate[arrayDate.length - 1].end = endMonth.toDate()
    }
  }
  return arrayDate
}

/**
 * get RangeHours In Date
 * @param {*} date
 * @param {*} hours
 */
function getRangeHoursByHour(date, hours) {
  hours = parseInt(hours, 10)
  if (!hours) {
    hours = 4
  }
  let startDate = moment(date).startOf('days')
  const endDate = moment(date).endOf('days')
  const arr = []
  while (startDate.isBefore(endDate)) {
    const start = startDate.clone().add(10, 'milliseconds').toDate()
    startDate = startDate.add(hours, 'hours')
    arr.push({
      start,
      end: startDate.isBefore(endDate) ? startDate.toDate() : endDate.toDate()
    })
  }
  return arr
}

/**
 * get current Miliseconds in current date
 * result like: 60601993
 */
function getCurrentMiliseconds() {
  const startDate = moment().startOf('days')
  const now = moment()
  return now.diff(startDate, 'milliseconds')
}

function enumerateDaysBetweenDates(startDate, endDate) {
  const dates = []
  const firstDate = moment(startDate).startOf('day')
  const lastDate = moment(endDate).endOf('day')
  while (firstDate.diff(lastDate) <= 0) {
    dates.push({
      start: firstDate.clone().startOf('days').toDate(),
      end: firstDate.clone().endOf('days').toDate()
    })
    firstDate.add(1, 'days')
  }
  return dates
}

function getDayStartToCurrent(day) {
  const currentDate = moment()
  const startDate = moment().subtract(day, 'days')
  const dates = []
  while (startDate.diff(currentDate) <= 0) {
    dates.push({
      start: startDate.clone().startOf('days').toDate(),
      end: startDate.clone().endOf('days').toDate()
    })
    startDate.add(1, 'days')
  }
  return dates
}

function getDayInHistory(day) {
  const dayInHistory = moment().subtract(day, 'days')
  return dayInHistory.startOf('days').toDate()
}

function getEndDayList(day) {
  const currentDate = moment()
  const startDate = moment().subtract(day, 'days')
  const dates = []
  while (startDate.diff(currentDate) <= 0) {
    dates.push({
      createdAt: startDate.endOf('days').format('YYYY-MM-DD')
    })
    startDate.add(1, 'days')
  }
  return dates
}

export default {
  appendMonthFromCurrentDate,
  getMondays,
  getAllDateInWeek,
  getRangeWeeksInMonth,
  getRangeHoursByHour,
  getCurrentMiliseconds,
  enumerateDaysBetweenDates,
  getDayStartToCurrent,
  getDayInHistory,
  getEndDayList,
};
