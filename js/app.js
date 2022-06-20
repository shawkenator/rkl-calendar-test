const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const timeArr = [
  { label: '00:00', hour: 0 },
  { label: '01:00', hour: 1 },
  { label: '02:00', hour: 2 },
  { label: '03:00', hour: 3 },
  { label: '04:00', hour: 4 },
  { label: '05:00', hour: 5 },
  { label: '06:00', hour: 6 },
  { label: '07:00', hour: 7 },
  { label: '08:00', hour: 8 },
  { label: '09:00', hour: 9 },
  { label: '10:00', hour: 10 },
  { label: '11:00', hour: 11 },
  { label: '12:00', hour: 12 },
  { label: '13:00', hour: 13 },
  { label: '14:00', hour: 14 },
  { label: '15:00', hour: 15 },
  { label: '16:00', hour: 16 },
  { label: '17:00', hour: 17 },
  { label: '18:00', hour: 18 },
  { label: '19:00', hour: 19 },
  { label: '20:00', hour: 20 },
  { label: '21:00', hour: 21 },
  { label: '22:00', hour: 22 },
  { label: '23:00', hour: 23 }
];
var currStartDate, currEndDate;
const oneDayMillis = 24 * 60 * 60 * 1000;
var eventMap = {};
var events = [];
var allDayEvents = [];
var elmsToRemove = [];
var allDayEventsByCol = {
  '0': [],
  '1': [],
  '2': [],
  '3': [],
  '4': [],
  '5': [],
  '6': []
};
var obj 
var counter;
const dayLabels = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];
var itr;
var weeklyEvents;
var today;
var calContainer = document.querySelectorAll('.calendar-row')[0], currDate, row, cell;
var startDate = new Date();
calContainer.innerHTML = "";
var howManyStarting = [];


buildMainCalendar()

function buildMainCalendar() {
  fetch('https://rkltestprivate.vercel.app/js/event.json')
    .then(response => response.json())
    .then((data) => {
      this.events = data;
      this.today = new Date();
      this.setData();
      this.clickEvents();
      // console.log('%cstartDate', 'background: red', startDate);
      // console.log('%cthis.today', 'background: red', this.today);

      drawCalendarWithEvents();
    })
    .catch(error => console.log(error));

}

function drawCalendarWithEvents() {
  // create top row
  var row = document.createElement("div");
  row.className = "row all-blank";
  // creating all day holder
  for (index = 0; index < 8; index++) {
    var cell = document.createElement("div");
    if (index === 0) {
      cell.innerHTML = 'all-day';
      cell.className = "all-day";
    } else {
      const cellDayId = index;
      // cell.innerHTML = index;
      cell.className = 'col col-day cell ';
      cell.setAttribute('id', cellDayId);
    }
    row.appendChild(cell);
  }
  // let firstDay = ;
  calContainer.innerHTML = "";  // reset calendar to redraw
  calContainer.appendChild(row);
  for (i = 0; i < 24; i++) {
    calContainer.appendChild(createRow(i, this.setFirstDay(this.today)));
  }
  buildAllDayData();
  setTheAlldayData();
  console.log('howManyStarting ', this.howManyStarting);
  if (this.howManyStarting.length >= 2) {
    // loop through -- get the name, string it and add style
    this.howManyStarting.forEach((event, i) => {
      var stringId = event.eventName;
      stringId = stringId.replace(/\s+/g, '');
      const tempEventSelector = document.getElementById(stringId);
      tempEventSelector.className = 'listedEvent double-col';
      if (i == 1) {
        tempEventSelector.className = 'listedEvent double-col right';
      }
    });
  }
}

function buildAllDayData() {
  const firstDay = setFirstDay(this.getDate());
  const firstDayEpoch = firstDay.getTime();

  const secondDay = new Date(firstDayEpoch);
  secondDay.setDate(secondDay.getDate() + 1);

  // have to figure out which days they belong too
  // add each to 
  this.allDayEvents.forEach(event => {
    let currentEventDayFrom = new Date(event.dateFrom);
    let currentEventDayTo = new Date(event.dateTo);
    
    var Difference_In_Time = event.dateTo - event.dateFrom;
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    // loop through each day of the week coloumm..  and see if week start date +col
    for (index = 0; index < 7; index++) {
      // const stard = date.setDate(date.getDate() + 1);
      const compareDate = new Date(firstDayEpoch);
      compareDate.setDate(compareDate.getDate() + index);
      console.log('compareDate ', compareDate);
      if (compareDate > currentEventDayFrom && compareDate < currentEventDayTo) {
        if (!this.allDayEventsByCol[index].includes(event)) {
          this.allDayEventsByCol[index].push(event);
        }

      } else {
      }
    }

  });
  
}

