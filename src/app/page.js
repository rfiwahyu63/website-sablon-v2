import Hero from "@/components/hero";
import Service from "@/components/service/componentService/serviceGrid";
import ReviewSection from "@/components/review/reviewSection";

export default function Home() {
  return (
    <>
      <div className="flex-1 lg:ml-56">
        <Hero />
      </div>
      <Service />
      <ReviewSection />
    </>
  );
}
