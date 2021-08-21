// DARK MODE TOGGLE
document.querySelector(".dark-mode-switch").onclick = () => {
  document.querySelector("body").classList.toggle("dark");
  document.querySelector("body").classList.toggle("light");
};

// CHECK LEAP YEAR 윤년계산

isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28; // 윤년이면 29일, 윤년이 아니면 28일
};

let calendar = document.querySelector(".calendar"); // Calendar 전체

const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month_picker = document.querySelector("#month-picker"); // month

month_picker.onclick = () => {
  month_list.classList.add("show");
};

// GENERATE CALENDAR

generateCalendar = (month, year) => {
  let calendar_days = document.querySelector(".calendar-days"); // days
  calendar_days.innerHTML = "";
  let calendar_header_year = document.querySelector("#year"); // year
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currDate = new Date(); // 오늘의날짜

  month_picker.innerHTML = month_names[month]; // value - month
  calendar_header_year.innerHTML = year; // value - year

  let first_day = new Date(`${month + 1} 1,${year}`); // first day, 월은 0부터 시작함
  // getDay() : 요일(1~7)
  // 해당 달의 일수 + 첫날 요일(1~6)
  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement("div");

    if (i >= first_day.getDay()) {
      day.classList.add("calendar-day-hover");
      day.innerHTML = i - first_day.getDay() + 1; //날짜 만들기
      day.innerHTML += `<span></span>
      <span></span>
      <span></span>
      <span></span> `; // style에 넣어줬던 hover을 위해 넣어준다
      if (
        // 날짜가 오늘이라면 클래스 추가해라ㅍ
        i - first_day.getDay() + 1 === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        day.classList.add("curr-date");
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector(".month-list");

month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;
  month.onclick = () => {
    month_list.classList.remove("show");
    curr_month.value = index;
    generateCalendar(curr_month.value, curr_year.value);
  };
  month_list.appendChild(month);
});

document.querySelector("#prev-year").onclick = () => {
  --curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector("#next-year").onclick = () => {
  ++curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

let currDate = new Date();

let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);
