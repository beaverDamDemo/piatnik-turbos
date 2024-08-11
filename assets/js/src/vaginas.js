var backgroundSize = {
  width: 2535,
  height: 1269,
};
var propertiesLabels = ["", "width:", "depth:", "age:", "taste:"];
var propertiesUnits = ["", "cm", "cm", "years", "marks"];
var propertiesHigherIsBetter = [undefined, false, false, false, true];

var karte = [
  [
    "1A",
    "Aria",
    3,
    7,
    18,
    1,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    0 - 60,
    0,
  ],
  [
    "2A",
    "Beatrix",
    5.5,
    5.5,
    30,
    4,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    210 - 60,
    0,
  ],
  [
    "3A",
    "Calista",
    2,
    9,
    16,
    2,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    420 - 60,
    0,
  ],
  [
    "4A",
    "Maria Sofia Pia Federico",
    4.5,
    6,
    16,
    5,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    630 - 60,
    0,
  ],
  [
    "5A",
    "Clover",
    6,
    5,
    18,
    3,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    315 - 60,
    0,
  ],
  [
    "6A",
    "Eleanora",
    3.5,
    11,
    25,
    5,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1050 - 60,
    0,
  ],
  [
    "7A",
    "Elsa",
    8,
    8,
    18,
    3,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    1,
    1260 - 60,
    21,
  ],
  [
    "8A",
    "Evangeline",
    2.5,
    13,
    33,
    2,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    1,
    17,
    0,
  ],
  [
    "1B",
    "Fantasia",
    5,
    10,
    21,
    4,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    24,
    0 - 60,
    315,
  ],
  [
    "2B",
    "Hazel",
    6.5,
    7,
    29,
    1,
    "assets/images/vaginas/vaginas loaded.jpg",
    28,
    3,
    210 - 60,
    315,
  ],
  [
    "3B",
    "Lotus",
    4,
    6,
    17,
    5,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    420 - 60,
    315,
  ],
  [
    "4B",
    "Luna",
    7.5,
    12,
    23,
    2,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    630 - 60,
    315,
  ],
  [
    "5B",
    "Niamh",
    3,
    9,
    26,
    3,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    315 - 60,
    315,
  ],
  [
    "6B",
    "Nova",
    5.5,
    5.5,
    30,
    4,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1050 - 60,
    315,
  ],
  [
    "7B",
    "Nyx",
    3,
    8,
    23,
    1,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1260 - 60,
    315,
  ],
  [
    "8B",
    "Larissa",
    4.5,
    11,
    35,
    5,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1470 - 60,
    315,
  ],
  [
    "1C",
    "Pearl",
    6,
    13,
    40,
    2,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    0 - 60,
    630,
  ],
  [
    "2C",
    "Ruelle",
    3.5,
    10,
    45,
    3,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    210 - 60,
    630,
  ],
  [
    "3C",
    "Selena",
    8,
    7,
    50,
    4,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    420 - 60,
    55,
  ],
  [
    "4C",
    "Stella",
    2.5,
    6,
    55,
    1,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    60,
    630,
  ],
  [
    "5C",
    "Summer",
    5,
    12,
    36,
    5,
    "assets/images/vaginas/vaginas loaded.jpg",
    1,
    2,
    315 - 60,
    630,
  ],
  [
    "6C",
    "Sybil",
    6.5,
    9,
    41,
    2,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1050 - 60,
    630,
  ],
  [
    "7C",
    "Sylvia",
    4,
    5,
    46,
    4,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1260 - 60,
    630,
  ],
  [
    "8C",
    "Verity",
    7.5,
    8,
    51,
    1,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1470 - 60,
    630,
  ],
  [
    "1D",
    "Zephyr",
    3,
    11,
    56,
    3,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    0 - 60,
    945,
  ],
  [
    "2D",
    "Aveline",
    5.5,
    6,
    37,
    5,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    210 - 60,
    945,
  ],
  [
    "3D",
    "Camille",
    4,
    10,
    29,
    2,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    420 - 60,
    945,
  ],
  [
    "4D",
    "Chantal",
    4.5,
    7,
    47,
    5,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    630 - 60,
    945,
  ],
  [
    "5D",
    "Delphine",
    6,
    6,
    17,
    4,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    315 - 60,
    945,
  ],
  [
    "6D",
    "Elodie",
    3.5,
    12,
    57,
    1,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1050 - 60,
    945,
  ],
  [
    "7D",
    "Elora",
    8,
    9,
    25,
    3,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1260 - 60,
    945,
  ],
  [
    "8D",
    "Elowen",
    2.5,
    5,
    30,
    5,
    "assets/images/vaginas/vaginas loaded.jpg",
    2,
    3,
    1470 - 60,
    945,
  ],
];
