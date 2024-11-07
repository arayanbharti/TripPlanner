import { useEffect, useState } from "react";
import { Button } from "../button";
import { FcGoogle } from "react-icons/fc";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
  } from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  
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
        window.location.reload()
        
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };


  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg"></img>
      <div>

        {user ? (
          <div className="flex items-center gap-3">
            <a href='https://trip-planner-1.vercel.app/create-trip'>
            <Button variant="outline" className="rounded-full">
             + Create Trip
            </Button>
            </a>
            <a href='https://trip-planner-1.vercel.app//my-trips'>
            <Button variant="outline" className="rounded-full">
              My trips
            </Button>
            </a>
            
            <Popover>
              <PopoverTrigger><img
              src={user.picture}
              alt="not loading"
              className="h-[35px] w-[35px] rounded-full"
            /></PopoverTrigger>
              <PopoverContent>
                <h2 onClick={()=>{
                             googleLogout();
                             localStorage.removeItem("user"); 
                             window.location.href = "/";
                       
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={()=>{setOpenDialog(true)}}>Sign in here</Button>
        )}
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
