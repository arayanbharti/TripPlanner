import PropTypes from 'prop-types';
import PlaceCardItem from './PlaceCardItem';

export default function PlacesToVisit({ trip }) {
    return (
        <div className="mt-5">
            <h2 className="font-bold text-xl mb-5">Places to Visit</h2>
            {trip?.tripData?.itinerary?.map((item) => (
                <div key={item.day}>
                    <h2 className="font-medium text-lg">Day {item.day}</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {item?.plan?.map((place,index) => (
                            <div key={index} className="my-3">
                                <h2 className="font-medium text-sm text-orange-600">
                                    {place.timeToVisit}
                                </h2>
                                <PlaceCardItem place={place} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

PlacesToVisit.propTypes = {
    trip: PropTypes.shape({
        tripData: PropTypes.shape({
            itinerary: PropTypes.arrayOf(
                PropTypes.shape({
                    day: PropTypes.number.isRequired,
                    dayPlan: PropTypes.arrayOf(
                        PropTypes.shape({
                            placeName: PropTypes.string.isRequired,
                            placeDetails: PropTypes.string,
                            placeImageUrl: PropTypes.string,
                            geoCoordinates: PropTypes.shape({
                                latitude: PropTypes.number,
                                longitude: PropTypes.number,
                            }),
                            ticketPricing: PropTypes.string,
                            timeToVisit: PropTypes.string,
                        })
                    ).isRequired,
                })
            ).isRequired,
        }).isRequired,
    }).isRequired,
};