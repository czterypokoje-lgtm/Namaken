/**
 * Model names we make keys for, per brand.
 *
 * These are model NAMES only. An earlier version carried a production-year
 * span per model, described in its own comment as "plausible" — that is, made
 * up to look right rather than sourced. A wrong year on a model page costs a
 * lead: an owner of a 2015 car reading "2003 / 2012" concludes we cannot help
 * them. Both competitors checked (autosleutelpoint.nl, autosleuteloplocatie.nl)
 * list model names with no years at all, so the years were never a competitive
 * necessity either. They are gone rather than guessed again.
 *
 * Add a year span back only from a source you can point at, and only if it is
 * correct for every generation of that model sold in the Netherlands.
 */
export const brandModels: Record<string, string[]> = {
  "Alfa Romeo": ["145", "146", "147", "155", "156", "159", "166", "Brera", "GT", "GTV", "Giulia", "Giulietta", "MiTo", "Spider", "Stelvio", "Tonale"],
  Audi: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "Allroad", "Q2", "Q3", "Q5", "Q7", "Q8", "R8", "RS3", "S3", "S4", "TT", "e-tron"],
  BMW: ["1-serie", "2-serie", "3-serie", "4-serie", "5-serie", "6-serie", "7-serie", "8-serie", "M3", "M5", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z3", "Z4", "i3", "i4", "iX"],
  Chevrolet: ["Aveo", "Camaro", "Captiva", "Cruze", "Epica", "Kalos", "Lacetti", "Matiz", "Nubira", "Orlando", "Spark", "Trax"],
  Chrysler: ["300C", "Crossfire", "Grand Voyager", "Neon", "PT Cruiser", "Sebring", "Voyager", "Ypsilon"],
  "Citroën": ["Berlingo", "C1", "C2", "C3", "C3 Picasso", "C4", "C4 Cactus", "C4 Picasso", "C5", "C5 Aircross", "C6", "C8", "DS3", "DS4", "DS5", "Jumper", "Jumpy", "Nemo", "Saxo", "Xsara"],
  Dacia: ["Dokker", "Duster", "Jogger", "Lodgy", "Logan", "Sandero", "Spring"],
  Daewoo: ["Espero", "Kalos", "Lanos", "Leganza", "Matiz", "Nubira", "Tacuma"],
  Daihatsu: ["Charade", "Copen", "Cuore", "Materia", "Move", "Sirion", "Terios", "YRV"],
  Fiat: ["500", "500L", "500X", "Bravo", "Croma", "Doblo", "Ducato", "Fiorino", "Grande Punto", "Idea", "Linea", "Multipla", "Panda", "Punto", "Qubo", "Scudo", "Sedici", "Seicento", "Stilo", "Tipo", "Ulysse"],
  Ford: ["B-Max", "C-Max", "Ecosport", "Edge", "Explorer", "Fiesta", "Focus", "Fusion", "Galaxy", "Ka", "Kuga", "Mondeo", "Mustang", "Puma", "Ranger", "S-Max", "Tourneo", "Transit"],
  Honda: ["Accord", "CR-V", "CR-Z", "Civic", "FR-V", "HR-V", "Insight", "Jazz", "Legend", "Prelude", "S2000", "Stream"],
  Hyundai: ["Accent", "Atos", "Bayon", "Getz", "Ioniq", "Kona", "Matrix", "Santa Fe", "Sonata", "Tucson", "i10", "i20", "i30", "i40", "ix20", "ix35"],
  Jaguar: ["E-Pace", "F-Pace", "F-Type", "I-Pace", "S-Type", "X-Type", "XE", "XF", "XJ", "XK"],
  Jeep: ["Avenger", "Cherokee", "Commander", "Compass", "Grand Cherokee", "Patriot", "Renegade", "Wrangler"],
  Kia: ["Carens", "Ceed", "Cerato", "EV6", "Niro", "Optima", "Picanto", "Rio", "Sorento", "Soul", "Sportage", "Stonic", "Venga", "Xceed"],
  Lancia: ["Delta", "Lybra", "Musa", "Phedra", "Thesis", "Voyager", "Ypsilon", "Zeta"],
  Landrover: ["Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  Lexus: ["CT", "ES", "GS", "IS", "LS", "NX", "RC", "RX", "UX"],
  Mazda: ["2", "3", "323", "5", "6", "626", "CX-3", "CX-30", "CX-5", "CX-60", "CX-7", "MX-5", "Premacy", "RX-8", "Tribute"],
  Mercedes: ["A-Klasse", "B-Klasse", "C-Klasse", "CLA", "CLK", "CLS", "Citan", "E-Klasse", "G-Klasse", "GLA", "GLB", "GLC", "GLE", "GLK", "ML", "S-Klasse", "SLK", "Sprinter", "Vaneo", "Viano", "Vito"],
  Mini: ["Cabrio", "Clubman", "Cooper", "Countryman", "One", "Paceman"],
  Mitsubishi: ["ASX", "Carisma", "Colt", "Eclipse", "Eclipse Cross", "Galant", "Grandis", "L200", "Lancer", "Outlander", "Pajero", "Space Star"],
  Nissan: ["Almera", "Ariya", "Cube", "Juke", "Leaf", "Micra", "Murano", "NV200", "Navara", "Note", "Pathfinder", "Pixo", "Primera", "Pulsar", "Qashqai", "X-Trail"],
  Opel: ["Adam", "Agila", "Ampera", "Antara", "Astra", "Combo", "Corsa", "Crossland", "Grandland", "Insignia", "Karl", "Meriva", "Mokka", "Movano", "Signum", "Tigra", "Vectra", "Vivaro", "Zafira"],
  Peugeot: ["106", "107", "108", "2008", "205", "206", "207", "208", "3008", "301", "306", "307", "308", "4007", "405", "406", "407", "5008", "508", "Bipper", "Boxer", "Expert", "Partner", "RCZ", "Rifter", "Traveller"],
  Porsche: ["718", "911", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera", "Taycan"],
  Renault: ["Arkana", "Austral", "Captur", "Clio", "Espace", "Fluence", "Grand Scenic", "Kadjar", "Kangoo", "Koleos", "Laguna", "Master", "Megane", "Modus", "Scenic", "Talisman", "Trafic", "Twingo", "Twizy", "Zoe"],
  Saab: ["9-3", "9-5", "9-7X", "900", "9000"],
  Seat: ["Alhambra", "Altea", "Arona", "Arosa", "Ateca", "Cordoba", "Exeo", "Formentor", "Ibiza", "Leon", "Mii", "Tarraco", "Toledo"],
  Skoda: ["Citigo", "Enyaq", "Fabia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Rapid", "Roomster", "Scala", "Superb", "Yeti"],
  Smart: ["EQ Fortwo", "Forfour", "Fortwo", "Roadster"],
  Subaru: ["BRZ", "Forester", "Impreza", "Justy", "Legacy", "Levorg", "Outback", "Trezia", "XV"],
  Suzuki: ["Alto", "Baleno", "Celerio", "Grand Vitara", "Ignis", "Jimny", "Kizashi", "Liana", "S-Cross", "SX4", "Splash", "Swift", "Vitara", "Wagon R"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Toyota: ["Auris", "Avensis", "Aygo", "C-HR", "Camry", "Celica", "Corolla", "GT86", "Hilux", "Land Cruiser", "Prius", "Proace", "RAV4", "Urban Cruiser", "Verso", "Yaris", "Yaris Cross", "bZ4X", "iQ"],
  Volkswagen: ["Amarok", "Arteon", "Beetle", "Caddy", "Crafter", "Eos", "Fox", "Golf", "ID.3", "ID.4", "Jetta", "Lupo", "Multivan", "Passat", "Polo", "Scirocco", "Sharan", "T-Cross", "T-Roc", "Tiguan", "Touareg", "Touran", "Transporter", "Up!"],
  Volvo: ["C30", "C70", "EX30", "S40", "S60", "S80", "S90", "V40", "V50", "V60", "V70", "V90", "XC40", "XC60", "XC70", "XC90"],
};

export const getBrandModels = (brand: string): string[] => brandModels[brand] ?? [];
