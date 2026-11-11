const catalog = [
  // PORSCHE
  ["Porsche", "Carrera GT", 2003, 612, "5.7 V10", 330, "Supercarro", "Porsche Carrera GT 2003 silver supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Porsche_Carrera_GT_%2851952018221%29.jpg/960px-Porsche_Carrera_GT_%2851952018221%29.jpg"],
  ["Porsche", "911 GT3 RS 4.0", 2011, 500, "4.0 Flat-6", 310, "Esportivo", "Porsche 911 997 GT3 RS 4.0 white", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Porsche_997_GT3_RS_4.0_IMG_4116.jpg/960px-Porsche_997_GT3_RS_4.0_IMG_4116.jpg"],
  ["Porsche", "911 GT2 RS (997)", 2010, 620, "3.6 Flat-6 Biturbo", 330, "Esportivo", "Porsche 911 997 GT2 RS silver black bonnet", "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Porsche_911_GT2_RS_%28997%29_-_22469153635.jpg/960px-Porsche_911_GT2_RS_%28997%29_-_22469153635.jpg"],
  ["Porsche", "911 GT3 RS (996)", 2003, 381, "3.6 Flat-6", 306, "Esportivo", "Porsche 911 996 GT3 RS white red wheels", "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/2003_Porsche_911_996_GT3_RS_%2836663414422%29.jpg/960px-2003_Porsche_911_996_GT3_RS_%2836663414422%29.jpg"],
  ["Porsche", "911 Turbo (997)", 2006, 480, "3.6 Flat-6 Biturbo", 310, "Esportivo", "Porsche 911 997 Turbo coupe", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Porsche_911_997_Turbo_Cabriolet.jpg/960px-Porsche_911_997_Turbo_Cabriolet.jpg"],
  ["Porsche", "Cayenne Turbo S", 2008, 550, "4.8 V8 Biturbo", 280, "SUV", "Porsche Cayenne Turbo S 957 SUV", "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Porsche_Cayenne_Turbo_%28957%29_front_20090327.jpg/960px-Porsche_Cayenne_Turbo_%28957%29_front_20090327.jpg"],
  ["Porsche", "Panamera Turbo", 2009, 500, "4.8 V8 Biturbo", 303, "Sedã", "Porsche Panamera Turbo 970 sedan", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Porsche_Panamera_Turbo_%28970%29_%E2%80%93_Frontansicht_%281%29%2C_18._Juli_2012%2C_D%C3%BCsseldorf.jpg/960px-Porsche_Panamera_Turbo_%28970%29_%E2%80%93_Frontansicht_%281%29%2C_18._Juli_2012%2C_D%C3%BCsseldorf.jpg"],

  // FERRARI
  ["Ferrari", "Enzo", 2002, 660, "6.0 V12", 350, "Supercarro", "Ferrari Enzo red supercar", "https://upload.wikimedia.org/wikipedia/commons/8/82/SC06_2003_Enzo_Ferrari_2.jpg"],
  ["Ferrari", "458 Italia", 2009, 570, "4.5 V8", 325, "Supercarro", "Ferrari 458 Italia red supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/2012_Ferrari_458_Italia_red_car.jpg/960px-2012_Ferrari_458_Italia_red_car.jpg"],
  ["Ferrari", "599 GTO", 2010, 670, "6.0 V12", 335, "Supercarro", "Ferrari 599 GTO coupe", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/2011_Ferrari_599_GTO_%2832648246453%29.jpg/960px-2011_Ferrari_599_GTO_%2832648246453%29.jpg"],
  ["Ferrari", "F430 Scuderia", 2007, 510, "4.3 V8", 320, "Supercarro", "Ferrari F430 Scuderia stripes", "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Ferrari_F430_Scuderia_-_Flickr_-_Alexandre_Pr%C3%A9vot.jpg/960px-Ferrari_F430_Scuderia_-_Flickr_-_Alexandre_Pr%C3%A9vot.jpg"],
  ["Ferrari", "360 Challenge Stradale", 2003, 425, "3.6 V8", 300, "Supercarro", "Ferrari 360 Challenge Stradale red", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Ferrari_360_Challenge_Stradale_%2815499346719%29.jpg/960px-Ferrari_360_Challenge_Stradale_%2815499346719%29.jpg"],
  ["Ferrari", "F12berlinetta", 2012, 740, "6.3 V12", 340, "Supercarro", "Ferrari F12berlinetta red supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Red_Ferrari_F12berlinetta_at_NAIAS_2013.jpg/960px-Red_Ferrari_F12berlinetta_at_NAIAS_2013.jpg"],

  // LAMBORGHINI
  ["Lamborghini", "Murciélago LP670-4 SV", 2009, 670, "6.5 V12", 342, "Supercarro", "Lamborghini Murcielago LP670-4 SV yellow", "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Lamborghini_Murcielago_LP670-4_SV_Genf_2009.jpg/960px-Lamborghini_Murcielago_LP670-4_SV_Genf_2009.jpg"],
  ["Lamborghini", "Aventador LP700-4", 2011, 700, "6.5 V12", 350, "Supercarro", "Lamborghini Aventador LP700-4 orange supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Lamborghini_Aventador_LP700-4_%288688881317%29.jpg/960px-Lamborghini_Aventador_LP700-4_%288688881317%29.jpg"],
  ["Lamborghini", "Reventón", 2007, 650, "6.5 V12", 340, "Supercarro", "Lamborghini Reventon matte grey supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/2008_Lamborghini_Reventon_SCD24.jpg/960px-2008_Lamborghini_Reventon_SCD24.jpg"],
  ["Lamborghini", "Gallardo Superleggera", 2007, 530, "5.0 V10", 315, "Supercarro", "Lamborghini Gallardo Superleggera orange", "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Lamborghini_Gallardo_Superleggera_BCN2009.jpg/960px-Lamborghini_Gallardo_Superleggera_BCN2009.jpg"],
  ["Lamborghini", "Diablo GT", 1999, 575, "6.0 V12", 338, "Supercarro", "Lamborghini Diablo GT orange supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/12-10-25-autostadt-wolfsburg-by-RalfR-31.jpg/960px-12-10-25-autostadt-wolfsburg-by-RalfR-31.jpg"],

  // BUGATTI
  ["Bugatti", "Veyron 16.4", 2005, 1001, "8.0 W16 Quadriturbo", 407, "Supercarro", "Bugatti Veyron 16.4 two tone supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Bugatti_Veyron_16.4_White_Blue_GT_%286200946904%29.jpg/960px-Bugatti_Veyron_16.4_White_Blue_GT_%286200946904%29.jpg"],
  ["Bugatti", "Veyron Super Sport", 2010, 1200, "8.0 W16 Quadriturbo", 431, "Supercarro", "Bugatti Veyron Super Sport orange black", "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Bugatti_Veyron_Super_Sport_at_Top_Marques_2011.jpg/960px-Bugatti_Veyron_Super_Sport_at_Top_Marques_2011.jpg"],

  // PAGANI
  ["Pagani", "Zonda F", 2005, 602, "7.3 V12", 345, "Supercarro", "Pagani Zonda F supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Pagani_Zonda_F_Clubsport_-_Flickr_-_Alexandre_Pr%C3%A9vot.jpg/960px-Pagani_Zonda_F_Clubsport_-_Flickr_-_Alexandre_Pr%C3%A9vot.jpg"],
  ["Pagani", "Zonda Cinque", 2009, 678, "7.3 V12", 350, "Supercarro", "Pagani Zonda Cinque white carbon supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Pagani_Zonda_Cinque_Roadster_01.jpg/960px-Pagani_Zonda_Cinque_Roadster_01.jpg"],
  ["Pagani", "Huayra", 2011, 730, "6.0 V12 Biturbo", 360, "Supercarro", "Pagani Huayra supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Pagani_Huayra_at_Geneva_Motor_Show_2012_%28orange_carbon%29.jpg/960px-Pagani_Huayra_at_Geneva_Motor_Show_2012_%28orange_carbon%29.jpg"],

  // KOENIGSEGG
  ["Koenigsegg", "CCX", 2006, 806, "4.7 V8 Supercharged", 395, "Supercarro", "Koenigsegg CCX silver supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Koenigsegg_CCX_-_Flickr_-_Alexandre_Pr%C3%A9vot.jpg/960px-Koenigsegg_CCX_-_Flickr_-_Alexandre_Pr%C3%A9vot.jpg"],
  ["Koenigsegg", "CCXR", 2007, 1018, "4.8 V8 Supercharged", 400, "Supercarro", "Koenigsegg CCXR biofuel supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/2008_Koenigsegg_CCXR_Edition.jpg/960px-2008_Koenigsegg_CCXR_Edition.jpg"],
  ["Koenigsegg", "Agera R", 2011, 1140, "5.0 V8 Biturbo", 400, "Supercarro", "Koenigsegg Agera R white supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Koenigsegg_Agera_R_Genf_2011.jpg/960px-Koenigsegg_Agera_R_Genf_2011.jpg"],

  // MERCEDES-AMG
  ["Mercedes-Benz", "SLR McLaren 722 Edition", 2006, 650, "5.4 V8 Supercharged", 337, "Supercarro", "Mercedes SLR McLaren 722 Edition grey", "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Mercedes-Benz_SLR_McLaren_722_Edition_front.jpg/960px-Mercedes-Benz_SLR_McLaren_722_Edition_front.jpg"],
  ["Mercedes-Benz", "SLS AMG", 2009, 571, "6.2 V8", 317, "Supercarro", "Mercedes SLS AMG gullwing silver", "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/Mercedes-Benz_SLS_AMG_%28C197%29_front_20100430.jpg/960px-Mercedes-Benz_SLS_AMG_%28C197%29_front_20100430.jpg"],
  ["Mercedes-Benz", "CLK GTR", 1998, 612, "6.9 V12", 344, "Supercarro", "Mercedes Benz CLK GTR Strassenversion road car", "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Mercedes-Benz_CLK_GTR_Roadster.jpg/960px-Mercedes-Benz_CLK_GTR_Roadster.jpg"],
  ["Mercedes-Benz", "C63 AMG (W204)", 2007, 457, "6.2 V8", 250, "Sedã", "Mercedes C63 AMG W204 sedan white", "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Mercedes-Benz_C63_AMG_Sedan_%28W204%29_front.JPG/960px-Mercedes-Benz_C63_AMG_Sedan_%28W204%29_front.JPG"],
  ["Mercedes-Benz", "E63 AMG (W212)", 2009, 525, "6.2 V8", 250, "Sedã", "Mercedes E63 AMG W212 sedan", "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Mercedes-Benz_E63_AMG_%28W212%29_front.jpg/960px-Mercedes-Benz_E63_AMG_%28W212%29_front.jpg"],
  ["Mercedes-Benz", "ML63 AMG", 2006, 510, "6.2 V8", 250, "SUV", "Mercedes ML63 AMG W164 SUV", "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Mercedes-Benz_ML_63_AMG_W164_front.JPG/960px-Mercedes-Benz_ML_63_AMG_W164_front.JPG"],

  // BMW
  ["BMW", "M3 CSL (E46)", 2003, 360, "3.2 Inline-6", 280, "Esportivo", "BMW M3 CSL E46 silver grey coupe", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/2003_BMW_M3_CSL_front_%2830.7.2022%29.jpg/960px-2003_BMW_M3_CSL_front_%2830.7.2022%29.jpg"],
  ["BMW", "M3 GTS (E92)", 2010, 450, "4.4 V8", 305, "Esportivo", "BMW M3 GTS E92 Fire Orange", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/BMW_M3_GTS_-_Flickr_-_Alexandre_Pr%C3%A9vot_%286%29.jpg/960px-BMW_M3_GTS_-_Flickr_-_Alexandre_Pr%C3%A9vot_%286%29.jpg"],
  ["BMW", "M5 (E60)", 2004, 507, "5.0 V10", 250, "Sedã", "BMW M5 E60 V10 sedan", "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/BMW_E60_M5_1.JPG/960px-BMW_E60_M5_1.JPG"],
  ["BMW", "X5 M (E70)", 2009, 555, "4.4 V8 Biturbo", 250, "SUV", "BMW X5 M E70 SUV", "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/BMW_X5_M_%28E70%29_front_20100723.jpg/960px-BMW_X5_M_%28E70%29_front_20100723.jpg"],

  // AUDI
  ["Audi", "R8 V10", 2008, 525, "5.2 V10", 316, "Supercarro", "Audi R8 5.2 FSI quattro Type 42", "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Audi_R8_Coup%C3%A9_5.2_FSI_quattro_%282014%29_%2852455250912%29.jpg/960px-Audi_R8_Coup%C3%A9_5.2_FSI_quattro_%282014%29_%2852455250912%29.jpg"],
  ["Audi", "R8 GT", 2010, 560, "5.2 V10", 320, "Supercarro", "Audi R8 GT 2010 limited edition", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Audi_R8_GT_%28white%29.jpg/960px-Audi_R8_GT_%28white%29.jpg"],
  ["Audi", "RS6 Avant (C6)", 2008, 580, "5.0 V10 Biturbo", 250, "Perua", "Audi RS6 Avant C6 V10 wagon", "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Audi_RS6_Avant_%28C6%29_front.JPG/960px-Audi_RS6_Avant_%28C6%29_front.JPG"],
  ["Audi", "RS4 (B7)", 2005, 420, "4.2 V8", 250, "Sedã", "Audi RS4 B7 sedan blue", "https://upload.wikimedia.org/wikipedia/commons/9/99/Audi-RS4.jpg"],

  // NISSAN
  ["Nissan", "Skyline GT-R R34", 1999, 280, "2.6 Inline-6 Biturbo", 250, "Esportivo", "Nissan Skyline GT-R R34 V-Spec Bayside Blue", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/NISSAN_R34-Skyline_GTR.jpg/960px-NISSAN_R34-Skyline_GTR.jpg"],
  ["Nissan", "GT-R R35", 2007, 480, "3.8 V6 Biturbo", 310, "Esportivo", "Nissan GT-R R35 2008 grey", "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Nissan_GT-R_front_20080312.jpg/960px-Nissan_GT-R_front_20080312.jpg"],

  // OUTRAS LENDAS
  ["Lexus", "LFA", 2010, 560, "4.8 V10", 325, "Supercarro", "Lexus LFA white supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/2012_Lexus_LFA_SCD26.jpg/960px-2012_Lexus_LFA_SCD26.jpg"],
  ["Ford", "GT", 2004, 550, "5.4 V8 Supercharged", 330, "Supercarro", "Ford GT 2005 blue stripes supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/2005_Ford_GT_in_Blue.jpg/960px-2005_Ford_GT_in_Blue.jpg"],
  ["Chevrolet", "Corvette ZR1 (C6)", 2008, 638, "6.2 V8 Supercharged", 330, "Esportivo", "Chevrolet Corvette C6 ZR1 blue", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Chevrolet_Corvette_C6_ZR1_%2853214550742%29.jpg/960px-Chevrolet_Corvette_C6_ZR1_%2853214550742%29.jpg"],
  ["Dodge", "Viper SRT-10 ACR", 2008, 600, "8.4 V10", 285, "Esportivo", "Dodge Viper SRT10 ACR 2008 wing", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Dodge_Viper_SRT10_ACR_red.jpg/960px-Dodge_Viper_SRT10_ACR_red.jpg"],
  ["Aston Martin", "One-77", 2009, 750, "7.3 V12", 354, "Supercarro", "Aston Martin One-77 supercar", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/2012_Aston_Martin_One-77_coupe_%282012-10-26%29_01.jpg/960px-2012_Aston_Martin_One-77_coupe_%282012-10-26%29_01.jpg"],
  ["Bentley", "Continental Supersports", 2009, 630, "6.0 W12 Biturbo", 329, "Esportivo", "Bentley Continental Supersports coupe 2009", "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/2017_Bentley_Continental_Supersports_in_Extreme_Silver%2C_front_right.jpg/960px-2017_Bentley_Continental_Supersports_in_Extreme_Silver%2C_front_right.jpg"],
  ["Jeep", "Grand Cherokee SRT8", 2006, 425, "6.1 V8", 245, "SUV", "Jeep Grand Cherokee SRT8 WK1", "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Jeep_Grand_Cherokee_SRT8_%E2%80%93_Frontansicht%2C_1._Novembro_2012%2C_Lisboa.jpg/960px-Jeep_Grand_Cherokee_SRT8_%E2%80%93_Frontansicht%2C_1._Novembro_2012%2C_Lisboa.jpg"],
  ["Cadillac", "CTS-V", 2009, 556, "6.2 V8 Supercharged", 308, "Sedã", "Cadillac CTS-V sedan 2009 black", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/2009_Cadillac_CTS-V_sedan_--_07-11-2009.jpg/960px-2009_Cadillac_CTS-V_sedan_--_07-11-2009.jpg"],
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
    image,
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
    image,
  };
});