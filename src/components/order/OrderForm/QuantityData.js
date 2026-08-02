"use client";

import orderData from "../OrderData";

export default function QuantityData({
  formData,
  setFormData,
}) {
  const jenisOrder = formData.jenisOrder;
  const bahan = formData.bahan;

  const isCustomerMaterial =
    bahan === "bahan-customer";

  const isTotebag =
    jenisOrder === "totebag";

  const isHoodie =
    jenisOrder === "hoodie";

  const isKaos =
    jenisOrder === "kaos";


  /* SIZE */

  const sizes =
    orderData.size[jenisOrder] || [];


  /* QUANTITY */

  const getQuantity = (
    lengan,
    size,
  ) => {
    return (
      formData.ukuran?.[lengan]?.[
        size
      ] || 0
    );
  };


  const getHoodieQuantity = (
    size,
  ) => {
    return (
      formData.ukuran?.[size] || 0
    );
  };


  const getTotalLengan = (
    lengan,
  ) => {
    return Object.values(
      formData.ukuran?.[lengan] ||
        {},
    ).reduce(
      (total, jumlah) =>
        total +
        Number(jumlah || 0),
      0,
    );
  };


  /* UPDATE KAOS */

  const handleKaosQuantityChange = (
    lengan,
    size,
    value,
  ) => {
    const quantity = Math.max(
      0,
      Number(value) || 0,
    );

    setFormData((prev) => ({
      ...prev,

      ukuran: {
        ...prev.ukuran,

        [lengan]: {
          ...prev.ukuran?.[lengan],

          [size]: quantity,
        },
      },
    }));
  };

/* UPDATE HOODIE */

  const handleHoodieQuantityChange = (
    size,
    value,
  ) => {
    const quantity = Math.max(
      0,
      Number(value) || 0,
    );

    setFormData((prev) => ({
      ...prev,

      ukuran: {
        ...prev.ukuran,

        [size]: quantity,
      },
    }));
  };


  /* UPDATE JUMLAH CUSTOMER / TOTEBAG */

  const handleJumlahChange = (
    value,
  ) => {
    const quantity = Math.max(
      0,
      Number(value) || 0,
    );

    setFormData((prev) => ({
      ...prev,
      jumlah: quantity,
    }));
  };


  /* CUSTOMER MATERIAL */

  if (isCustomerMaterial) {
    const jumlah =
      formData.jumlah || 0;

    return (
      <div className="space-y-6">

        <div>
          <h2 className="text-sm font-medium text-gray-700">
            Jumlah Cetak
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Masukkan jumlah produk yang ingin dicetak.
          </p>
        </div>


        <div className="rounded-xl border border-gray-200 p-4">

          <label
            htmlFor="jumlah-cetak"
            className="mb-2 block text-xs font-medium text-gray-500"
          >
            Jumlah Cetak
          </label>

          <input
            id="jumlah-cetak"
            type="number"
            min="1"
            value={jumlah}
            onChange={(e) =>
              handleJumlahChange(
                e.target.value,
              )
            }
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-900"
          />

        </div>


        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-4">

          <span className="text-sm font-medium text-gray-600">
            Total Cetak
          </span>

          <span className="text-lg font-bold text-gray-900">
            {jumlah} pcs
          </span>

        </div>

      </div>
    );
  }


  /* TOTEBAG */

  if (isTotebag) {
    const jumlah =
      formData.jumlah || 0;

    return (
      <div className="space-y-6">

        <div>
          <h2 className="text-sm font-medium text-gray-700">
            Jumlah Pesanan
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Masukkan jumlah totebag yang ingin dipesan.
          </p>
        </div>


        <div className="rounded-xl border border-gray-200 p-4">

          <label
            htmlFor="jumlah-totebag"
            className="mb-2 block text-xs font-medium text-gray-500"
          >
            Jumlah Totebag
          </label>

          <input
            id="jumlah-totebag"
            type="number"
            min="1"
            value={jumlah}
            onChange={(e) =>
              handleJumlahChange(
                e.target.value,
              )
            }
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-900"
          />

        </div>


        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-4">

          <span className="text-sm font-medium text-gray-600">
            Total Pesanan
          </span>

          <span className="text-lg font-bold text-gray-900">
            {jumlah} pcs
          </span>

        </div>

      </div>
    );
  }


  /* HOODIE */

  if (isHoodie) {
    return (
      <div className="space-y-6">

        <div>
          <h2 className="text-sm font-medium text-gray-700">
            Jumlah Pesanan
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Masukkan jumlah berdasarkan ukuran hoodie.
          </p>
        </div>


        <div className="rounded-xl border border-gray-200 p-4">

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

            {sizes.map((size) => (
              <div key={size}>

                <label className="mb-1 block text-xs font-medium text-gray-500">
                  {size}
                </label>

                <input
                  type="number"
                  min="0"
                  value={getHoodieQuantity(
                    size,
                  )}
                  onChange={(e) =>
                    handleHoodieQuantityChange(
                      size,
                      e.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-900"
                />

              </div>
            ))}

          </div>

        </div>


        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-4">

          <span className="text-sm font-medium text-gray-600">
            Total Pesanan
          </span>

          <span className="text-lg font-bold text-gray-900">
            {Object.values(
              formData.ukuran || {},
            ).reduce(
              (total, jumlah) =>
                total +
                Number(jumlah || 0),
              0,
            )}{" "}
            pcs
          </span>

        </div>

      </div>
    );
  }


  /* KAOS */

  if (isKaos) {
    const totalQuantity =
      getTotalLengan("pendek") +
      getTotalLengan("panjang");

    return (
      <div className="space-y-6">

        <div>
          <h2 className="text-sm font-medium text-gray-700">
            Jumlah Pesanan
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Masukkan jumlah berdasarkan ukuran dan model lengan.
          </p>
        </div>


        {Object.values(
          orderData.lengan,
        ).map((lengan) => (
          <div
            key={lengan.id}
            className="rounded-xl border border-gray-200 p-4"
          >

            <div className="mb-4 flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-900">
                  {lengan.name}
                </p>

                {lengan.price > 0 && (
                  <p className="mt-1 text-xs text-gray-400">
                    +Rp
                    {lengan.price.toLocaleString(
                      "id-ID",
                    )}{" "}
                    / pcs
                  </p>
                )}

              </div>

              <span className="text-sm font-medium text-gray-500">
                {getTotalLengan(
                  lengan.id,
                )}{" "}
                pcs
              </span>

            </div>


            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              {sizes.map((size) => (
                <div key={size}>

                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    {size}
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={getQuantity(
                      lengan.id,
                      size,
                    )}
                    onChange={(e) =>
                      handleKaosQuantityChange(
                        lengan.id,
                        size,
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-900"
                  />

                </div>
              ))}

            </div>

          </div>
        ))}


        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-4">

          <span className="text-sm font-medium text-gray-600">
            Total Pesanan
          </span>

          <span className="text-lg font-bold text-gray-900">
            {totalQuantity} pcs
          </span>

        </div>

      </div>
    );
  }


  /* BELUM PILIH PRODUK */

  return (
    <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
      Pilih jenis order dan bahan terlebih dahulu.
    </div>
  );
}

