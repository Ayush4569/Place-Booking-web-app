import axios from "axios";
import React, { useState, useEffect } from "react";
import AccountNav from "./AccountNav";
import { Link } from "react-router-dom";
import PlaceImg from "./PlaceImg";
import { useLoading } from "../context/Loading";
import BookingDates from "./BookingDates";
function MyBookings() {
  const [myBookings, setMyBookings] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    showLoading()
    axios
      .get("/trips/my-bookings")
      .then((response) => {
        setMyBookings(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hideLoading()
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {myBookings.length > 0 ? (
          myBookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className="flex gap-4 mb-2 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-xl">
                  <BookingDates
                    booking={booking}
                    className="my-2 text-gray-500"
                  />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    <span className="text-xl">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <h2> No bookings found.Book your place now!!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
