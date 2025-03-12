import Image from "next/image";
import heroImg from "../../../public/hero-home.svg";

const Hero = () => {
  return (
    <section className="text-center py-16 px-6">
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-8 md:gap-16">
        
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Everything you need to build a Hr Management
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            K and A is your people enabler. From automation of people processes to
            creating an engaged and driven culture, Keka is all you need to
            build a good to great company.
          </p>

          
        </div>

        <div className="w-full md:w-1/2">
          <Image 
            src={heroImg} 
            alt="Illustration of team collaboration" 
            className="w-full h-auto" 
            priority 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
