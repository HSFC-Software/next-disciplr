import Header from "@/components/base/header";
import Layout from "@/components/templates/page";
import Head from "next/head";
import { useRouter } from "next/router";
import Body from "@/components/base/body";
import {
  useAutocompletePlace,
  useGetEvent,
  useGetGeocode,
  useGetNetworkMembers,
  useGetPlaceDetails,
} from "@/lib/queries";
import MemberBadge from "@/components/base/member-badge/badge";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  useAddParticipants,
  useRemoveParticipant,
  useUpdateLocation,
  useUploadMoment,
} from "@/lib/mutations";
import { EventParticipant } from "@/lib/api";
import { TbCalendar } from "react-icons/tb";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useDebounce } from "@/lib/hooks";
import { RiCheckFill, RiMapPinUserFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import Image from "next/image";

type Coordinates = {
  lat: number;
  lng: number;
};

let prevFilesLength = 0;

const EventDetails = () => {
  const mapRef = useRef<any>(null);
  const router = useRouter();
  const networkId = String(router.query.id);
  const eventId = String(router.query.event_id);

  const { mutate: uploadMoment, isLoading: isUploading } =
    useUploadMoment(eventId);
  const { mutate: addParticipant } = useAddParticipants(eventId);
  const { mutate: removeParticipant } = useRemoveParticipant(eventId);
  const { mutate: updateLocation, isLoading: isSavingLocation } = useUpdateLocation(); // prettier-ignore
  const [isChangesSaved, setIsChangesSaved] = useState(false);

  const { data: members } = useGetNetworkMembers(networkId);
  const { data: event } = useGetEvent(eventId);

  const [q, setQ] = useState("");
  const [que, setQue] = useState<any[]>([]);
  const [removeQue, setRemoveQue] = useState<string[]>([]);

  // location state
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: 14.57869398353522, lng: 121.13797599216925}); // prettier-ignore
  const debouncedLocation = useDebounce(location, 750);
  const { data: locationResult } = useAutocompletePlace(debouncedLocation);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const { data: placeDetailsResult } = useGetPlaceDetails(selectedLocation?.place_id ?? ""); // prettier-ignore
  const [showLocationResult, setShowLocationResult] = useState(false);
  const [newCoordinates, setNewCoordinates] = useState<Coordinates | null>(null); // prettier-ignore
  const { data: geoCodeResult } = useGetGeocode(newCoordinates?.lat ?? 0, newCoordinates?.lng ?? 0); // prettier-ignore
  const [showGeocodeResult, setShowGeocodeResult] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showSaveLocation, setShowSaveLocation] = useState(false);
  // end of location state

  const eventParticipants = event?.event_participants?.map(
    (participant) => participant.participant_id.id
  );

  const [imageToUpload, setImageToUpload] = useState(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const filteredMembers = members?.filter((member) => {
    const keyword = q.trim().split(" ");
    const match = keyword.some((word) => {
      word = word.toLowerCase();
      const first_name = member.disciples.first_name?.toLowerCase?.() ?? "";
      const last_name = member.disciples.last_name?.toLowerCase?.() ?? "";

      if (first_name.includes(word)) return true;
      if (last_name.includes(word)) return true;

      return false;
    });

    if (member.disciples.id)
      if (eventParticipants?.includes(member.disciples.id)) {
        return;
      }

    if (match) return true;
  });

  const handleSelectParticipant = (member: { disciples: { id: string } }) => {
    setQ("");
    setQue((prev) => [...prev, member]);
    addParticipant([member.disciples.id], {
      onSettled() {
        setQue((prev) =>
          prev.filter((item) => item.disciples.id !== member.disciples.id)
        );
      },
    });
  };

  const handleRemoveParticipant = (participant: EventParticipant) => {
    setRemoveQue((prev) => [...prev, participant.id]);
    removeParticipant(participant.id, {
      onSettled() {
        setRemoveQue((prev) => prev.filter((id) => id !== participant.id));
      },
    });
  };

  const handleSaveLocationChanges = () => {
    const lat = mapRef?.current?.getCenter?.().lat?.();
    const lng = mapRef?.current?.getCenter?.().lng?.();

    const payload = {
      event_id: eventId,
      address: location,
    };

    if (lat) (payload as any).lat = lat;
    if (lng) (payload as any).lng = lng;

    updateLocation(payload, {
      onSuccess() {
        setIsChangesSaved(true);
        setShowGeocodeResult(false);
        setShowLocationResult(false);

        setTimeout(() => {
          setShowSaveLocation(false);
          setIsChangesSaved(false);
        }, 2500);
      },
    });
  };

  useEffect(() => {
    if (!!geoCodeResult) setShowGeocodeResult(true);
  }, [geoCodeResult]);

  useEffect(() => {
    const newCoordinates = (placeDetailsResult as any)?.result?.geometry
      ?.location;
    if (newCoordinates) setCoordinates(newCoordinates);
  }, [placeDetailsResult]);

  useEffect(() => {
    if (event?.location_id) {
      setCoordinates({
        lat: event.location_id.lat,
        lng: event.location_id.lng,
      });

      setLocation(event.location_id.address);
    }
  }, [event]);

  // scrolls to newly added moment
  useEffect(() => {
    if (event?.files) {
      const currentFilesLength = event?.files?.length;

      if (currentFilesLength > prevFilesLength) {
        (controlledSwiper as any).slideTo(currentFilesLength);
      }

      prevFilesLength = currentFilesLength;
    }
  }, [event, controlledSwiper]);

  let hasResult = locationResult?.predictions?.length > 0;
  if (geoCodeResult?.length > 0) hasResult = true;

  const handleChangeImageToUpload = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageToUpload(file);
      uploadMoment(file);
    }
  };

  const handleOnDiscard = () => {
    setLocation(event?.location_id?.address ?? "");
    setShowLocationResult(false);
    setShowGeocodeResult(false);
    setShowSaveLocation(false);
    if (event?.location_id?.lat && event?.location_id?.lng) {
      setCoordinates({
        lat: event.location_id?.lat,
        lng: event.location_id?.lng,
      });
    } else {
      setCoordinates({
        lat: 14.57869398353522,
        lng: 121.13797599216925,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Event</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout activeRoute="networks">
        <Header showBackArrrow>
          <div className="flex w-full justify-between items-center">
            {event?.name}
          </div>
          {event?.date_time && (
            <span className="text-xs text-gray-500 font-normal">
              {moment(event?.date_time).format("LLLL")}
            </span>
          )}
        </Header>
        <Body>
          <section className="px-7">
            <label className="block uppercase text-sm text-[#686777] mb-3 font-semibold">
              Participants
            </label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Participant"
              className="bg-[#f2f2f8] w-full px-4 py-3 rounded-lg outline-none"
            />
            <div className="relative">
              {q && (
                <div className="max-h-[180px] overflow-y-auto py-2 px-4 rounded-xl absolute bg-white w-full z-20">
                  {filteredMembers?.map((member) => {
                    const name = `${member.disciples.first_name ?? ""} ${
                      member.disciples.last_name ?? ""
                    }`.trim();
                    return (
                      <li
                        onClick={() => handleSelectParticipant(member as any)}
                        className="block py-2 pl-2 cursor-pointer"
                        key={member.disciples.id}
                      >
                        {name}
                      </li>
                    );
                  })}
                  <div className="text-xs text-gray-400 mb-2 mt-4">
                    <strong>Tap</strong> on participant to select.
                  </div>
                </div>
              )}
              {q && filteredMembers?.length === 0 && (
                <div className="max-h-[180px] overflow-y-auto py-2 absolute bg-white w-full z-20 py-4 text-gray-400 text-sm">
                  No participant available.
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-3 flex-wrap gap-x-3 gap-y-2">
              {event?.event_participants?.map((participant) => (
                <span
                  style={{
                    opacity: removeQue.includes(participant.id) ? 0.5 : 1,
                  }}
                  key={participant.id}
                >
                  <MemberBadge
                    editable
                    onRemove={() => handleRemoveParticipant(participant)}
                    id={participant.participant_id.id}
                    status={participant.participant_id.status}
                    first_name={participant.participant_id.first_name}
                    last_name={participant.participant_id.last_name}
                  />
                </span>
              ))}
              <>
                {que
                  ?.filter?.((member) => {
                    if (eventParticipants?.includes(member?.disciples?.id))
                      return false;
                    return true;
                  })
                  ?.map((member) => (
                    <MemberBadge
                      key={member?.disciples.id}
                      id={member?.disciples.id}
                      status={member?.disciples.status}
                      first_name={member?.disciples.first_name}
                      last_name={member?.disciples.last_name}
                    />
                  ))}
              </>
            </div>
          </section>
          <section className="mt-12">
            <div className="px-7">
              <label className="block uppercase text-sm text-[#686777] mb-3 font-semibold">
                Location
              </label>
            </div>
            {!!event && (
              <div className="bg-[#f2f2f8] h-[280px] my-7 flex justify-center items-center relative">
                <GoogleMap
                  clickableIcons={false}
                  onLoad={(map) => {
                    mapRef.current = map;
                    setShowIcon(true);
                  }}
                  onDragEnd={() => {
                    const lat = mapRef?.current?.getCenter?.().lat?.();
                    const lng = mapRef?.current?.getCenter?.().lng?.();

                    setNewCoordinates({ lat, lng });
                    setShowSaveLocation(true);
                  }}
                  mapContainerStyle={{ width: "100%", height: 280 }}
                  center={coordinates}
                  zoom={17}
                />
                {showIcon && (
                  <div className="absolute">
                    <span className="text-4xl text-red-500 shadow">
                      <RiMapPinUserFill />
                    </span>
                  </div>
                )}
              </div>
            )}
            <div className="px-7">
              {showSaveLocation && (
                <div className="flex justify-between">
                  <span />
                  {isChangesSaved ? (
                    <div className="text-[#15AA2C] text-xs flex gap-2 items-center">
                      <RiCheckFill />
                      Changes successfully applied
                    </div>
                  ) : (
                    <button
                      disabled={isSavingLocation}
                      onClick={handleSaveLocationChanges}
                      className="hover:underline text-[#6e7ac5] disabled:opacity-50"
                    >
                      <span className="text-xs">Save Changes?</span>
                    </button>
                  )}
                </div>
              )}
              <input
                placeholder="Tap to Search Location"
                className="w-full py-3 rounded-lg outline-none"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowLocationResult(true);
                  setNewCoordinates({ lat: 0, lng: 0 });
                  setShowSaveLocation(true);
                }}
              />
            </div>
            <div className="relative">
              {(showLocationResult || showGeocodeResult) && (
                <div className="max-h-[180px] overflow-y-auto py-2 px-4 rounded-xl absolute bg-white w-full z-20">
                  {hasResult && (
                    <div className="text-xs text-gray-400 mb-2 px-3 flex justify-between">
                      <span>
                        Suggestions: <strong>Tap</strong> to select
                      </span>
                      <button
                        onClick={handleOnDiscard}
                        className="text-gray-400 font-medium hover:underline"
                      >
                        Discard
                      </button>
                    </div>
                  )}
                  {showLocationResult && (
                    <>
                      {(locationResult as any)?.predictions?.map?.(
                        (result: any) => {
                          return (
                            <li
                              onClick={() => {
                                setSelectedLocation(result);
                                setLocation(result?.description);
                                setShowLocationResult(false);
                                setShowSaveLocation(true);
                              }}
                              key={result?.place_id}
                              className="block py-2 px-3 cursor-pointer"
                            >
                              {result?.description}
                            </li>
                          );
                        }
                      )}
                    </>
                  )}
                  {showGeocodeResult && (
                    <>
                      {geoCodeResult?.map?.((result: any) => {
                        return (
                          <li
                            onClick={() => {
                              setSelectedLocation(result);
                              setLocation(result?.description);
                              setShowLocationResult(false);
                              setNewCoordinates({ lat: 0, lng: 0 });
                              setLocation(result?.formatted_address);
                              setShowSaveLocation(true);
                              setShowGeocodeResult(false);
                            }}
                            key={`geocode-${result?.place_id}`}
                            className="block py-2 px-3 cursor-pointer"
                          >
                            {result?.formatted_address}
                          </li>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </div>
          </section>
          <section className="mt-12">
            <div className="px-7 flex w-full justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <label className="block uppercase text-sm text-[#686777] font-semibold">
                  Moments
                </label>
                <button
                  onClick={() =>
                    document.getElementById("moment-input")?.click()
                  }
                  className="px-2 bg-[#6e7ac5] text-[#F5F5F5] rounded-lg text-lg"
                >
                  +
                </button>
              </div>
              <div>
                {isUploading && (
                  <div className="text-xs text-gray-400 flex gap-2 items-center">
                    <span className="grow max-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {(imageToUpload as any)?.name ?? ""}
                    </span>
                    <span className="text-gray-400 shrink-0">
                      <Image
                        src="/loading.svg"
                        alt="Spinner"
                        width={12}
                        height={12}
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-[#f2f2f8] h-[280px] my-7">
              <Swiper
                onSwiper={setControlledSwiper as any}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                  reverseDirection: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={50}
              >
                {event?.files?.map?.((file) => {
                  return (
                    <SwiperSlide key={file.id} style={{ height: 280 }}>
                      <div>
                        <img
                          alt="any"
                          src={file.url}
                          className="h-[280px] w-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
                {/* <SwiperSlide style={{ height: 280 }}>Slide 2</SwiperSlide>
                <SwiperSlide style={{ height: 280 }}>Slide 3</SwiperSlide>
                <SwiperSlide style={{ height: 280 }}>Slide 4</SwiperSlide> */}
              </Swiper>
            </div>
            <input
              onChange={handleChangeImageToUpload}
              id="moment-input"
              type="file"
              className="hidden"
            />
          </section>

          <div className="flex justify-center mt-12">
            <button className="flex gap-2 rounded-xl p-3 px-5 bg-[#F5F5F5] items-center text-[#FF5A1F]">
              <span className="text-2xl">
                <TbCalendar />
              </span>
              <div className="font-semibold">REMOVE THIS EVENT</div>
            </button>
          </div>
        </Body>
      </Layout>
    </>
  );
};

export default EventDetails;
