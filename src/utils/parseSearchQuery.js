const parseSearchQuery = (q) => {
  const tokens = q.toLowerCase().split(" ");

  const fuelMap = {
    petrol: "petrol",
    diesel: "diesel",
    bensin: "petrol",
    gasoline: "petrol",
  };

  const makes = [
    "toyota",
    "honda",
    "suzuki",
    "bmw",
    "mercedes",
    "mitsubishi",
    "daihatsu",
    "nissan",
    "hyundai",
    "kia",
    "mazda",
  ];

  const result = {
    make: null,
    year: null,
    fuel_type: null,
  };

  for (const t of tokens) {
    if (!isNaN(t) && t.length === 4) {
      result.year = Number(t);
    }

    if (makes.includes(t)) {
      result.make = t;
    }

    if (fuelMap[t]) {
      result.fuel_type = fuelMap[t];
    }
  }

  return result;
};

export default parseSearchQuery;
