import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";

// const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";
const session_token = "0909e5ab-6826-40d1-88c3-de402d40f630";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";

function AutocompleteAddress() {
  const [source, setSource] = useState<any>();
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

  const { soruceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );

  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDistination] = useState<any>();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

  const getAddressList = async () => {
    setAddressList([]);
    const query = sourceChange ? source : destination;
    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setAddressList(result);
  };

  const onSourceAddressClick = async (item: any) => {
    setSource(item.full_address);
    setAddressList([]);
    setSourceChange(false);
    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();

    setSourceCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  const onDestinationAddressClick = async (item: any) => {
    setDistination(item.full_address);
    setAddressList([]);
    setDestinationChange(false);
    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();

    setDestinationCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  return (
    <div className="">
      {/* Source Input */}
      <div className="relative">
        <label className="text-gray-400 text-[13px]">Where From?</label>
        <div className="relative w-full">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Okefia, Osogbo, Nigeria"
            className="bg-white p-2 pl-10 border-[1px] w-full text-black rounded-md outline-none focus:border-yellow-300 text-[14px]"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setSourceChange(true);
            }}
            required
          />
        </div>

        {addressList?.suggestions && sourceChange ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer text-black"
                onClick={() => {
                  onSourceAddressClick(item);
                }}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>

      {/* Destination Input */}
      <div className="relative">
        <label className="text-gray-400 text-[13px]">Where To?</label>
        <div className="relative w-full">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Olaiya Motor Garrage, Gbogan Street, Osogbo"
            type="text"
            className="bg-white p-2 pl-10 border-[1px] w-full text-black rounded-md outline-none focus:border-yellow-300 text-[14px]"
            value={destination}
            onChange={(e) => {
              setDistination(e.target.value);
              setDestinationChange(true);
            }}
            required
          />
        </div>

        {addressList?.suggestions && destinationChange ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer text-black"
                onClick={() => {
                  onDestinationAddressClick(item);
                }}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AutocompleteAddress;
