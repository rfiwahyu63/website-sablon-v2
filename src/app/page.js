import Hero from "@/components/hero";
import Service from "@/components/service/service";
import ReviewSection from "@/components/review/Review";
import TrackOrderSearch from "@/components/trackingOrder/page"

export default function Home() {
  return (
    <>
      <div className="flex-1 lg:ml-56">
        <TrackOrderSearch />
        <Hero />
      </div>
      <Service />
      <ReviewSection />
    </>
  );
}
