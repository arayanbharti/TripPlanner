import { GetPlacedetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';


function HotelCard({ hotel }) {

    const [photoUrl, setPhotoUrl] = useState("/placeholder.jpeg");

    useEffect(() => {
        if (hotel) {
            GetPlacePhoto();
        }
    }, [hotel]);
    const GetPlacePhoto = async () => {
        const data={
            textQuery:hotel?.hotelName
        }
        const result= await GetPlacedetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[6].name);
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
        console.log(result)
    };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl} className="rounded-xl h-[180px]" alt="Hotel"  />
        <div className="my-3 flex flex-col gap-2">
          <h2 className="text-white font-medium">{hotel.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel.hotelAddress}</h2>
          <h2 className="text-sm text-green-500">💰 {hotel.price}</h2>
          <h2 className="text-sm">⭐{hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    hotelName: PropTypes.string.isRequired,
    hotelAddress: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default HotelCard;