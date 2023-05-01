import styles from "./index.module.scss";

function getDaysInMonth(year: number, month: number) {
  const isLeapYear = year % 4 === 0;
  let daysInMonth = 31;

  // februrary
  if (month === 1) {
    daysInMonth = isLeapYear ? 29 : 28;
  }

  // april, june, september, november
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    daysInMonth = 30;
  }

  return daysInMonth;
}

const Calendar = (props: { month?: number; year?: number }) => {
  const monthIndex = props.month ?? new Date().getMonth();
  const year = props.year ?? new Date().getFullYear();

  const daysInMonth = getDaysInMonth(year, monthIndex);
  const previousMonthDaysInMonth = getDaysInMonth(year, monthIndex - 1);
  const dayOfTheWeek = new Date(year, monthIndex, 1).getDay();

  const lastMonthMinDayPreview = previousMonthDaysInMonth - dayOfTheWeek + 1;
  let previousMonthDays = [];
  for (let i = lastMonthMinDayPreview; i <= previousMonthDaysInMonth; i++)
    previousMonthDays.push(i);

  let days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const nextMonthMaxDayPreview =
    7 - ((days.length + previousMonthDays.length) % 7);

  const nextMonthDays = Array.from(
    { length: nextMonthMaxDayPreview },
    (_, i) => i + 1
  );

  return (
    <div className={styles.calendar}>
      <div className="grid grid-cols-7">
        <li className="font-bold">Sun</li>
        <li className="font-bold">Mon</li>
        <li className="font-bold">Tue</li>
        <li className="font-bold">Wed</li>
        <li className="font-bold">Thu</li>
        <li className="font-bold">Fri</li>
        <li className="font-bold">Sat</li>
        <RenderDays days={previousMonthDays} />
        <RenderDays days={days} active />
        <RenderDays days={nextMonthDays} />
      </div>
    </div>
  );
};

function RenderDays(props: { days: number[]; active?: boolean }) {
  const { days, active } = props;

  return (
    <>
      {days.map((day) => (
        <li className={active ? "" : "text-gray-200"} key={day}>
          {day}
        </li>
      ))}
    </>
  );
}

export default Calendar;
