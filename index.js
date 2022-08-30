function reverseString(str) {
    var listOfAllChars = str.split('');
    var reverseStr = listOfAllChars.reverse();
    var reverseListOfAllChars = reverseStr.join('');
    return reverseListOfAllChars;
}

function checkPalindrome(text) {
    var reverseText = reverseString(text);
    return text === reverseText;
}

function convertDateToString(date) {
    var dateString = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateString.day = '0' + date.day.toString();
    } else {
        dateString.day = date.day.toString();
    }

    if (date.month < 10) {
        dateString.month = '0' + date.month.toString();
    } else {
        dateString.month = date.month.toString();
    }

    dateString.year = date.year.toString();

    return dateString;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (checkPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function checkLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month == 2) {
        if (checkLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getPalindromeForNextDate(date) {
    var nextDate = getNextDate(date);
    var counter = 0;

    while (true) {
        counter++;
        var isItPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isItPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}


function clickHandler() {
    var bdayInput = inputDate.value;

    if(bdayInput != ''){
        var listOfDates = bdayInput.split('-');
        var dateInput = {
            day : Number(listOfDates[2]),
            month : Number(listOfDates[1]),
            year : Number(listOfDates[0])
        }
        var isPalindrome = checkPalindromeForAllDateFormats(dateInput);
        if(isPalindrome){
            outputDiv.innerText = "Yayyy!! Your birthday is palindrome 🥳🥳";
        }
        else{
            var [ctr, nextDate] = getPalindromeForNextDate(dateInput);
            outputDiv.innerText = `Ooooooopsss!! \nYou missed the palindrome by ${ctr} days.\n The next palindrome is on ${nextDate.day}-${nextDate.month}-${nextDate.year} 🙁🙁`;
        }
    }
    else{

    }
}

//2022', '08', '02


var inputDate = document.querySelector("#input-date");
var checkBtn = document.querySelector("#check-btn");
var outputDiv = document.querySelector("#output-div");

checkBtn.addEventListener('click', clickHandler);








/*
List of functions we have:-
reversestring(str),   checkPalindrome(text),        convertDateToString(date),  getAllDateFormats(date)
*/
// console.log(convertDateToString(myDate));