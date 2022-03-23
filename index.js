function createEmployeeRecord(array) {
  const employeeObj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };

  return employeeObj;

  // Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
}

function createEmployeeRecords(arrays) {
  const newArray = arrays.map(createEmployeeRecord);
  return newArray;
  //returns new array of objects
}

function createTimeInEvent(employeeObj, date) {
  const timeInObj = {
    type: "TimeIn",
    hour: parseInt(date.slice(11, 15)),
    date: date.slice(0, 10),
  };
  const timeInArray = employeeObj.timeInEvents;
  timeInArray.push(timeInObj);
  return employeeObj;
  //returns employees record
}

function createTimeOutEvent(employeeObj, date) {
  const timeOutObj = {
    type: "TimeOut",
    hour: parseInt(date.slice(11, 15)),
    date: date.slice(0, 10),
  };
  
  employeeObj.timeOutEvents.push(timeOutObj);
  return employeeObj;
  //returns employees record
}

function hoursWorkedOnDate(employeeObj, date) {
  const getDate = employeeObj.timeInEvents.map((key) => key.date);
    if (getDate.includes(date)) {
      const dateIndex = getDate.findIndex((dateIn) => dateIn === date);
      return ((employeeObj.timeOutEvents[dateIndex].hour - employeeObj.timeInEvents[dateIndex].hour) / 100);
    } else {
      return 0;
    }
  }

function wagesEarnedOnDate(employeeObj, date) {
  return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;
  // pay owed
}

function allWagesFor(employeeObj) {
  const getDates = employeeObj.timeInEvents.map(key => key.date);
  const totalWages = getDates.map(date => wagesEarnedOnDate(employeeObj, date)).reduce((previousPay, currentPay) => previousPay + currentPay);

  return totalWages;
  //pay owed for all dates
}

function calculatePayroll(arrayOfRecords) {
  return arrayOfRecords.reduce((acc, record) => acc + allWagesFor(record), 0)
}






// TESTS
const array = ["Jose", "Fletes", "Programs Manager", 10];
const arrays = [
  ["Jose", "Fletes", "Programs Manager", 10],
  ["Cassandra", "Fletes", "Photographer", 10],
  ["Luis", "Fletes", "Chef", 10],
];
const dayOneIn = "2022-03-23 1200";
const dayOneOut = "2022-03-23 1600";
const dayTwoIn = "2022-03-24 1300";
const dayTwoOut = "2022-03-24 2000";
const dayThreeIn = "2022-03-25 0900";
const dayThreeOut = "2022-03-25 1600";
const date = "2022-03-24";

const employeeObj = createEmployeeRecord(array);
const dayOneRecordIn = createTimeInEvent(employeeObj, dayOneIn);
const dayOneRecordOut = createTimeOutEvent(dayOneRecordIn, dayOneOut);
const dayTwoRecordIn = createTimeInEvent(dayOneRecordOut, dayTwoIn);
const dayTwoRecordOut = createTimeOutEvent(dayTwoRecordIn, dayTwoOut);
const dayThreeRecordIn = createTimeInEvent(dayTwoRecordOut, dayThreeIn);
const dayThreeRecordOut = createTimeOutEvent(dayThreeRecordIn, dayThreeOut);

const employeeObjects = createEmployeeRecords(arrays);
const dayOneRecordIn2 = createTimeInEvent(employeeObjects, dayOneIn);


// console.log(createEmployeeRecord(array));
// console.log(createEmployeeRecords(arrays));
// console.log(createTimeInEvent(createEmployeeRecord(array), dayOneIn));
// console.log(createTimeOutEvent(updatedBpRecord, dayOneOut));
// console.log(wagesEarnedOnDate(dayOneRecordOut, date));
// console.log(dayThreeRecordOut);
// console.log('=> Hours: ', hoursWorkedOnDate(dayOneRecordOut, date));
// console.log(dayOneRecordIn2);
// console.log('Expected: 180')
// console.log('=> Pay: ', allWagesFor(dayThreeRecordOut));
// console.log(calculateP)
