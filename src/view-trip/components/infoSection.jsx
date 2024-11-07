import { Button } from "@/components/ui/button";
import { GetPlacedetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaRegShareSquare } from "react-icons/fa";


export default function InfoSection({ trip }) {
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

    return (
        <div className="text-white">
            <img
                className="h-[340px] w-full object-cover rounded-xl"
                src={photoUrl}
                alt="Trip Image"
            />
            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl text-white">
                        {trip?.userSelection?.location?.label || "Location not available"}
                    </h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-md">
                            📅{" "}
                            {trip?.userSelection?.noofDays !== undefined
                                ? `${trip.userSelection.noofDays} Days`
                                : "Number of days not specified"}
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-md">
                            💰{" "}
                            {trip?.userSelection?.budget
                                ? `${trip.userSelection.budget} Budget`
                                : "Budget not specified"}
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-md">
                            🥂{" "}
                            {trip?.userSelection?.traveler
                                ? trip.userSelection.traveler
                                : "Traveler information not specified"}
                        </h2>
                    </div>
                </div>
                <Button>
                    <FaRegShareSquare />
                </Button>
            </div>
        </div>
    );
}

InfoSection.propTypes = {
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