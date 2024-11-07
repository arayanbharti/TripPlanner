import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";


export default function MyTrip() {
  const navigate = useNavigate();
  const [userTrips,setUserTrips]=useState([]);

  useEffect(() => {
    GetUserTrip();
  }, []);
  /** 
  * @returns
  */

  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }
    setUserTrips([]);

    try {
      const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(preVal=>[...preVal,doc.data()])
      });
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return <div className="text-white sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
    <h2 className="font-bold text-3xl">My Trips</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips?.length>0?userTrips.map((trip,index)=>(
            <UserTripCard trip={trip} key={index}  />
            
            

        )):[1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl">


            </div>
        ))}
    </div>
  </div>;
}