function setTheAlldayData() {
  // loop throuugh each day of the week
  for (index = 0; index < 7; index++) {
    // grab the all day container element using the day
    const currentHeaderCol = document.getElementById(index+1);

    // then loop through allDayEvents by col using index
    this.allDayEventsByCol[index].forEach((event, i) => {
      var ade = document.createElement('div'); 
      ade.className = 'col col-day cell filled-time color'+i;
      ade.setAttribute('id', (event.dateFrom + event.dateTo) + (index+1));
      ade.innerHTML = event.eventName;
      currentHeaderCol.appendChild(ade);  
    });
  }
  this.elmsToRemove.forEach(elm => {
    const element = document.getElementById(elm);
    element.remove();
  });
  
}
function setDate(date) {
  this.today.setDate(date);
}

function setEventData(data) {
  this.events = data;
}

function createRow(indexTo, Monday) {

  var row = document.createElement("div"), index;
  row.className = "row";
  // row.innerText = indexTo;
  row.appendChild(createTimeCell(indexTo));
  // check to see if this time falls into time slot
  this.weeklyEvents = events.filter(event => {
    return this.eventsThisWeek(event.dateFrom, event.dateTo);
  });
  // loop through weekly

  //if so  -- check if there's more than one
  // fill it...
  for (index = 0; index < 7; index++) {
      row.appendChild(createCell(indexTo, index, new Date(Monday.getTime() + oneDayMillis * index)));
  }
  return row;
}

function determineCell(day, hour) {
  const row = document.querySelector(`#calendar-body-row-${hour}`);
  return row.querySelector(`[data-day="${day}"]`);
}

function createTimeCell(rowIndex) {
    var cell = document.createElement("div");
    cell.className = 'col col-time';
    cell.innerHTML = timeArr[rowIndex].label;

    return cell;
}

function reset() {
  this.elmsToRemove = [];
  this.allDayEvents = [];
  this.allDayEventsByCol = {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': []
  };
  const calendarColumns = document.querySelectorAll('.col-day');
  for (let i = 0; i < calendarColumns.length; i++) {
    if (!calendarColumns[i].classList.contains('filled-time')) {
      calendarColumns[i].innerHTML = '';
    }
  }
}

