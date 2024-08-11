var backgroundSize = {
    width: 2535,
    height: 1269,
};
var propertiesLabels = ["", "Motor:", "Leistung:", "Hubraum:", "Geschwindigkeit:"];
var propertiesUnits = ["", "Zyl.", "kW", "ccm", "km/h"];
var propertiesHigherIsBetter = [undefined, true, true, true, true];


var karte = [
    ['1A', 'Nissan Lady-Micra', 4, 37, 998, 140, 'assets/images/piatnikTuning/cars_set.jpg', 1, 0],
    ['1B', 'Citroen Visa GTI Creation df', 4, 75, 1569, 188, 'assets/images/piatnikTuning/cars_set.jpg', 1, 0],
    ['1C', 'Lotus M 200', 4, 123, 1600, 196, 'assets/images/piatnikTuning/cars_set.jpg', 2, 0],
    ['1D', 'Wood & Pickett Laser Metro', 4, 66, 1256, 190, 'assets/images/piatnikTuning/cars_set.jpg', 1, 3],
    ['2A', 'Arex Roadster', 8, 433, 5700, 345, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['2B', 'Pfeba Renault 21', 4, 85, 1995, 192, 'assets/images/piatnikTuning/cars_set.jpg', 1, 2],
    ['2C', 'Irmscher Kadett E', 4, 85, 1771, 210, 'assets/images/piatnikTuning/cars_set.jpg', 1, 3],
    ['2D', 'Nissan Silvia SR-X', 4, 107, 1991, 205, 'assets/images/piatnikTuning/cars_set.jpg', 0, 2],
    ['3A', 'AMG 190 E 3,2', 6, 172, 3200, 244, 'assets/images/piatnikTuning/cars_set.jpg', 3, 0],
    ['3B', 'Ledi', 4, 97, 1597, 240, 'assets/images/piatnikTuning/cars_set.jpg', 0, 3],
    ['3C', 'Treser Golf GTI', 4, 118, 1891, 225, 'assets/images/piatnikTuning/cars_set.jpg', 0, 1],
    ['3D', 'Ford RS 200', 4, 176, 1804, 240, 'assets/images/piatnikTuning/cars_set.jpg', 2, 3],
    ['4A', 'Daimler Benz 190 E', 4, 77, 1997, 215, 'assets/images/piatnikTuning/cars_set.jpg', 0, 2],
    ['4B', 'Porsche 924 break', 4, 130, 1984, 230, 'assets/images/piatnikTuning/cars_set.jpg', 0, 2],
    ['4C', 'AMG S-Klasse', 12, 300, 6000, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 2],
    ['4D', 'Nissan CUE-X', 6, 177, 3000, 240, 'assets/images/piatnikTuning/cars_set.jpg', 3, 0],
    ['5A', 'Sbarro Shahin 1000', 8, 180, 4973, 235, 'assets/images/piatnikTuning/cars_set.jpg', 3, 0],
    ['5B', 'Mercedes ABC-Exclusive', 8, 220, 5547, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 0],
    ['5C', 'BMW 635 ABC', 6, 210, 3453, 255, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['5D', 'Audi quattro Sport', 5, 225, 2133, 250, 'assets/images/piatnikTuning/cars_set.jpg', 2, 3],
    ['6A', 'AMG Typ W 126-5,4', 8, 228, 4973, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 0],
    ['6B', 'Nissan MID-4 (Sport coupe)', 6, 177, 3000, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 0],
    ['6C', 'Porsche 939 Turbo', 6, 221, 3300, 260, 'assets/images/piatnikTuning/cars_set.jpg', 3, 3],
    ['6D', 'Ferrari 308 GTBi-Konig', 8, 232, 2927, 265, 'assets/images/piatnikTuning/cars_set.jpg', 1, 3],
    ['7A', 'AMG Typ W 125C-5,0', 8, 250, 4973, 263, 'assets/images/piatnikTuning/cars_set.jpg', 3, 0],
    ['7B', 'Porsche 911 2,7 Meyer', 6, 290, 2697, 254, 'assets/images/piatnikTuning/cars_set.jpg', 2, 3],
    ['7C', 'Porsche Gemballa Avalanche', 6, 295, 3400, 290, 'assets/images/piatnikTuning/cars_set.jpg', 2, 3],
    ['7D', 'Porsche 911 Turbo TAG', 6, 308, 3297, 292, 'assets/images/piatnikTuning/cars_set.jpg', 2, 3],
    ['8A', 'AMG 500 SL 6,0', 8, 275, 6000, 250, 'assets/images/piatnikTuning/cars_set.jpg', 3, 0],
    ['8B', 'ISDERA Imperator 108i', 8, 257, 5000, 258, 'assets/images/piatnikTuning/cars_set.jpg', 3, 1],
    ['8C', 'Wolf Lamborghini', 12, 305, 5000, 296, 'assets/images/piatnikTuning/cars_set.jpg', 1, 0],
    ['8D', 'Metalex Tatra', 8, 222, 4000, 265, 'assets/images/piatnikTuning/cars_set.jpg', 1, 2],
]