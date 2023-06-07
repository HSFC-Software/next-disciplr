import Calendar from "@/components/modules/calendar";

import Header from "@/components/base/header";
import Layout from "@/components/templates/page";
import { useGetEvents, useGetNetworkDetails } from "@/lib/queries";
import Head from "next/head";
import { useRouter } from "next/router";
import Body from "@/components/base/body";
import DatePicker, { months } from "@/components/modules/datepicker";
import { useEffect, useState } from "react";
import BreadCrumbs from "@/components/modules/breadcrumbs";
import { State, store } from "@/lib/models";
import { EventsResponse } from "@/lib/api";
import { useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";

const Events = () => {
  const router = useRouter();
  const { data: network } = useGetNetworkDetails(String(router.query.id));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());
  const selectedDate = useSelector<State, string>(
    (state) => state.App.selectedEventDate
  );

  const date = new Date(year, month, 1);

  const { data, isLoading, isError } = useGetEvents({
    network_id: String(router.query.id),
    type: ["CELLGROUP", "CLOSED_CELL", "CONSOLIDATION", "PID"],
    date,
  });

  // group events by date
  const eventsByDate = data?.reduce((acc, event) => {
    const date = new Date(event.date_time);
    const key = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(event);
    return acc;
  }, {} as { [key: string]: EventsResponse[] });

  useEffect(() => {
    if (network?.id) {
      store.dispatch.BreadCrumbs.addPage({
        id: "network-events",
        title: network.name + " Events",
        url: window.origin + router.asPath,
      });
    }
  }, [network, router]);

  const eventDates = data?.map((event) => {
    const date = new Date(event.date_time);
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  });

  const todaysEvents = eventsByDate?.[selectedDate];

  return (
    <>
      <DatePicker
        includeDate={false}
        isVisible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onConfirm={(value) => {
          setMonth(value.monthIndex);
          setYear(value.year);
        }}
      />
      <Head>
        <title>Disciplr</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activeRoute="networks">
        <Header showBackArrrow onBack={() => router.back()}>
          <div className="flex w-full justify-between items-center">
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {network?.name} Events
            </span>
          </div>
        </Header>
        <Body>
          <div className="px-7">
            <BreadCrumbs activePageId="network-events" />
          </div>
          <div className="text-right text-[#6e7ac5] text-lg my-7 pr-10">
            <button
              onClick={() => setShowDatePicker(true)}
              className="border-b border-[#d0d5f6] "
            >
              {months[month]} {year}
            </button>
          </div>
          <section className="px-7">
            <Calendar year={year} month={month} eventDates={eventDates} />
          </section>
          <section className="px-7 mt-7">
            <header className="flex justify-between">
              <span className="text-[#686777]">TODAY&apos;S EVENTS</span>
              <Link
                href={`/networks/${router.query.id}/events/create`}
                className="text-[#686777]"
              >
                Add New{" "}
                <span className="ml-2 px-2 bg-[#6e7ac5] text-white rounded-lg text-lg">
                  +
                </span>
              </Link>
            </header>
            {!todaysEvents && (
              <div className="mt-7 text-gray-400">No event for the day</div>
            )}
            <div className="flex flex-col gap-y-4 mt-7">
              {todaysEvents?.map((event) => {
                const time = moment(event.date_time).format("hh:mm A");
                return (
                  <li
                    onClick={() =>
                      router.push(
                        `/networks/${router.query.id}/events/${event.id}`
                      )
                    }
                    className="flex justify-between relative gap-4 cursor-pointer"
                    key={event.id}
                  >
                    <span className="flex items-center gap-3 pl-2">
                      <div className="h-full w-[4px] bg-[#FB5D64] shrink-0 rounded-[3px]" />
                      <span className="grow">{event.name}</span>
                    </span>
                    <span className="shrink-0">{time}</span>
                  </li>
                );
              })}
            </div>
          </section>
          {/* <section className="px-7 mt-7">
            <header className="flex justify-between">
              <span className="text-[#686777]">THIS MONTH&apos;S EVENTS</span>
            </header>
            <div className="flex flex-col gap-y-4 mt-7 opacity-50">
              {eventDates?.map((event) => {
                const todaysEvents = eventsByDate?.[event];
                return (
                  <div key={event}>
                    <header className="text-xs text-gray-400 mb-4">
                      {event}
                    </header>
                    <div className="flex flex-col gap-3">
                      {todaysEvents?.map((event) => {
                        const time = moment(event.date_time).format("hh:mm A");
                        return (
                          <li
                            className="flex justify-between relative gap-4"
                            key={event.id}
                          >
                            <span className="flex items-center gap-3 pl-2">
                              <div className="h-full w-[4px] bg-[#FB5D64] shrink-0 rounded-[3px]" />
                              <span className="grow">{event.name}</span>
                            </span>
                            <span className="shrink-0">{time}</span>
                          </li>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section> */}
        </Body>
      </Layout>
    </>
  );
};

export default Events;