function createCell(rowNum, dayNum, startDate) {
    var cell = document.createElement("div"), eventClass;
    var idstr = getDateString(startDate) + "-" + rowNum;

    cell.className = "col col-day cell ";
    // cell.innerText = startDate.getDay();
    cell.setAttribute("id", idstr);

    // loop through weekly events..  and get days to compare
    this.weeklyEvents.forEach(event => {
        const dateFrom = new Date(event.dateFrom);
        const dateTo = new Date(event.dateTo);
        const firstDay = setFirstDay(this.getDate());
        const formedDateFrom = new Date(
          dateFrom.getFullYear(),
          dateFrom.getMonth(),
          dateFrom.getDate()
        );
        const formedDateTo = new Date(
          dateTo.getFullYear(),
          dateTo.getMonth(),
          dateTo.getDate()
        );


        // if (startDate.getTime() >= event.dateFrom && startDate.getTime() <= event.dateTo) {
        if (startDate.getTime() >= formedDateFrom && startDate.getTime() <= formedDateTo) {

          
          // this.dayCriterea(event.dateFrom, event.dateTo);
          const diffDays = (dateTo.getDay() || 7) - dateFrom.getDay();
          formedStartDay = startDate.getDay();

          if (diffDays >= 1) { 
            // check to see about time window then
            if (formedDateFrom.getTime() === startDate.getTime()) {
              
              if (!this.howManyStarting.includes(event)) {
                this.howManyStarting.push(event);
              }
              const startHour = dateFrom.getHours();
              const totalHours = startHour;
              const minutesStart = dateFrom.getMinutes();

              if (startHour === timeArr[rowNum].hour) {
                var stringId = event.eventName;
                stringId = stringId.replace(/\s+/g, '');
                var innerCell = document.createElement("div");
                var stringId = event.eventName;
                stringId = stringId.replace(/\s+/g, '');
                innerCell.className = 'listedEvent '+stringId;
                innerCell.innerHTML = '<p class="timebath">' + dateFrom.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + '</p><p class="titlem">' + event.eventName + '</p>';
                // innerCell.innerHTML = event.eventName;
                innerCell.setAttribute("id", stringId);
                // find time it ends and minues from midnight
                // remove it from the all day section
                // this.elmsToRemove.push((event.dateFrom + event.dateTo) + (dayNum+1));
                innerCell.style.cssText = 'height: ' + totalHours*60 + 'px; top:' + minutesStart +'px';
                cell.appendChild(innerCell);
              }
            }

            if (formedDateTo.getTime() === startDate.getTime()) {
              // we need to make sure timees
              const endHour = dateTo.getHours();
              const totalHours = endHour;
              const minutesEnd = dateTo.getMinutes();
              
              //do hours match
              if (endHour === timeArr[rowNum].hour) {
                var innerCell = document.createElement("div");
                var stringId = event.eventName;
                stringId = stringId.replace(/\s+/g, '');
                innerCell.className = 'listedEvent '+stringId;
                innerCell.innerHTML = event.eventName;
                innerCell.innerHTML = '<p class="timebath">12:00AM</p><p class="titlem">' + event.eventName + '</p>';

                // find time it ends and minues from midnight
                // remove it from the all day section
                this.elmsToRemove.push((event.dateFrom + event.dateTo) + (dayNum+1));
                innerCell.style.cssText = 'height: ' + totalHours*60 + 'px; bottom: 60px';
                cell.appendChild(innerCell);
              }
            }

            if (!allDayEvents.includes(event)) {
              this.allDayEvents.push(event);
            }

          } else {
            // we need to make sure timees
            const startHour = dateFrom.getHours();
            const endHour = dateTo.getHours();
            const totalHours = endHour - startHour;
            const minutesStart = dateFrom.getMinutes();

            //do hours match
            if (startHour === timeArr[rowNum].hour) {
              var innerCell = document.createElement("div");
              var stringId = event.eventName;
              stringId = stringId.replace(/\s+/g, '');
              innerCell.className = 'listedEvent '+stringId;
              innerCell.innerHTML = '<p class="timebath">' + dateFrom.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + '</p><p class="titlem">' + event.eventName + '</p>';
              // innerCell.setAttribute('style','height:'+ totalHours*60 + 'px');
              // innerCell.setAttribute('style','top:'+ minutesStart +'px');
              innerCell.style.cssText = 'height: ' + totalHours*60 + 'px; top:' + minutesStart +'px';
              
              cell.appendChild(innerCell);
            }
          }
        } else {
          console.log('no match')
        }
    });
    return cell;
}

function getDateString(startDate) {
    var date = startDate.getDate();
    var month = startDate.getMonth() + 1;
    var yr = startDate.getFullYear();
    return "" + date + month + yr;
}


function clickEvents() {
    const btnPrev = document.getElementById('btn-prev');
    const btnToday = document.getElementById('btn-today');
    const btnNext = document.getElementById('btn-next');

    btnPrev.addEventListener('click', () => {
      this.setDate(this.today.getDate() - 7);
      this.reset();
      this.setData();
    });

    btnToday.addEventListener('click', () => {
        this.today = new Date();
        this.reset();
        this.setData();
    });

      btnNext.addEventListener('click', () => {
      this.setDate(this.today.getDate() + 7);
      this.reset();
      this.setData();
    });


}

function setData() {
    this.setTitle();
    this.buildColHeaders();
    this.buildEventData();
}

