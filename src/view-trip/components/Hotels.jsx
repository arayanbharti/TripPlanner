import PropTypes from "prop-types";

import HotelCard from "./HotelCard";

export default function Hotels({ trip }) {
  // Check if trip and trip.tripData are defined to avoid accessing properties of null
  if (!trip || !trip.tripData) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
        <p>No hotel data available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip.tripData.hotels.map((hotel,index) => (
            <HotelCard hotel={hotel} key={index}/>
            
        ))}
      </div>
    </div>
  );
}

Hotels.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      hotels: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
};