import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export const months: Month[] = [
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

const dates = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 2000 }, (_, i) => 1800 + i);

export type DateValue = {
  month: Month;
  date: number;
  year: number;
  monthIndex: number;
};

type DatePickerProps = {
  onConfirm: (value: DateValue) => void;
  onClose: () => void;
  includeDate?: boolean;
};

export default function DatePicker(
  props: { isVisible: boolean } & DatePickerProps
) {
  if (props.isVisible) {
    return <Picker {...props} />;
  }

  return null;
}

function Picker(props: DatePickerProps) {
  let includeDate = true;

  if (props.includeDate === false) {
    includeDate = false;
  }

  const [value, setValue] = useState({
    month: months[new Date().getMonth()],
    date: new Date().getDate(),
    year: new Date().getFullYear(),
    monthIndex: new Date().getMonth(),
  });

  const handleScrollDebounced = debounce((e) => {
    const scrollTop = e.target?.scrollTop;
    const optionEl = e?.target?.children?.[1];

    const elIndex = Math.floor(scrollTop / optionEl.offsetHeight);
    const maxIndex = e?.target?.children?.length - 3; // -3 because of the first and last element

    const centerEl = e?.target?.children?.[elIndex + 1];

    let selectedEl: HTMLElement;

    if (elIndex >= maxIndex) {
      const lastEl = e?.target?.children?.[e?.target?.children?.length - 2];
      selectedEl = lastEl;
    } else {
      selectedEl = centerEl;
    }

    selectedEl?.scrollIntoView({ behavior: "smooth", block: "center" });

    const children = e?.target?.children;
    Array.from(children).forEach((el: any) => {
      if (el === selectedEl) return; // skip selected element (to avoid unnecessary re-rendering
      el?.classList.remove("text-gray-800");
      el?.classList.add("text-gray-400");
    });

    // apply styles to selected element
    selectedEl?.classList.remove("text-gray-400");
    selectedEl?.classList.add("text-gray-800");

    // apply values
    const key = e.target.id.split("-container").join("");

    const payload = {
      [key]: selectedEl?.innerText,
    };

    if (key === "month") {
      (payload as any).monthIndex = months.indexOf(
        selectedEl?.innerText as Month
      );
    }

    setValue((prev) => ({ ...prev, ...payload }));
  }, 300);

  function handleConfirm() {
    props.onConfirm?.(value);
    props?.onClose?.();
  }

  // add scroll event
  useEffect(() => {
    const containers = ["month", "date", "year"];
    containers.forEach((key) => {
      const element = document.getElementById(`${key}-container`);
      element?.addEventListener("scroll", handleScrollDebounced);
    });
  }, []);

  // initialize height
  useEffect(() => {
    const datePickerEl = document.getElementById("date-picker");
    if (datePickerEl) {
      datePickerEl.style.height = `${window.innerHeight / 2.5}px`;
    }
  }, []);

  // initialize view
  useEffect(() => {
    const defaultMonth = months[new Date().getMonth()];
    const monthEl = document.getElementById("month-container");

    for (let i = 0; i < months.length; i++) {
      const month = months[i];
      if (month === defaultMonth) {
        monthEl?.children[i + 1].scrollIntoView({ block: "center" });
        monthEl?.children[i + 1].classList.add("text-gray-800");
        break;
      }
    }

    const dateEl = document.getElementById("date-container");
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      if (date === new Date().getDate()) {
        dateEl?.children[i + 1].scrollIntoView({ block: "center" });
        dateEl?.children[i + 1].classList.add("text-gray-800");
        break;
      }
    }

    const yearEl = document.getElementById("year-container");
    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      if (year === new Date().getFullYear()) {
        yearEl?.children[i + 1].scrollIntoView({ block: "center" });
        yearEl?.children[i + 1].classList.add("text-gray-800");
        break;
      }
    }
  }, []);

  return (
    <div
      style={{
        zIndex: 200,
      }}
      className="fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-end"
    >
      <div className="flex items-center p-5 bg-[#F8F8F9] rounded-t-2xl border-[#EBEAED] border-b">
        <button onClick={() => props?.onClose()} className="text-gray-400">
          Cancel
        </button>
        <div className="grow text-center font-medium">Select Date</div>
        <button onClick={handleConfirm} className="text-[#6474dc]">
          Confirm
        </button>
      </div>
      <div className="bg-[#F8F8F9]">
        <div
          id="date-picker"
          className={`relative w-screen flex justify-center gap-4 ml-[-28px]`}
        >
          <div
            id="month-container"
            className="month overflow-y-auto hide-scrollbar hide-scrollbar-webkit"
          >
            <div className="h-[50%]" />
            {months.map((m, i) => {
              return (
                <div
                  className="py-2 text-gray-400 text-xl text-right"
                  key={m}
                  id={`month-${i}`}
                >
                  {m}
                </div>
              );
            })}
            <div className="h-[50%]" />
          </div>
          {includeDate && (
            <div
              id="date-container"
              className="date overflow-y-auto hide-scrollbar hide-scrollbar-webkit px-4"
            >
              <div className="h-[50%]" />
              {dates.map((d) => {
                return (
                  <div
                    className="py-2 text-gray-400 text-center text-xl"
                    key={d}
                  >
                    {d}
                  </div>
                );
              })}
              <div className="h-[50%]" />
            </div>
          )}
          <div
            id="year-container"
            className="year overflow-y-auto hide-scrollbar hide-scrollbar-webkit"
          >
            <div className="h-[50%]" />
            {years.map((y) => {
              return (
                <div className="py-2 text-gray-400 text-xl" key={y}>
                  {y}
                </div>
              );
            })}
            <div className="h-[50%]" />
          </div>
          <div
            id="select-area"
            className={`h-[60px] w-full border-t border-b absolute border-[#EBEAED] top-0 bottom-0 my-auto pointer-events-none left-[28px]`}
          />
        </div>
      </div>
    </div>
  );
}
