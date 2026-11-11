const catalog = [
  // PORSCHE
  ["Porsche", "Carrera GT", 2003, 612, "5.7 V10", 330, "Supercarro", "Porsche Carrera GT 2003 silver supercar"],
  ["Porsche", "911 GT3 RS 4.0", 2011, 500, "4.0 Flat-6", 310, "Esportivo", "Porsche 911 997 GT3 RS 4.0 white"],
  ["Porsche", "911 GT2 RS (997)", 2010, 620, "3.6 Flat-6 Biturbo", 330, "Esportivo", "Porsche 911 997 GT2 RS silver black bonnet"],
  ["Porsche", "911 GT3 RS (996)", 2003, 381, "3.6 Flat-6", 306, "Esportivo", "Porsche 911 996 GT3 RS white red wheels"],
  ["Porsche", "911 Turbo (997)", 2006, 480, "3.6 Flat-6 Biturbo", 310, "Esportivo", "Porsche 911 997 Turbo coupe"],
  ["Porsche", "Cayenne Turbo S", 2008, 550, "4.8 V8 Biturbo", 280, "SUV", "Porsche Cayenne Turbo S 957 SUV"],
  ["Porsche", "Panamera Turbo", 2009, 500, "4.8 V8 Biturbo", 303, "Sedã", "Porsche Panamera Turbo 970 sedan"],

  // FERRARI
  ["Ferrari", "Enzo", 2002, 660, "6.0 V12", 350, "Supercarro", "Ferrari Enzo red supercar"],
  ["Ferrari", "458 Italia", 2009, 570, "4.5 V8", 325, "Supercarro", "Ferrari 458 Italia red supercar"],
  ["Ferrari", "599 GTO", 2010, 670, "6.0 V12", 335, "Supercarro", "Ferrari 599 GTO coupe"],
  ["Ferrari", "F430 Scuderia", 2007, 510, "4.3 V8", 320, "Supercarro", "Ferrari F430 Scuderia stripes"],
  ["Ferrari", "360 Challenge Stradale", 2003, 425, "3.6 V8", 300, "Supercarro", "Ferrari 360 Challenge Stradale red"],
  ["Ferrari", "F12berlinetta", 2012, 740, "6.3 V12", 340, "Supercarro", "Ferrari F12berlinetta red supercar"],

  // LAMBORGHINI
  ["Lamborghini", "Murciélago LP670-4 SV", 2009, 670, "6.5 V12", 342, "Supercarro", "Lamborghini Murcielago LP670-4 SV yellow"],
  ["Lamborghini", "Aventador LP700-4", 2011, 700, "6.5 V12", 350, "Supercarro", "Lamborghini Aventador LP700-4 orange supercar"],
  ["Lamborghini", "Reventón", 2007, 650, "6.5 V12", 340, "Supercarro", "Lamborghini Reventon matte grey supercar"],
  ["Lamborghini", "Gallardo Superleggera", 2007, 530, "5.0 V10", 315, "Supercarro", "Lamborghini Gallardo Superleggera orange"],
  ["Lamborghini", "Diablo GT", 1999, 575, "6.0 V12", 338, "Supercarro", "Lamborghini Diablo GT orange supercar"],

  // BUGATTI
  ["Bugatti", "Veyron 16.4", 2005, 1001, "8.0 W16 Quadriturbo", 407, "Supercarro", "Bugatti Veyron 16.4 two tone supercar"],
  ["Bugatti", "Veyron Super Sport", 2010, 1200, "8.0 W16 Quadriturbo", 431, "Supercarro", "Bugatti Veyron Super Sport orange black"],

  // PAGANI
  ["Pagani", "Zonda F", 2005, 602, "7.3 V12", 345, "Supercarro", "Pagani Zonda F supercar"],
  ["Pagani", "Zonda Cinque", 2009, 678, "7.3 V12", 350, "Supercarro", "Pagani Zonda Cinque white carbon supercar"],
  ["Pagani", "Huayra", 2011, 730, "6.0 V12 Biturbo", 360, "Supercarro", "Pagani Huayra supercar"],

  // KOENIGSEGG
  ["Koenigsegg", "CCX", 2006, 806, "4.7 V8 Supercharged", 395, "Supercarro", "Koenigsegg CCX silver supercar"],
  ["Koenigsegg", "CCXR", 2007, 1018, "4.8 V8 Supercharged", 400, "Supercarro", "Koenigsegg CCXR biofuel supercar"],
  ["Koenigsegg", "Agera R", 2011, 1140, "5.0 V8 Biturbo", 400, "Supercarro", "Koenigsegg Agera R white supercar"],

  // MERCEDES-AMG
  ["Mercedes-Benz", "SLR McLaren 722 Edition", 2006, 650, "5.4 V8 Supercharged", 337, "Supercarro", "Mercedes SLR McLaren 722 Edition grey"],
  ["Mercedes-Benz", "SLS AMG", 2009, 571, "6.2 V8", 317, "Supercarro", "Mercedes SLS AMG gullwing silver"],
  ["Mercedes-Benz", "CLK GTR", 1998, 612, "6.9 V12", 344, "Supercarro", "Mercedes Benz CLK GTR Strassenversion road car"],
  ["Mercedes-Benz", "C63 AMG (W204)", 2007, 457, "6.2 V8", 250, "Sedã", "Mercedes C63 AMG W204 sedan white"],
  ["Mercedes-Benz", "E63 AMG (W212)", 2009, 525, "6.2 V8", 250, "Sedã", "Mercedes E63 AMG W212 sedan"],
  ["Mercedes-Benz", "ML63 AMG", 2006, 510, "6.2 V8", 250, "SUV", "Mercedes ML63 AMG W164 SUV"],

  // BMW
  ["BMW", "M3 CSL (E46)", 2003, 360, "3.2 Inline-6", 280, "Esportivo", "BMW M3 CSL E46 silver grey coupe"],
  ["BMW", "M3 GTS (E92)", 2010, 450, "4.4 V8", 305, "Esportivo", "BMW M3 GTS E92 Fire Orange"],
  ["BMW", "M5 (E60)", 2004, 507, "5.0 V10", 250, "Sedã", "BMW M5 E60 V10 sedan"],
  ["BMW", "X5 M (E70)", 2009, 555, "4.4 V8 Biturbo", 250, "SUV", "BMW X5 M E70 SUV"],

  // AUDI
  ["Audi", "R8 V10", 2008, 525, "5.2 V10", 316, "Supercarro", "Audi R8 5.2 FSI quattro Type 42"],
  ["Audi", "R8 GT", 2010, 560, "5.2 V10", 320, "Supercarro", "Audi R8 GT 2010 limited edition"],
  ["Audi", "RS6 Avant (C6)", 2008, 580, "5.0 V10 Biturbo", 250, "Perua", "Audi RS6 Avant C6 V10 wagon"],
  ["Audi", "RS4 (B7)", 2005, 420, "4.2 V8", 250, "Sedã", "Audi RS4 B7 sedan blue"],

  // NISSAN
  ["Nissan", "Skyline GT-R R34", 1999, 280, "2.6 Inline-6 Biturbo", 250, "Esportivo", "Nissan Skyline GT-R R34 V-Spec Bayside Blue"],
  ["Nissan", "GT-R R35", 2007, 480, "3.8 V6 Biturbo", 310, "Esportivo", "Nissan GT-R R35 2008 grey"],

  // OUTRAS LENDAS
  ["Lexus", "LFA", 2010, 560, "4.8 V10", 325, "Supercarro", "Lexus LFA white supercar"],
  ["Ford", "GT", 2004, 550, "5.4 V8 Supercharged", 330, "Supercarro", "Ford GT 2005 blue stripes supercar"],
  ["Chevrolet", "Corvette ZR1 (C6)", 2008, 638, "6.2 V8 Supercharged", 330, "Esportivo", "Chevrolet Corvette C6 ZR1 blue"],
  ["Dodge", "Viper SRT-10 ACR", 2008, 600, "8.4 V10", 285, "Esportivo", "Dodge Viper SRT10 ACR 2008 wing"],
  ["Aston Martin", "One-77", 2009, 750, "7.3 V12", 354, "Supercarro", "Aston Martin One-77 supercar"],
  ["Bentley", "Continental Supersports", 2009, 630, "6.0 W12 Biturbo", 329, "Esportivo", "Bentley Continental Supersports coupe 2009"],
  ["Jeep", "Grand Cherokee SRT8", 2006, 425, "6.1 V8", 245, "SUV", "Jeep Grand Cherokee SRT8 WK1"],
  ["Cadillac", "CTS-V", 2009, 556, "6.2 V8 Supercharged", 308, "Sedã", "Cadillac CTS-V sedan 2009 black"],
];

export const cars = catalog.map((item, index) => {
  const [
    brand,
    name,
    year,
    power,
    engine,
    topSpeed,
    category,
    imageQuery,
  ] = item;

  return {
    id: index + 1,
    brand,
    name,
    year,
    power,
    engine,
    topSpeed,
    category,
    imageQuery,
    image: "",
  };
});