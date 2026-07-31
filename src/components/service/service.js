import { services } from "./serviceData";

export default function Service() {
  return (
    <section id="service" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:pl-56">
        {/* Header */}

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Layanan Kami</h2>

          <p className="mt-4 text-gray-600">
            Solusi sablon digital untuk kebutuhan personal, komunitas, hingga
            perusahaan.
          </p>
        </div>

        {/* Service List */}

        <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                const Icon = service.icon;

          return (
              <div
                key={service.id}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-xl bg-red-100 p-4 text-red-600">
                  <Icon size={32} />
                </div>

                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>

                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
