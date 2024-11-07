import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/infoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/placestovisit";
import Footer from "../components/Footer";

export default function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        if (tripId) {
            getTripData();
        }
    }, [tripId]);

    /* Fetch trip information from Firebase */
    const getTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No such document found");
            toast("Trip not found");
        }
    };

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56 text-white">
            <InfoSection trip={trip}/>
            <Hotels trip={trip}/>
            <PlacesToVisit trip={trip}/>
            <Footer/>
        </div>
    );
}