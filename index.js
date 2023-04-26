function createEmployeeRecord(employeeRecordArr) {
    return {
        firstName:employeeRecordArr[0],
        familyName:employeeRecordArr[1],
        title:employeeRecordArr[2],
        payPerHour:employeeRecordArr[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(dateStamp) {
        this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return this;
}

function createTimeOutEvent(dateStamp) {
        this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return this;
}

function hoursWorkedOnDate(dateStamp) {
    const outEvent = this.timeOutEvents.
    find(event => event.date === dateStamp.slice(0, 10));
    const inEvent = this.timeInEvents.
    find(event => event.date === dateStamp.slice(0, 10));
    return (outEvent.hour - inEvent.hour)/100;
}

function wagesEarnedOnDate(dateStamp) {
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(arrayOfRecords) {
    let total = 0;
    arrayOfRecords.forEach(record => total += allWagesFor.call(record));
    return total;
    }
    
