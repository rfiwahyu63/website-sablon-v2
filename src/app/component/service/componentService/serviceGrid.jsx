import ServiceCard from "./serviceCard";
import { services } from "../data";

export default function Service() {
  return (
    <section id="service" className="py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Layanan Kami
          </h2>

          <p className="mt-4 text-gray-600">
            Solusi sablon digital untuk kebutuhan personal,
            komunitas, hingga perusahaan.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}