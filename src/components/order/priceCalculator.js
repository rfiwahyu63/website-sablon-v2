import orderData from "./OrderData";

export function calculateOrderPrice(order) {
  /* QUANTITY */

  let quantityPendek = 0;
  let quantityPanjang = 0;
  let totalQuantity = 0;

  // Bahan customer
  if (order.bahan === "bahan-customer") {
    totalQuantity = Number(order.jumlah || 0);
  }

  // Totebag
  else if (order.jenisOrder === "totebag") {
    totalQuantity = Number(order.jumlah || 0);
  }

  // Hoodie
  else if (order.jenisOrder === "hoodie") {
    totalQuantity = Object.values(order.ukuran || {}).reduce(
      (total, jumlah) => total + Number(jumlah || 0),
      0,
    );
  }

  // Kaos
  else if (order.jenisOrder === "kaos") {
    quantityPendek = Object.values(order.ukuran?.pendek || {}).reduce(
      (total, jumlah) => total + Number(jumlah || 0),
      0,
    );

    quantityPanjang = Object.values(order.ukuran?.panjang || {}).reduce(
      (total, jumlah) => total + Number(jumlah || 0),
      0,
    );

    totalQuantity = quantityPendek + quantityPanjang;
  }

  /* BAHAN */

  const bahan = orderData.bahan.find(
    (item) =>
      item.id === order.bahan &&
      (item.jenisOrder === order.jenisOrder || item.jenisOrder === "all"),
  );

  const hargaBahan = Number(bahan?.price || 0);

  const hargaBahanTotal = hargaBahan * totalQuantity;

  /* DESAIN */

  const hargaDesainDasar = (order.desainList || []).reduce((total, desain) => {
    const ukuran = orderData.ukuranDesain.find(
      (item) => item.id === desain.ukuran,
    );

    return total + Number(ukuran?.price || 0);
  }, 0);

  const operationalAmount =
    hargaDesainDasar * (orderData.operationalMarkup / 100);

  const profitAmount = hargaDesainDasar * (orderData.profitMarkup / 100);

  const hargaDesainJual = hargaDesainDasar + operationalAmount + profitAmount;

  const hargaDesainTotal = hargaDesainJual * totalQuantity;

  /* DISKON */

  let discountPercent = 0;

  if (
    totalQuantity >= orderData.quantity.medium.min &&
    totalQuantity <= orderData.quantity.medium.max
  ) {
    discountPercent = orderData.quantity.medium.discount;
  }

  if (
    totalQuantity >= orderData.quantity.large.min &&
    totalQuantity <= orderData.quantity.large.max
  ) {
    discountPercent = orderData.quantity.large.discount;
  }

  if (totalQuantity >= orderData.quantity.extraLarge.min) {
    discountPercent = orderData.quantity.extraLarge.discount;
  }

  const discountAmount = hargaDesainTotal * (discountPercent / 100);

  const hargaDesainSetelahDiskon = hargaDesainTotal - discountAmount;

  /* TOTAL PRODUK */

  const totalProduksi = hargaBahanTotal + hargaDesainSetelahDiskon;

  /* ONGKIR */

  const ongkir = order.pengiriman === "kirim" ? Number(order.ongkir || 0) : 0;

  /* TOTAL */

  const total = totalProduksi + ongkir;

  return {
    // Quantity
    quantityPendek,
    quantityPanjang,
    totalQuantity,

    // Bahan
    hargaBahan,
    hargaBahanTotal,

    // Desain
    hargaDesainDasar,
    hargaDesainJual,
    hargaDesainTotal,

    // Diskon
    discountPercent,
    discountAmount,
    hargaDesainSetelahDiskon,

    // Total
    totalProduksi,
    ongkir,
    total,
  };
}
