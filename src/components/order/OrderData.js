const orderData = {
  jenisOrder: [
    {
      id: "kaos",
      name: "Kaos",
    },
    {
      id: "hoodie",
      name: "Hoodie",
    },
    {
      id: "totebag",
      name: "Totebag",
    },
  ],

  bahan: [
    {
      id: "cotton-combed-24s",
      name: "Cotton Combed 24s All Size",
      jenisOrder: "kaos",
      price: 30000,
    },
    {
      id: "cotton-combed-30s",
      name: "Cotton Combed 30s All Size",
      jenisOrder: "kaos",
      price: 45000,
    },
      {
    id: "bahan-customer",
    name: "Bahan dari Customer",
    jenisOrder: "all",
    price: 0,
   },
    // {
    //   id: "bahan-hoodie",
    //   name: "Bahan Hoodie All Size",
    //   jenisOrder: "hoodie",
    //   price: 60000,
    // },
    // {
    //   id: "bahan-totebag",
    //   name: "Bahan Totebag",
    //   jenisOrder: "totebag",
    //   price: 20000,
    // },
    // {
    //   id: "bahan-customer",
    //   name: "Bahan dari Customer",
    //   jenisOrder: "all",
    //   price: 0,
    // },
  ],

  warna: [
    {
      id: "hitam",
      name: "Hitam",
    },
    {
      id: "putih",
      name: "Putih",
    },
    {
      id: "merah",
      name: "Merah",
    },
    {
      id: "biru",
      name: "Biru",
    },
    {
      id: "abu-abu",
      name: "Abu-abu",
    },
  ],

  size: {
    kaos: ["S", "M", "L", "XL", "XXL", "3XL"],
    hoodie: ["M", "L", "XL", "XXL", "3XL"],
    totebag: ["All Size"],
  },

  ukuranDesain: [
    {
      id: "a6",
      name: "A6",
      price: 5000,
    },
    {
      id: "a5",
      name: "A5",
      price: 10000,
    },
    {
      id: "a4",
      name: "A4",
      price: 15000,
    },
    {
      id: "a3",
      name: "A3",
      price: 20000,
    },
  ],

  lengan: {
    pendek: {
      id: "pendek",
      name: "Lengan Pendek",
      price: 0,
    },

    panjang: {
      id: "panjang",
      name: "Lengan Panjang",
      price: 10000,
    },
  },

  quantity: {
    normal: {
      min: 1,
      max: 12,
      discount: 0,
    },

    medium: {
      min: 13,
      max: 24,
      discount: 3,
    },

    large: {
      min: 25,
      max: 49,
      discount: 3,
    },
    extraLarge: {
      min: 50,
      max: Infinity,
      discount: 8,
    },
  },

  operationalMarkup: 20,
  profitMarkup: 15,
};

export default orderData;