function removeTime(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

function getMonth() {
  return this.today.getMonth();
}

function dayCriterea(dateFrom, dateTo) {
  return this.determineHours(dateFrom, dateTo);
}

function setDay(date) {
  return dayLabels[date.getDay()];
}

function getDate() {
  return this.today;
}

function determineHours(dateFrom, dateTo) {
  dateFrom = new Date(dateFrom);
  dateTo = new Date(dateTo);
  const hours = [];
  let currentEventDateFrom = dateFrom.getTime() <= this.setFirstDay(this.getDate()).getTime() ? this.setFirstDay(this.getDate()) : dateFrom;
  let currentEventDateTo = dateTo.getTime() >= this.setLastDay(this.getDate()).getTime() ? this.setLastDay(this.getDate()) : dateTo;
  return getSpecficData(currentEventDateFrom, currentEventDateTo);
}

function determineLabel(event, timeSlots, index) {
  const currentDay = timeSlots[index].day;
  const previousSlotDay = timeSlots[index - 1] ? timeSlots[index - 1].day : null;

  if (timeSlots.length === 1) {
    return event.eventName;
  } else if (index === 0) {
    return event.eventName;
  } else if (currentDay !== previousSlotDay) {
    return event.eventName;
  } else {
    return '';
  }
}

function setTitle() {
    const month = document.getElementById('main-header');
    const year = document.getElementById('main-year');
    month.innerText = months[this.getMonth()];
    year.innerText = this.today.getFullYear();
}

function buildColHeaders() {
    const days = document.getElementById('day-titles');
    days.innerHTML = '';
    const dayCol = document.createElement('div');
    dayCol.classList.add('col-head');
    days.appendChild(dayCol);

    let firstDay = this.setFirstDay(this.getDate());
    for (let i = 0; i < 7; i++) {
      const day = document.createElement('div');
      day.classList.add('col-head');

      const dayLabel = document.createElement('span');
      dayLabel.classList.add('day');
      dayLabel.innerText = this.setDay(firstDay);
      day.appendChild(dayLabel);

      const dayNum = document.createElement('span');
      dayNum.classList.add('number');
      if (this.verifyDay(firstDay)) {
        dayNum.classList.add('today');
      } else {
        dayNum.classList.remove('today');
      }
      dayNum.innerText = firstDay.getDate();
      day.appendChild(dayNum);

      days.appendChild(day);
      firstDay.setDate(firstDay.getDate() + 1);
    }
  }

function setFirstDay(date) {
  date = new Date(date);
  var day = date.getDay(),
  diff = date.getDate() - day + (day == 0 ? -6 : 1);
  return new Date((new Date(date.setDate(diff))).setHours(0, 0, 0, 0));
}

function setLastDay(date) {
  date = new Date(date);
  var day = date.getDay(),
  diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date((new Date(date.setDate(diff + 6))).setHours(23, 59, 59, 999));
}

function verifyDay(date) {
  const today = new Date()
  return date.getDate() == today.getDate() &&
  date.getMonth() == today.getMonth() &&
  date.getFullYear() == today.getFullYear()
}

function buildEventData() {
  const weeklyEvents = events.filter(event => {
    return this.eventsThisWeek(event.dateFrom, event.dateTo);
  });
  drawCalendarWithEvents();
}

function eventsThisWeek(dateFrom, dateTo) {
  // this.counter += 1;
  return this.setFirstDay(this.getDate()).getTime() >= this.setFirstDay(dateFrom).getTime() && this.setFirstDay(this.getDate()).getTime() <= this.setFirstDay(dateTo).getTime()
}

function getSpecficData (startDate, endDate) {
  const startBegin = new Date(startDate);
  const startDay = startBegin.getDay();
  const startHour = startBegin.getHours();
  const end = new Date(endDate);
  const endHour = end.getHours();
  const endDay = end.getDay();
  const diffDays = (end.getDay() || 7) - startBegin.getDay();
  const formedStartDay = startDay + 'AM';

  if (diffDays === 0) {
    return timeArr[formedStartDay].filter(hour => hour >= startHour && hour <= endHour)
  } else if (diffDays === 1) {
    return timeArr[formedStartDay].filter(hour => hour >= startHour).concat(lookUpObject[endDay].filter(hour => hour.hour <= endHour))
  } else {
    const daysAndHours = [];
    daysAndHours.push(timeArr.filter(hour => hour.hour >= startHour));
    // daysAndHours.push(timeArr[endDay].filter(hour => hour.hour <= endHour));
    while (startBegin.getDay() + 1 <= (end.getDay() || 7) - 1) {
      startBegin.setDate(startBegin.getDate() + 1);
      daysHours.push(timeArr[startBegin.getDay()]);
    }
    return daysHours.reduce((acc, curr) => acc.concat(curr), []);
  }
}