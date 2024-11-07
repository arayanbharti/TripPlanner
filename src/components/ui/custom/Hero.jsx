import { Link } from "react-router-dom";
import { Button } from "../button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 mt-32 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff66cc] to-[#66e0ff] leading-tight">
        Discover Your New Adventure With Us
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
        Your personal Trip Planner to make every journey memorable and easy.
      </p>
      <Link to="/create-trip">
        <Button className="px-10 py-4 mt-6 text-lg font-semibold rounded-full bg-gradient-to-r from-[#ff66cc] to-[#66e0ff] text-white hover:scale-105 transform transition-transform duration-300 shadow-lg">
          Get Started
        </Button>
      </Link>
    </div>
  );
}