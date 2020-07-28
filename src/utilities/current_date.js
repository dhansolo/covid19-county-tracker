import * as moment from 'moment/moment';

// Create a date string in the format YYYY-MM-DD
let date = moment().subtract(1, 'days');

let currentDate;
if(date.month() + 1 < 10) {
    if(date.date() < 10) {
        currentDate = date.year() + "-0" + (date.month() + 1) + "-0" + date.date();
    } else {
        currentDate = date.year() + "-0" + (date.month() + 1) + "-" + date.date();
    }
} else {
    if(date.date() < 10) {
        currentDate = date.year() + "-" + (date.month() + 1) + "-0" + date.date();
    } else {
        currentDate = date.year() + "-" + (date.month() + 1) + "-" + date.date();
    }
}

export default currentDate;