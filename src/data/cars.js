
const catalog = [
  // PORSCHE
  ["Porsche", "Carrera GT", 2003, 612, "5.7 V10", 330, "Supercarro", "Porsche Carrera GT supercar"],
  ["Porsche", "911 GT3 RS 4.0", 2011, 500, "4.0 Flat-6", 310, "Esportivo", "Porsche 997 GT3 RS 4.0"],
  ["Porsche", "911 GT2 RS (997)", 2010, 620, "3.6 Flat-6 Biturbo", 330, "Esportivo", "Porsche 997 GT2 RS"],
  ["Porsche", "911 GT3 RS (996)", 2003, 381, "3.6 Flat-6", 306, "Esportivo", "Porsche 996 GT3 RS"],
  ["Porsche", "911 Turbo (997)", 2006, 480, "3.6 Flat-6 Biturbo", 310, "Esportivo", "Porsche 997 Turbo"],
  ["Porsche", "Cayenne Turbo S", 2008, 550, "4.8 V8 Biturbo", 280, "SUV", "Porsche Cayenne Turbo S 957"],
  ["Porsche", "Panamera Turbo", 2009, 500, "4.8 V8 Biturbo", 303, "Sedã", "Porsche Panamera Turbo 970"],

  // FERRARI
  ["Ferrari", "Enzo", 2002, 660, "6.0 V12", 350, "Supercarro", "Ferrari Enzo red supercar automobile"],
  ["Ferrari", "458 Italia", 2009, 570, "4.5 V8", 325, "Supercarro", "Ferrari 458 Italia sports car"],
  ["Ferrari", "599 GTO", 2010, 670, "6.0 V12", 335, "Supercarro", "Ferrari 599 GTO car"],
  ["Ferrari", "F430 Scuderia", 2007, 510, "4.3 V8", 320, "Supercarro", "Ferrari 430 Scuderia sports car"],
  ["Ferrari", "360 Challenge Stradale", 2003, 425, "3.6 V8", 300, "Supercarro", "Ferrari 360 Challenge Stradale"],
  ["Ferrari", "F12berlinetta", 2012, 740, "6.3 V12", 340, "Supercarro", "Ferrari F12berlinetta automobile"],

  // LAMBORGHINI
  ["Lamborghini", "Murciélago LP670-4 SV", 2009, 670, "6.5 V12", 342, "Supercarro", "Lamborghini Murcielago LP670 SV"],
  ["Lamborghini", "Aventador LP700-4", 2011, 700, "6.5 V12", 350, "Supercarro", "Lamborghini Aventador LP700"],
  ["Lamborghini", "Reventón", 2007, 650, "6.5 V12", 340, "Supercarro", "Lamborghini Reventon supercar"],
  ["Lamborghini", "Gallardo Superleggera", 2007, 530, "5.0 V10", 315, "Supercarro", "Lamborghini Gallardo Superleggera"],
  ["Lamborghini", "Diablo GT", 1999, 575, "6.0 V12", 338, "Supercarro", "Lamborghini Diablo GT car"],

  // BUGATTI
  ["Bugatti", "Veyron 16.4", 2005, 1001, "8.0 W16 Quadriturbo", 407, "Supercarro", "Bugatti Veyron 16.4 car"],
  ["Bugatti", "Veyron Super Sport", 2010, 1200, "8.0 W16 Quadriturbo", 431, "Supercarro", "Bugatti Veyron Super Sport car"],

  // PAGANI
  ["Pagani", "Zonda F", 2005, 602, "7.3 V12", 345, "Supercarro", "Pagani Zonda F supercar"],
  ["Pagani", "Zonda Cinque", 2009, 678, "7.3 V12", 350, "Supercarro", "Pagani Zonda Cinque supercar"],
  ["Pagani", "Huayra", 2011, 730, "6.0 V12 Biturbo", 360, "Supercarro", "Pagani Huayra supercar"],

  // KOENIGSEGG
  ["Koenigsegg", "CCX", 2006, 806, "4.7 V8 Supercharged", 395, "Supercarro", "Koenigsegg CCX automobile"],
  ["Koenigsegg", "CCXR", 2007, 1018, "4.8 V8 Supercharged", 400, "Supercarro", "Koenigsegg CCXR automobile"],
  ["Koenigsegg", "Agera R", 2011, 1140, "5.0 V8 Biturbo", 400, "Supercarro", "Koenigsegg Agera R supercar"],

  // MERCEDES-AMG
  ["Mercedes-Benz", "SLR McLaren 722 Edition", 2006, 650, "5.4 V8 Supercharged", 337, "Supercarro", "Mercedes SLR McLaren 722 Edition"],
  ["Mercedes-Benz", "SLS AMG", 2009, 571, "6.2 V8", 317, "Supercarro", "Mercedes SLS AMG coupe"],
  ["Mercedes-Benz", "CLK GTR", 1997, 612, "6.9 V12", 320, "Supercarro", "Mercedes CLK GTR road car"],
  ["Mercedes-Benz", "C63 AMG (W204)", 2007, 457, "6.2 V8", 250, "Sedã", "Mercedes C63 AMG W204 sedan"],
  ["Mercedes-Benz", "E63 AMG (W212)", 2009, 525, "6.2 V8", 250, "Sedã", "Mercedes E63 AMG W212 sedan"],
  ["Mercedes-Benz", "ML63 AMG", 2006, 510, "6.2 V8", 250, "SUV", "Mercedes ML63 AMG W164 SUV"],

  // BMW
  ["BMW", "M3 CSL (E46)", 2003, 360, "3.2 Inline-6", 280, "Esportivo", "BMW M3 CSL E46 coupe"],
  ["BMW", "M3 GTS (E92)", 2009, 450, "4.4 V8", 305, "Esportivo", "BMW M3 GTS E92 orange"],
  ["BMW", "M5 (E60)", 2004, 507, "5.0 V10", 250, "Sedã", "BMW M5 E60 sedan"],
  ["BMW", "X5 M (E70)", 2009, 555, "4.4 V8 Biturbo", 250, "SUV", "BMW X5 M E70 SUV"],

  // AUDI
  ["Audi", "R8 V10", 2008, 525, "5.2 V10", 316, "Supercarro", "Audi R8 V10 first generation"],
  ["Audi", "R8 GT", 2010, 560, "5.2 V10", 320, "Supercarro", "Audi R8 GT 2010"],
  ["Audi", "RS6 Avant (C6)", 2008, 580, "5.0 V10 Biturbo", 250, "Perua", "Audi RS6 Avant C6 wagon"],
  ["Audi", "RS4 (B7)", 2005, 420, "4.2 V8", 250, "Sedã", "Audi RS4 B7 sedan"],

  // NISSAN
  ["Nissan", "Skyline GT-R R34", 1999, 280, "2.6 Inline-6 Biturbo", 250, "Esportivo", "Nissan Skyline GT-R R34 car"],
  ["Nissan", "GT-R R35", 2007, 480, "3.8 V6 Biturbo", 310, "Esportivo", "Nissan GT-R R35 2008"],

  // OUTRAS LENDAS
  ["Lexus", "LFA", 2010, 560, "4.8 V10", 325, "Supercarro", "Lexus LFA supercar"],
  ["Ford", "GT", 2004, 550, "5.4 V8 Supercharged", 330, "Supercarro", "Ford GT 2005 supercar"],
  ["Chevrolet", "Corvette ZR1 (C6)", 2008, 638, "6.2 V8 Supercharged", 330, "Esportivo", "Chevrolet Corvette C6 ZR1"],
  ["Dodge", "Viper SRT-10 ACR", 2008, 600, "8.4 V10", 285, "Esportivo", "Dodge Viper SRT10 ACR"],
  ["Aston Martin", "One-77", 2009, 750, "7.3 V12", 354, "Supercarro", "Aston Martin One-77 supercar"],
  ["Bentley", "Continental Supersports", 2009, 630, "6.0 W12 Biturbo", 329, "Esportivo", "Bentley Continental Supersports coupe"],
  ["Jeep", "Grand Cherokee SRT8", 2006, 425, "6.1 V8", 245, "SUV", "Jeep Grand Cherokee SRT8 WK"],
  ["Cadillac", "CTS-V", 2009, 556, "6.2 V8 Supercharged", 308, "Sedã", "Cadillac CTS-V second generation sedan"],
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
