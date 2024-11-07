import { GetPlacedetails ,PHOTO_REF_URL} from "@/service/GlobalApi";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function UserTripCard({trip}){

    const [photoUrl, setPhotoUrl] = useState("/placeholder.jpeg");

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);
    const GetPlacePhoto = async () => {
        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result= await GetPlacedetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[6].name);
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
        console.log(result)
    };





    return(
        <Link to={'/view-trip/'+trip?.id}>
            <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl} className="object-cover rounded-xl h-[220px] w-[300px]"/>
        <div>
            <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
            <h2 className="text-sm text-gray-500">{trip?.userSelection.noofDays} Days Trip with {trip?.userSelection?.budget}</h2>
        </div>
        </div>
        </Link>

    )
}
UserTripCard.propTypes = {
    trip: PropTypes.shape({
        userSelection: PropTypes.shape({
            location: PropTypes.shape({
                label: PropTypes.string,
            }),
            noofDays: PropTypes.number,
            budget: PropTypes.string,
            traveler: PropTypes.string,
        }),
    }),
};