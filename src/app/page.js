import Hero from "@/components/hero";
import Service from "@/components/service/service";
import ReviewSection from "@/components/review/Review";

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
