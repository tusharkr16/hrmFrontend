import Image from "next/image";
import img from "../../../public/light.png"

const NoPendingRequests = () => {
  return (
    <div className="flex flex-col  h-screen bg-gray-50">
      <div className="relative w-full max-w-5xl p-6 text-center">
        

        <p className="text-gray-500 text-2xl mb-4 font-semibold mt-48">
          No Pending Requests
        </p>
        <div className="">
          <Image
            src={img} 
            alt="Mascot Character"
            width={800}
            height={800}
          />
        </div>
      </div>
    </div>
  );
};

export default NoPendingRequests;
