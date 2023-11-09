var backgroundSize = {
    width: 2535,
    height: 1269,
};  
var propertiesLabels = ["", "zyl:", "kW:", "ccm:", "km/h:"];
var propertiesUnits = ["", "zyl", "kW", "ccm", "kmh"];
var propertiesHigherIsBetter = [undefined, false, true, false, true];

var karte = [
    ['1A', 'Nissan Lady-Micra' , 111, 222, 998, 140, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['1B',  'Citroen Visa GTI Creation df', 111, 222, 1569, 188, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['1C', 'Lotus M 200' , 111, 222, 1600, 196, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['1D', 'Wood & Pickett Laser Metro' , 111, 222, 1256, 190, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['2A', 'Arex Roadster' , 111, 222, 5700, 345, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['2B', 'Pfeba Renault 21' , 111, 222, 1995, 192, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['2C',  'Irmscher Kadett E', 111, 222, 1771, 210, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['2D', 'Nissan Silvia SR-X' , 111, 222, 1991, 205, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['3A', 'AMG 190 E 3,2' , 111, 222, 3200, 244, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['3B', 'Ledi' , 111, 222, 1597, 240, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['3C', 'Treser Golf GTI' , 111, 222, 1891, 225, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['3D', 'Ford RS 200' , 111, 222, 1804, 240, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['4A',  'Daimler Benz 190 E', 111, 222, 1997, 215, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['4A', 'Porsche 924 break' , 111, 222, 1984, 230, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['4C', 'AMG S-Klasse' , 111, 222, 6000, 250, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['4D', 'Nissan CUE-X' , 111, 222, 3000, 240, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['5A', 'Sbarro Shahin 1000' , 111, 222, 4973, 235, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['5B','Mercedes ABC-Exclusive'  , 111, 222, 5547, 250, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['5C', 'BMW 635 ABC' , 111, 222, 3453, 255, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['5D', 'Audi quattro Sport' , 111, 222, 2133, 250, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['6A', 'AMG Typ W 126-5,4' , 111, 222, 4973, 250, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['6B', 'Nissan MID-4 (Sport coupe)' , 111, 222, 3000, 250, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['6C', 'Porsche 939 Turbo' , 111, 222, 3300, 260, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['6D', 'Ferrari 308 GTBi-Konig' , 111, 222, 2927, 265, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['7A',  'AMG Typ W 125C-5,0', 111, 222, 4973, 263, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['7B', 'Porsche 911 2,7 Meyer' , 111, 222, 2697, 254, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['7C',  'Porsche Gemballa Avalanche', 111, 222, 3400, 290, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['7D', 'Porsche 911 Turbo TAG' , 111, 222, 3297, 292, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['8A', 'AMG 500 SL 6,0' , 111, 222, 6000, 250, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['8B',  'ISDERA Imperator 108i', 111, 222, 5000, 258, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['8C',  'Wolf Lamborghini', 111, 222, 5000, 296, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
    ['8D',  'Metalex Tatra', 111, 222, 4000, 265, 'assets/images/piatnikTuning/cars_set.jpg', 2, 4],
]
