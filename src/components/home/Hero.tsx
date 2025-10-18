import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const Hero = () => {
    return (
        <section className="bg-orange-50 px-2">
            <div className="container 2xl:max-w-[1350px] mx-auto  flex  justify-between items-center h-screen ">
                <div className="flex-1">
                    <HeroContent />
                </div>
                <div className="hidden md:block">
                    <HeroImage />
                </div>
            </div>
        </section>
    );
};

export default Hero;
