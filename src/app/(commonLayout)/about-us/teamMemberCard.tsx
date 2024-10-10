
import teamImage from "@/assets/images.jpg";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const Team_Member_Card = ({ member }:{member:{name:string,role:string}}) => {
  const { name, role } = member;

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-shadow duration-300 ease-in-out">
      <div className="flex justify-center items-center overflow-hidden rounded-md">
        <Image
          src={teamImage}
          alt={name}
          className="rounded-md transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className="text-center space-y-2 mt-4">
        <h3 className="text-2xl font-semibold text-gray-800 hover:text-gray-900">
          {name}
        </h3>
        <span className="text-gray-500">{role}</span>
        <div className="flex items-center justify-center gap-5 mt-3">
          <Facebook className="text-blue-600 hover:text-blue-800 transition-colors duration-200" />
          <Twitter className="text-blue-400 hover:text-blue-600 transition-colors duration-200" />
          <Instagram className="text-pink-600 hover:text-pink-800 transition-colors duration-200" />
          <Linkedin className="text-blue-600 hover:text-blue-800 transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
};

export default Team_Member_Card;
