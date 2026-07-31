import HelpList from "@/components/help/HelpList";

export default function HelpPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

  <div className="text-center">

    <h1 className="text-4xl font-bold">
      Pusat Bantuan
    </h1>

    <p className="mt-4 text-gray-500">
      Temukan informasi mengenai pemesanan,
      pembayaran, pengiriman, dan lainnya.
    </p>

  </div>

  <div className="mt-12">
    <HelpList />
  </div>

</main>
  );
}