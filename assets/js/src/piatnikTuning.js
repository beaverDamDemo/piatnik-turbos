var backgroundSize = {
    width: 2535,
    height: 1269,
};  
var propertiesLabels = ["", "zyl:", "kW:", "ccm:", "km/h:"];
var propertiesUnits = ["", "zyl", "kW", "ccm", "kmh"];
var propertiesHigherIsBetter = [undefined, false, true, false, true];

var karte = [
    ['1A', 'Nissan Lady-Micra' , 4, 37, 998, 140, 'assets/images/piatnikTuning/cars_set.jpg', 1, 1],
    ['1B',  'Citroen Visa GTI Creation df', 4, 75, 1569, 188, 'assets/images/piatnikTuning/cars_set.jpg', 1, 1],
    ['1C', 'Lotus M 200' , 4, 123, 1600, 196, 'assets/images/piatnikTuning/cars_set.jpg', 2, 1],
    ['1D', 'Wood & Pickett Laser Metro' , 4, 66, 1256, 190, 'assets/images/piatnikTuning/cars_set.jpg', 1, 4],
    ['2A', 'Arex Roadster' , 8, 433, 5700, 345, 'assets/images/piatnikTuning/cars_set.jpg', 4, 2],
    ['2B', 'Pfeba Renault 21' , 4, 85, 1995, 192, 'assets/images/piatnikTuning/cars_set.jpg', 1, 3],
    ['2C',  'Irmscher Kadett E', 4, 85, 1771, 210, 'assets/images/piatnikTuning/cars_set.jpg', 1, 4],
    ['2D', 'Nissan Silvia SR-X' , 4, 107, 1991, 205, 'assets/images/piatnikTuning/cars_set.jpg', 4, 3],
    ['3A', 'AMG 190 E 3,2' , 6, 172, 3200, 244, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['3B', 'Ledi' , 4, 97, 1597, 240, 'assets/images/piatnikTuning/cars_set.jpg', 4, 4],
    ['3C', 'Treser Golf GTI' , 4, 118, 1891, 225, 'assets/images/piatnikTuning/cars_set.jpg', 4, 2],
    ['3D', 'Ford RS 200' , 4, 176, 1804, 240, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['4A',  'Daimler Benz 190 E', 4, 77, 1997, 215, 'assets/images/piatnikTuning/cars_set.jpg', 4, 3],
    ['4B', 'Porsche 924 break' , 4, 130, 1984, 230, 'assets/images/piatnikTuning/cars_set.jpg', 4, 3],
    ['4C', 'AMG S-Klasse' , 12, 300, 6000, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 3],
    ['4D', 'Nissan CUE-X' , 6, 177, 3000, 240, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['5A', 'Sbarro Shahin 1000' , 8, 180, 4973, 235, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['5B','Mercedes ABC-Exclusive'  , 8, 220, 5547, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['5C', 'BMW 635 ABC' , 6, 210, 3453, 255, 'assets/images/piatnikTuning/cars_set.jpg', 4, 2],
    ['5D', 'Audi quattro Sport' , 5, 225, 2133, 250, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['6A', 'AMG Typ W 126-5,4' , 8, 228, 4973, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['6B', 'Nissan MID-4 (Sport coupe)' , 6, 177, 3000, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['6C', 'Porsche 939 Turbo' , 6, 221, 3300, 260, 'assets/images/piatnikTuning/cars_set.jpg', 3, 4],
    ['6D', 'Ferrari 308 GTBi-Konig' , 8, 232, 2927, 265, 'assets/images/piatnikTuning/cars_set.jpg', 1, 4],
    ['7A',  'AMG Typ W 125C-5,0', 8, 250, 4973, 263, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['7B', 'Porsche 911 2,7 Meyer' , 6, 290, 2697, 254, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['7C',  'Porsche Gemballa Avalanche', 6, 295, 3400, 290, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['7D', 'Porsche 911 Turbo TAG' , 6, 308, 3297, 292, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['8A', 'AMG 500 SL 6,0' , 8, 275, 6000, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['8B',  'ISDERA Imperator 108i', 8, 257, 5000, 258, 'assets/images/piatnikTuning/cars_set.jpg', 3, 2],
    ['8C',  'Wolf Lamborghini', 12, 305, 5000, 296, 'assets/images/piatnikTuning/cars_set.jpg', 1, 1],    
    ['8D',  'Metalex Tatra', 8, 222, 4000, 265, 'assets/images/piatnikTuning/cars_set.jpg', 1, 3],
]