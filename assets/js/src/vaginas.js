var propertiesLabels = ["", "narrowness:", "depth:", "age:", "color:"];
var propertiesUnits = ["", "narrowness", "depth", "age", "color"];
var propertiesHigherIsBetter = [undefined, false, true, false, true];
var backgroundSize = {
  width: 1890,
  height: 1575,
};

var karte = [
  [
    "1A",
    "Sbarro Challenge III",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    0 - 60,
    0,
  ],
  [
    "2A",
    "Jehle Pantera",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    210 - 60,
    0,
  ],
  [
    "3A",
    "Ford Probe GT",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    420 - 60,
    0,
  ],
  [
    "4A",
    "Porsche 959",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    630 - 60,
    0,
  ],
  [
    "5A",
    "Ferrari Testarossa",
    1111112,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    315 - 60,
    0,
  ],
  [
    "6A",
    "Jehle Saphir",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1050 - 60,
    0,
  ],
  [
    "7A",
    "Cizeta Moroder V16T",

    1111116,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    1,
    1260 - 60,
    0,
  ],
  [
    "8A",
    "Midas Gold",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    1,
    1470 - 60,
    0,
  ],
  [
    "1B",
    "Ferrari F 40",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    0 - 60,
    315,
  ],
  [
    "2B",
    "Callaway Corvette Twin Turbo",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    210 - 60,
    315,
  ],
  [
    "3B",
    "Vector W2 Twin Turbo",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    420 - 60,
    315,
  ],
  [
    "4B",
    "Sbarro Ferrari P4",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    630 - 60,
    315,
  ],
  [
    "5B",
    "Lamborghini Countach",
    1111112,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    315 - 60,
    315,
  ],
  [
    "6B",
    "Sethera",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1050 - 60,
    315,
  ],
  [
    "7B",
    "Alfa Romeo SZ",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1260 - 60,
    315,
  ],
  [
    "8B",
    "Ford Sierra RS Cosworth",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1470 - 60,
    315,
  ],
  [
    "1C",
    "Arrow C1",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    0 - 60,
    630,
  ],
  [
    "2C",
    "Irmscher GT",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    210 - 60,
    630,
  ],
  [
    "3C",
    "Aston Martin Zagato",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    420 - 60,
    630,
  ],
  [
    "4C",
    "Cadillac Allante",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    630 - 60,
    630,
  ],
  [
    "5C",
    "Isdera Imperator 108i",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    1,
    3,
    315 - 60,
    630,
  ],
  [
    "6C",
    "De Tomaso Pantera",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1050 - 60,
    630,
  ],
  [
    "7C",
    "Koenig Mercedes 560 SEC",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1260 - 60,
    630,
  ],
  [
    "8C",
    "Lotus Esprit Turbo",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1470 - 60,
    630,
  ],
  [
    "1D",
    "Alfa Romeo Spider",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    0 - 60,
    945,
  ],
  [
    "2D",
    "Maserati Karif",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    210 - 60,
    945,
  ],
  [
    "3D",
    "Ferrari GTO",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    420 - 60,
    945,
  ],
  [
    "4D",
    "Lamborghini Jalpa",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    630 - 60,
    945,
  ],
  [
    "5D",
    "Pontiac Firebird GTA",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    315 - 60,
    945,
  ],
  [
    "6D",
    "TVR 420 Saloon",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1050 - 60,
    945,
  ],
  [
    "7D",
    "Chevrolet Camaro",
    555555,
    666666,
    777777,
    888888,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1260 - 60,
    945,
  ],
  [
    "8D",
    "MVS Venturi",
    111111,
    222222,
    333333,
    444444,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1470 - 60,
    945,
  ],
];
