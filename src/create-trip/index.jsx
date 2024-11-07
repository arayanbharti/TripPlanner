import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIMODEL";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { doc, setDoc } from "firebase/firestore"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      getUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("User profile:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.noofDays || !formData.location || !formData.budget || !formData.traveler) {
      toast("Please fill all the details");
      return;
    }
    setLoading(true);

    const SaveAiTrip = async (TripData) => {
      setLoading(true);
      const docId = Date.now().toString();
      const user = JSON.parse(localStorage.getItem("user"));

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });

      setLoading(false);
      navigate("/view-trip/" + docId);
    };

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location.label)
      .replace("{totaldays}", formData.noofDays)
      .replace("{traveler}", formData.traveler)
      .replace("{budget}", formData.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const aiResponseText = await result.response.text();
    SaveAiTrip(aiResponseText);

    setLoading(false);
    console.log("AI Response:", aiResponseText);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl text-white">Tell us your travel preference</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium text-white">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY || ""}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        {/* Trip Duration Input */}
        <div>
          <h2 className="text-xl my-3 font-medium text-white">How many days are you planning for your trip?</h2>
          <Input placeholder="Ex. 3" type="number" onChange={(e) => handleInputChange("noofDays", e.target.value)} />
        </div>

        {/* Budget Options */}
        <div>
          <h2 className="text-xl my-3 font-medium text-white">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border border-gray-700 rounded-lg hover:shadow-lg hover:shadow-indigo-500/40 text-white ${
                  formData?.budget === item.title ? "shadow-lg shadow-indigo-500/40 text-white" : ""
                }`}
              >
                <h2 className="text-lg font-semibold">{item.icon}</h2>
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium text-white">Who do you plan to travel with on your next adventure?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border border-gray-700 rounded-lg hover:shadow-lg hover:shadow-indigo-500/40 text-white ${
                  formData?.traveler === item.people ? "shadow-lg shadow-indigo-500/40 text-white" : ""
                }`}
              >
                <h2 className="text-lg font-semibold">{item.icon}</h2>
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-20 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Generate Trip"}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog} className="text-white">
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with Google Authentication securely</p>
              <Button disabled={loading} onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;