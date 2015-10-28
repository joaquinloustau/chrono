/**
 * @param {number} index - 0 if the nth day on which the holiday falls on is counted from the beginning. 1 if it is the last Monday, Tuesday, etc.. 
 * @param {number} month - month of the holiday (0-11).
 * @param {number} weekOfMonth - n, where the holiday falls on the (n+1)th Monday/Tuesday,etc. of the month.
 * @param {number} dayOfWeek - day of the week, where Sunday corresponds to 0 and Saturday to 6 (0-6).
 */

var moment = require('moment');

function calculateDay(index, month, weekOfMonth, dayOfWeek ){

    if (index == 0) {
        holliday = moment().month((month - 1)).date(1);
        if (holliday.day() > dayOfWeek) {
            holliday = holliday.day(dayOfWeek).add(weekOfMonth, 'weeks');
        } else {
            holliday =holliday.day(dayOfWeek).add((weekOfMonth - 1), 'weeks');
        }

    } else {
        holliday = moment().month(month).date(1).day(dayOfWeek).subtract(weekOfMonth, 'weeks');
    }

    return holliday;
}

exports.calculateDay = calculateDay;