//import { Button } from "@/components/ui/button";
import { GetPlacedetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
//import { FaMapLocation } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function PlaceCardItem({ place }) {


    const [photoUrl, setPhotoUrl] = useState("/placeholder.jpeg");

    useEffect(() => {
        if (place) {
            GetPlacePhoto();
        }
    }, [place]);

    const GetPlacePhoto = async () => {
        const data={
            textQuery:place?.placeName
        }
        const result= await GetPlacedetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[6].name);
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
        console.log(result)
    };

    
  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query="+place.placeName} target="_blank">
    <div className=" border rounded-xl p-5  mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg hover:shadow-indigo-500/40 cursor-pointer">
      <img src={photoUrl} className="w-[130px] h-[130px] rounded-xl" />
      <div>
        <h2 className="font-bold text-lg text-white">{place?.placeName}</h2>
        <p className="text-sm text-gray-500">{place.placeDetails}</p>
        <h2 className="mt-2">⏱️ {place.timeToVisit}</h2>
        <h2 className="mt-2 text-green-500">💵 {place.ticketPricing}</h2>
        {/* <Button className="size-sm">
          <FaMapLocation />
        </Button> */}
      </div>
    </div>
    </Link>
  );
}

PlaceCardItem.propTypes = {
  place: PropTypes.arrayOf(
    PropTypes.shape({
      placeName: PropTypes.string.isRequired,
      placeDetails: PropTypes.string,
      placeImageUrl: PropTypes.string,
      geoCoordinates: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
      timeToVisit: PropTypes.string,
      ticketPricing: PropTypes.string,
    })
  ).isRequired,
};
