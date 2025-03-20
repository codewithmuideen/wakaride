import React, { useContext, useState } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import DistanceTime from "./DistanceTime";
import { useRouter } from "next/navigation";
import { selectedCarAmountContext } from "@/context/SelectedCarAmount";

function Booking() {
  const screenHight =
    typeof window !== "undefined" ? window.innerHeight * 0.72 : 0;
  const { carAmount, setCarAmount } = useContext(selectedCarAmountContext);

  const [showContactModal, setShowContactModal] = useState(false);

  //const router: any = useRouter(); // No need for router here, remove or comment out if not using it


  const handleBookClick = () => {
    // Instead of routing to payment, show the modal
    setShowContactModal(true);
  };

  const closeModal = () => {
    setShowContactModal(false);
  };

  return (
    <div className="p-5 ">
      <h2 className="text-[20px] font-semibold">
        Book Your Ride Now - All in One
      </h2>
      <p>Okada, Luxury Cab and Korope Mini Bus</p>
      <br />
      <div
        className="border-[1px] p-5 
        rounded-md"
      >
        <AutocompleteAddress />

        <Cars />
        <Cards />

        <button
          type="submit"
          className={`w-full
         bg-yellow-400
        p-1 rounded-md
        mt-4 ${!carAmount ? "bg-gray-200" : null} `}
          onClick={handleBookClick}
          disabled={!carAmount} // Disable the button if carAmount is zero
        >
          Book
        </button>

        {/* Fare Estimate Display */}
        <div className="mt-4">
          {/* <div className="flex justify-between">
            <div>
              <span className="font-semibold"><input type="radio" name="trip" checked />Single Trip</span>
            </div>
            <div>
              <span className="font-semibold"><input type="radio" name="trip" />Round Trip</span>
            </div>
          </div> */}
          <br />
          <div className="flex justify-between mt-2">
            <div>
              <span className="font-semibold">Fare Estimate:</span>
              <hr />
            </div>
          </div>
          <div className="flex justify-between">
            
            <div>
              <span className="text-sm">1 min</span>
              <p className="text-xs text-black-500"><b>Est Arrival</b></p>
            </div>
            <div>
              <span className="text-sm">0.3 km</span>
              <p className="text-xs text-black-500"><b>Distance</b></p>
            </div>
            <div>
              <span className="text-sm">₦50.00</span>
              <p className="text-xs text-black-500"><b>Distance</b></p>
            </div>
          </div>
          <hr />
        </div>
      </div>

      {/* Contact Admin Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative p-5 bg-white rounded-md max-w-md w-full">
            <h3
              className="text-lg font-semibold"
              style={{ color: "red" }}
            >
              There was an error while processing your request.{" "}
            </h3>
            <p className="text-gray-600 mt-2">
              To proceed with your booking, kindly contact Waka For Me Admin for
              further support.
            </p>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;