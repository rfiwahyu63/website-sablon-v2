import Hero from "./component/hero";
import Service from "./component/service/componentService/serviceGrid";

export default function Home() {
  return (
  <>
    <div className="flex-1 lg:ml-56">
    <Hero /> 
    </div>
    <Service />
  </>
  );
}