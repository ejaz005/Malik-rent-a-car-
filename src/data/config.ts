export interface Vehicle {
  id: string;
  name: string;
  category: 'suv' | 'sedan' | 'van' | 'jeep' | 'pickup';
  categoryLabel: string;
  models: string;
  seats: number;
  transmission: 'Automatic' | 'Manual' | '4WD Automatic' | '4WD Manual';
  fuel: 'Without Fuel' | 'With Fuel Available';
  ac: boolean;
  luggage: number;
  pricePerDay: number;
  pricePerDayUsd: number;
  image: string;
  badge?: string;
  description: string;
  highlights: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  bestSeason: string;
  priceFrom: number;
  priceFromUsd: number;
  image: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  included: string[];
  excluded: string[];
}

export interface Destination {
  id: string;
  name: string;
  altitude: string;
  bestMonths: string;
  roadCondition: 'Paved Highway (Sedan/SUV)' | '4x4 Required Off-Road' | 'Paved & Mountain Passes';
  distanceFromGilgit: string;
  image: string;
  summary: string;
  attractions: string[];
  travelTip: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  vehicleUsed: string;
  comment: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  readTime: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const SITE_CONFIG = {
  businessName: 'Malik Rent A Car Gilgit Baltistan',
  businessNameUrdu: 'ملک رینٹ اے کار گلگت بلتستان',
  tagline: 'Reliable & Affordable Rides Across Gilgit-Baltistan',
  taglineUrdu: 'گلگت بلتستان بھر میں قابل اعتماد اور سستی سواری',
  domain: 'depayalotours.com',
  primaryPhone: '0317 9236600',
  primaryPhoneInternational: '+92 317 9236600',
  secondaryPhone: '0348 0180226',
  secondaryPhoneInternational: '+92 348 0180226',
  email: 'ejazalimalik005@gmail.com',
  supportEmail: 'info@depayalotours.com',
  address: 'Main Airport Road, Gilgit 15100, Gilgit-Baltistan, Pakistan',
  addressUrdu: 'مین ائیرپورٹ روڈ، گلگت 15100، گلگت بلتستان، پاکستان',
  locationCoordinates: {
    lat: 35.9208,
    lng: 74.3144,
  },
  operatingHours: 'Open 24 Hours, 7 Days a Week',
  operatingHoursUrdu: '24 گھنٹے، ہفتے کے 7 دن کھلی ہے',
  establishedYear: '2020',
  experienceYears: '6+ Years Experience',
  serviceAreas: [
    'Gilgit Airport & City',
    'Skardu & Shigar',
    'Hunza Valley (Karimabad, Attabad, Passu)',
    'Khunjerab Pass (Pak-China Border)',
    'Fairy Meadows & Raikot Bridge',
    'Deosai Plains',
    'Naltar Valley & Lakes',
    'Astore & Rama Lake',
    'Ghizer & Phander Valley',
  ],
  paymentsAccepted: [
    'Cash (PKR / USD / EUR)',
    'Visa Card',
    'Mastercard',
    'Debit Cards',
    'Bank Cheque',
    'NFC Mobile Payments (EasyPaisa / JazzCash / Raast)',
  ],
};

export const FLEET_DATA: Vehicle[] = [
  {
    id: 'prado-tx-tz-2015-2019',
    name: 'Toyota Prado TX / TZ',
    category: 'suv',
    categoryLabel: '4x4 Luxury SUV',
    models: '2015 to 2019',
    seats: 7,
    transmission: '4WD Automatic',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 5,
    pricePerDay: 14000,
    pricePerDayUsd: 50,
    image: '/assets/aistudio/images__4__2a8814c6.jfif',
    badge: 'Most Popular',
    description: 'Executive luxury 4x4 Prado with dual AC, premium suspension, and electronic 4WD transfer case. Ideal for family tours to Hunza, Skardu, and Khunjerab.',
    highlights: ['Electronic 4WD Low/High Range', 'Dual Climate AC', '7 Comfort Seats', 'Roof Rack Compatible'],
  },
  {
    id: 'prado-tz-tx-2012-2019-vip',
    name: 'Toyota Land Cruiser Prado TZ / TX',
    category: 'suv',
    categoryLabel: '4x4 Luxury SUV',
    models: '2012 to 2019',
    seats: 7,
    transmission: '4WD Automatic',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 6,
    pricePerDay: 16000,
    pricePerDayUsd: 57,
    image: '/assets/aistudio/images__1__c9eee7f8.jfif',
    badge: 'Premium White',
    description: 'High-trim Toyota Prado with pearl finish, sun-roof, leather interior, and powerful V6 / D4D engine designed for high-altitude passes.',
    highlights: ['V6/D4D High-Altitude Tuning', 'Leather Seating', 'Sunroof & Cool Box', 'All-Terrain Tires'],
  },
  {
    id: 'prado-tz-2012-2018',
    name: 'Toyota Prado TZ',
    category: 'suv',
    categoryLabel: '4x4 SUV',
    models: '2012 to 2018',
    seats: 7,
    transmission: '4WD Automatic',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 5,
    pricePerDay: 16000,
    pricePerDayUsd: 57,
    image: '/assets/aistudio/download__1__61644b06.jfif',
    badge: 'Skardu & Hunza Ready',
    description: 'Rugged yet luxurious Prado equipped for long highway stretches across Karakoram Highway and rough terrain into Shigar and Khaplu.',
    highlights: ['High Ground Clearance', 'Dual Zone Cooling', 'Foldable 3rd Row', 'Bluetooth & USB Sound'],
  },
  {
    id: 'prado-tz-tx-2004-2007',
    name: 'Toyota Prado TZ / TX',
    category: 'suv',
    categoryLabel: '4x4 SUV',
    models: '2004 to 2007',
    seats: 7,
    transmission: '4WD Automatic',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 5,
    pricePerDay: 11000,
    pricePerDayUsd: 39,
    image: '/assets/aistudio/images__3__a35712bb.jfif',
    badge: 'Best Value 4x4',
    description: 'Proven workhorse across Gilgit-Baltistan. Heavy-duty suspension that handles rocky dirt tracks to Naltar, Babusar, and Astore with ease.',
    highlights: ['Legendary 1KZ / 1KD Reliability', 'Full Off-Road Clearance', 'Chilled Air Conditioning', 'Spacious Cargo Area'],
  },
  {
    id: 'prado-tz-2004-2008',
    name: 'Toyota Prado TZ',
    category: 'suv',
    categoryLabel: '4x4 SUV',
    models: '2004 to 2008',
    seats: 7,
    transmission: '4WD Automatic',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 5,
    pricePerDay: 10000,
    pricePerDayUsd: 36,
    image: '/assets/aistudio/images__2__b66922dd.jfif',
    badge: 'Budget 4x4',
    description: 'Economical full-size 4WD Prado perfect for photographers, trekkers, and budget groups exploring rugged mountain valleys.',
    highlights: ['4x4 Low-Gear Ratio', 'Comfort Interior', 'Powerful Engine', 'Driver Included Option'],
  },
  {
    id: 'prado-tz-1999-2000',
    name: 'Toyota Prado TZ Classic',
    category: 'suv',
    categoryLabel: '4x4 Classic SUV',
    models: '1999 to 2000',
    seats: 7,
    transmission: '4WD Automatic',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 5,
    pricePerDay: 7500,
    pricePerDayUsd: 27,
    image: '/assets/aistudio/images_9e3e9388.jfif',
    badge: 'Lowest Rate 4x4',
    description: 'Our most affordable 4x4 Prado option! Solid mechanical build, high chassis clearance, and air conditioning for adventure travelers.',
    highlights: ['Unbeatable Daily Price', 'True 4WD Mountain Climber', 'Mechanical Durability', 'Seats 7 Passengers'],
  },
  {
    id: 'toyota-hilux-revo-4x4',
    name: 'Toyota Hilux Revo 4x4',
    category: 'pickup',
    categoryLabel: 'Double Cabin 4x4',
    models: '2020 to 2024',
    seats: 5,
    transmission: '4WD Automatic',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 8,
    pricePerDay: 16000,
    pricePerDayUsd: 57,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    badge: 'Expedition Beast',
    description: 'Rugged Toyota Hilux Revo with massive open cargo deck for camping gear, trekking backpacks, and heavy mountain trails like Deosai & Shimshal.',
    highlights: ['Heavy Duty Bed Carrier', 'Tough Hill Ascent Assist', 'Modern Infotainment', 'Snorkel & Skid Protection'],
  },
  {
    id: 'toyota-hiace-grand-cabin',
    name: 'Toyota Hiace Grand Cabin',
    category: 'van',
    categoryLabel: 'Luxury High-Roof Van',
    models: '2019 to 2023',
    seats: 14,
    transmission: 'Automatic',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 12,
    pricePerDay: 15000,
    pricePerDayUsd: 54,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    badge: 'Large Families & Groups',
    description: 'High-roof Toyota Hiace Commuter with high back reclining seats, dual front/rear AC, and panoramic view windows for family sightseeing on KKH.',
    highlights: ['14 Pushback Reclining Seats', 'Dual Roof AC Vents', 'Large Luggage Boot', 'Smooth Karakoram Highway Cruising'],
  },
  {
    id: 'toyota-coaster-saloon',
    name: 'Toyota Coaster Saloon',
    category: 'van',
    categoryLabel: 'Tourist Coaster Bus',
    models: '2018 to 2023',
    seats: 26,
    transmission: 'Manual',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 24,
    pricePerDay: 22000,
    pricePerDayUsd: 79,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80',
    badge: 'Corporate & Tour Groups',
    description: 'Full-size 26-29 seater tourist coaster equipped with PA microphone, chilled air conditioning, curtains, and experienced coach mountain captain.',
    highlights: ['26-29 Comfortable Seats', 'PA Tour Guide Microphone', 'Ample Overhead & Rear Storage', 'Highway Certified Driver'],
  },
  {
    id: 'toyota-corolla-altis-gli',
    name: 'Toyota Corolla GLi / Altis',
    category: 'sedan',
    categoryLabel: 'Economy Sedan',
    models: '2020 to 2024',
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Without Fuel',
    ac: true,
    luggage: 3,
    pricePerDay: 6500,
    pricePerDayUsd: 23,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=80',
    badge: 'Economy City & KKH',
    description: 'Comfortable, fuel-efficient sedan for Gilgit city transit, airport transfers, and smooth paved highway travel to Hunza and Karimabad.',
    highlights: ['Excellent Fuel Economy', 'Smooth Air Conditioned Ride', '4 Passengers + Luggage', 'Affordable Daily Rate'],
  },
  {
    id: 'mountain-4x4-jeep-fairy-meadows',
    name: 'Willys / CJ7 Mountain 4x4 Jeep',
    category: 'jeep',
    categoryLabel: 'Offroad Mountain Jeep',
    models: 'Custom Offroad Spec',
    seats: 6,
    transmission: '4WD Manual',
    fuel: 'With Fuel Available',
    ac: false,
    luggage: 4,
    pricePerDay: 12000,
    pricePerDayUsd: 43,
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80',
    badge: 'Fairy Meadows Specialist',
    description: 'Narrow-chassis specialized 4x4 jeep required by local cooperative unions for navigating the legendary Raikot Bridge to Tattu (Fairy Meadows) cliff track.',
    highlights: ['Fairy Meadows Certified', 'Narrow Cliff Track Ready', 'Heavy-Duty Leaf Springs', 'Native Mountain Driver'],
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'hunza-valley-majesty',
    title: 'Hunza Valley & Khunjerab Pass Expedition',
    tagline: 'Ancient Silk Road, Golden Apricot Valleys & 7,000m Peak Vistas',
    duration: '5 Days / 4 Nights',
    bestSeason: 'April to November',
    priceFrom: 65000,
    priceFromUsd: 232,
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Altit & Baltit Forts', 'Attabad Lake Boating', 'Passu Cones & Suspension Bridge', 'Khunjerab National Park 4,693m', 'Hussaini Bridge'],
    itinerary: [
      { day: 'Day 1', title: 'Gilgit Airport Pickup & Scenic Drive to Karimabad', desc: 'Meet our driver at Gilgit Airport. Drive on Karakoram Highway with views of Rakaposhi (7,788m). Sunset at Eagle’s Nest Duikar.' },
      { day: 'Day 2', title: 'Altit Fort, Baltit Fort & Local Silk Road Bazaars', desc: 'Explore the 900-year-old Baltit Fort and 1,100-year-old Altit Fort royal gardens. Savor authentic Hunza walnut cake and local cuisine.' },
      { day: 'Day 3', title: 'Attabad Lake, Passu Glacier & Hussaini Suspension Bridge', desc: 'Cruise the vivid turquoise waters of Attabad Lake. Walk across the thrilling Hussaini suspension bridge and photograph the iconic Passu Cathedral Cones.' },
      { day: 'Day 4', title: 'Khunjerab Pass — Highest Paved International Border', desc: 'Drive through Karakoram National Park to 4,693 meters altitude at the China border. Spot Himalayan Ibex and golden marmots.' },
      { day: 'Day 5', title: 'Return to Gilgit via Rakaposhi View Point', desc: 'Morning photography stop at Rakaposhi base view. Drop-off at Gilgit Airport or hotel.' },
    ],
    included: ['Dedicated 4x4 Prado or Hiace with Fuel', 'Professional Mountain Driver & Guide', 'All Road Tolls & Parking Fees', '24/7 Concierge Support'],
    excluded: ['Hotel Accommodations (Available on request)', 'Boating / Attraction Tickets', 'Personal Meals & Beverages'],
  },
  {
    id: 'skardu-deosai-paradise',
    title: 'Skardu, Shigar Valley & Deosai Plains Safari',
    tagline: 'Cold Deserts, High-Altitude Plateau & Historic Fort Palaces',
    duration: '6 Days / 5 Nights',
    bestSeason: 'June to October',
    priceFrom: 85000,
    priceFromUsd: 303,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Shangrila Resort & Lower Kachura', 'Katpana Cold Desert Stargazing', 'Deosai National Park & Sheosar Lake', 'Shigar Fort Palace', 'Upper Kachura Boating'],
    itinerary: [
      { day: 'Day 1', title: 'Gilgit or Skardu Airport Arrival & Shangrila Resort', desc: 'Transfer along the Indus River canyon. Visit the picturesque Pagoda lakeside cottages of Shangrila.' },
      { day: 'Day 2', title: 'Upper Kachura Lake & Katpana Cold Desert', desc: 'Hike to the crystal clear Upper Kachura lake. Experience the world’s highest cold sand dunes with ATV rides and desert sunset.' },
      { day: 'Day 3', title: 'Deosai National Park 4x4 Safari ("Land of Giants")', desc: 'Full-day 4x4 expedition to the world’s second-highest plateau (4,114m). Visit the mirror-like Sheosar Lake and wildflower meadows.' },
      { day: 'Day 4', title: 'Shigar Valley & 400-Year-Old Fong-Khar Palace', desc: 'Explore the gateway to K2. Tour the museum and royal orchards of Serena Shigar Fort.' },
      { day: 'Day 5', title: 'Khaplu Palace & Chaqchan Mosque Heritage', desc: 'Drive along the Shyok River to Khaplu. Discover the historic wooden architecture of Chaqchan Mosque (founded in 1370).' },
      { day: 'Day 6', title: 'Skardu Bazaars & Departure Transfer', desc: 'Shop for Baltistan dry fruits, Shilajit, and gems before departure.' },
    ],
    included: ['4x4 Prado or Hilux Revo with local driver', 'Fuel & Deosai Off-road Permit Support', 'Airport Pick & Drop', 'Bottled Mineral Water'],
    excluded: ['Flights', 'National Park Entrance Fees', 'Personal Expenses'],
  },
  {
    id: 'fairy-meadows-nanga-parbat',
    title: 'Fairy Meadows & Nanga Parbat Basecamp Adventure',
    tagline: 'The "Killer Mountain" (8,126m) Up Close from Lush Pine Plateaus',
    duration: '4 Days / 3 Nights',
    bestSeason: 'May to October',
    priceFrom: 55000,
    priceFromUsd: 196,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Raikot Bridge 4x4 Mountain Jeep Track', 'Trekking through Pine Forests to Fairy Meadows', 'Nanga Parbat Reflection Pools', 'Beyal Camp & German View Point', 'Starlit Campfires'],
    itinerary: [
      { day: 'Day 1', title: 'Drive to Raikot Bridge & Thrilling 4x4 Jeep Climb', desc: 'Car transfer from Gilgit to Raikot Bridge. Board specialized local 4x4 mountain jeep up to Tattu village, followed by a 3-hour guided pine trek to Fairy Meadows.' },
      { day: 'Day 2', title: 'Fairy Meadows Exploration & Nanga Parbat Face', desc: 'Wake up to the awe-inspiring 8,126m ice wall of Nanga Parbat. Relax by natural pools and explore local shepherd huts.' },
      { day: 'Day 3', title: 'Trek to Beyal Camp & Nanga Parbat Base Camp', desc: 'Hike through birch woods to Beyal Camp and onward to Viewpoint 1 overlooking the Raikot Glacier seracs.' },
      { day: 'Day 4', title: 'Trek Down to Tattu, Jeep to Raikot & Gilgit Return', desc: 'Descend to Tattu village, take the return jeep to Raikot Bridge, and board our comfortable Prado/Hiace back to Gilgit.' },
    ],
    included: ['Gilgit to Raikot transfer vehicle', 'Local Raikot mountain 4x4 jeep round trip', 'Mountain trekking guide', '24/7 logistical monitoring'],
    excluded: ['Cabin/Tent stay (Can be booked upon request)', 'Porters / horse rides for trek'],
  },
  {
    id: 'naltar-valley-emerald-lakes',
    title: 'Naltar Valley & Seven Colored Alpine Lakes',
    tagline: 'Pine Forests, Ski Resort & Pristine Turquoise Waters',
    duration: '2 Days / 1 Night',
    bestSeason: 'June to October (Winter for Skiing)',
    priceFrom: 28000,
    priceFromUsd: 100,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Naltar Pine Forests', 'Green Lake (Pari Lake)', 'Blue Lake (Bashkiri Lake)', 'Famous Naltar Potatoes & Trout', 'Naltar Ski Slopes'],
    itinerary: [
      { day: 'Day 1', title: 'Gilgit to Naltar Valley 4x4 Off-Road Drive', desc: 'Ascend the dramatic Naltar gorge by 4x4 Prado. Check into mountain chalet and visit the PAF ski slopes.' },
      { day: 'Day 2', title: 'Emerald Lakes Safari & Return to Gilgit', desc: 'Tackle the rocky off-road trail to Naltar Lakes 1, 2, and 3. Enjoy fresh river trout lunch and return to Gilgit before sunset.' },
    ],
    included: ['Rugged 4x4 Prado or Hilux with experienced mountain driver', 'Fuel & road access', 'Cold refreshments'],
    excluded: ['Meals & Hotel'],
  },
];

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'hunza-valley',
    name: 'Hunza Valley',
    altitude: '2,438 meters (8,000 ft)',
    bestMonths: 'April to October (Cherry Blossom: April, Autumn: Oct-Nov)',
    roadCondition: 'Paved Highway (Sedan/SUV)',
    distanceFromGilgit: '100 km (~2 hours via KKH)',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=1000&q=80',
    summary: 'The crown jewel of Northern Pakistan. Renowned for its longevity, welcoming Wakhi & Burusho culture, terraced orchards, and legendary 7,000m peaks like Rakaposhi, Ultar Sar, and Ladyfinger.',
    attractions: ['Baltit Fort', 'Altit Fort Royal Gardens', 'Eagle’s Nest Sunset Point', 'Attabad Lake', 'Passu Cones'],
    travelTip: 'The road from Gilgit to Hunza is smooth, newly surfaced Karakoram Highway. Any sedan or 4x4 Prado drives smoothly here.',
  },
  {
    id: 'skardu-baltistan',
    name: 'Skardu & Shigar',
    altitude: '2,228 meters (7,310 ft)',
    bestMonths: 'May to October',
    roadCondition: 'Paved & Mountain Passes',
    distanceFromGilgit: '200 km (~4.5 hours via Jaglot-Skardu Road)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    summary: 'The gateway to four 8,000-meter giants (K2, Broad Peak, Gasherbrum I & II). Features otherworldly cold sand dunes, alpine lakes, and Tibetan-influenced palaces.',
    attractions: ['Shangrila Resort', 'Upper Kachura Lake', 'Katpana Desert', 'Shigar Fort', 'Manthal Buddha Rock'],
    travelTip: 'The upgraded Gilgit-Skardu expressway is now paved, but occasional rockfall makes a high-clearance Prado or Hilux preferable for peace of mind.',
  },
  {
    id: 'deosai-national-park',
    name: 'Deosai National Park',
    altitude: '4,114 meters (13,497 ft)',
    bestMonths: 'July to September only (Covered in snow rest of year)',
    roadCondition: '4x4 Required Off-Road',
    distanceFromGilgit: '230 km (Via Skardu or Astore)',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    summary: 'Known as the "Land of Giants", Deosai is the second-highest alpine plateau on Earth. Home to endangered Himalayan Brown Bears, golden eagles, and millions of wildflowers.',
    attractions: ['Sheosar Lake (Heart-shaped reflection)', 'Bara Pani river crossing', 'Kala Pani', 'Wildflower carpets'],
    travelTip: 'Strictly 4x4 only! Low-clearance cars cannot cross the rocky riverbeds. Rent our Prado TX/TZ or Hilux Revo with an experienced driver.',
  },
  {
    id: 'fairy-meadows',
    name: 'Fairy Meadows & Nanga Parbat',
    altitude: '3,300 meters (10,800 ft)',
    bestMonths: 'May to October',
    roadCondition: '4x4 Required Off-Road',
    distanceFromGilgit: '80 km to Raikot Bridge + 15 km Jeep Track',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    summary: 'Lush green alpine meadows perched directly beneath the colossal north face (Raikot Face) of Nanga Parbat (8,126m). Camp under millions of Milky Way stars.',
    attractions: ['Nanga Parbat 8,126m view', 'Beyal Camp', 'Raikot Glacier', 'Reflection Pool'],
    travelTip: 'Private cars must park at Raikot Bridge. Our team coordinates certified local 4x4 jeeps up the cliff road to Tattu village.',
  },
  {
    id: 'khunjerab-pass',
    name: 'Khunjerab Pass (China Border)',
    altitude: '4,693 meters (15,397 ft)',
    bestMonths: 'May to November (Closed in deep winter)',
    roadCondition: 'Paved Highway (Sedan/SUV)',
    distanceFromGilgit: '270 km (~5.5 hours via KKH)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    summary: 'The highest paved international border crossing in the world, connecting Pakistan and China through the Karakoram Mountain range. Features the world’s highest ATM.',
    attractions: ['Khunjerab National Park Gate', 'Pak-China Monument & Gate', 'World’s Highest National Bank ATM', 'Himalayan Wildlife spotting'],
    travelTip: 'High altitude! Bring warm jackets even in July. Drink water to avoid altitude headaches. Passport / CNIC required at park checkpost.',
  },
  {
    id: 'naltar-valley',
    name: 'Naltar Valley & Lakes',
    altitude: '2,880 meters (9,450 ft)',
    bestMonths: 'May to October (Lakes), Dec to Feb (Skiing)',
    roadCondition: '4x4 Required Off-Road',
    distanceFromGilgit: '40 km (~2 hours due to mountain grade)',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    summary: 'Famous for its dense cedar and pine forests, internationally recognized ski competitions, and seven kaleidoscopic lakes changing color from emerald green to deep azure.',
    attractions: ['Naltar Lakes (Satrangi Lake, Pari Lake)', 'PAF International Ski Resort', 'Rainbow trout streams'],
    travelTip: 'The final 12 km ascent requires strong 4x4 low gears and rock clearance. Our Prado TZ/TX handles this effortlessly.',
  },
];

export const TRAVEL_TIPS = [
  {
    category: 'Roads & Driving',
    icon: 'compass',
    title: 'Karakoram Highway & Off-road Routes',
    summary: 'The main KKH connecting Gilgit, Hunza, and Khunjerab is a world-class asphalt highway. However, branch valleys like Naltar, Fairy Meadows (Raikot), and Deosai require high-clearance 4WD vehicles. Our drivers have 10+ years traversing every hairpin bend and river crossing.',
  },
  {
    category: 'Permits & NOC',
    icon: 'shield-check',
    title: 'Foreign Travelers & Local NOC Rules',
    summary: 'Gilgit-Baltistan is open and welcoming to international tourists! No NOC (No Objection Certificate) is required for main tourist hubs including Gilgit, Hunza, Skardu, Attabad, and Passu. Foreign guests simply register their valid Pakistani visa and passport at tourism check-posts.',
  },
  {
    category: 'Altitude & Health',
    icon: 'heart-pulse',
    title: 'Acclimatization & Mountain Hydration',
    summary: 'Gilgit sits at 1,500m, Karimabad at 2,400m, Skardu at 2,200m, while Deosai and Khunjerab exceed 4,100m to 4,700m. Take your time, drink plenty of fluids, and carry warm layers. Avoid rapid ascent if you feel lightheaded.',
  },
  {
    category: 'Weather & Seasons',
    icon: 'cloud-sun',
    title: 'Choosing Your Ideal Travel Window',
    summary: '• Spring (April-May): Cherry & apricot blossom across Hunza.\n• Summer (June-Aug): Ideal for Deosai, high trekking passes, and lush greenery.\n• Autumn (Oct-Nov): Legendary golden foliage in Hunza & Nagar.\n• Winter (Dec-Feb): Snow tours, frozen Attabad Lake, and Naltar ski competitions.',
  },
  {
    category: 'Packing & Cash',
    icon: 'wallet',
    title: 'Cash, Connectivity & Essentials',
    summary: 'While Gilgit and Skardu have functioning ATMs and mobile signals (SCOM / Zong / Jazz), branch valleys have intermittent connectivity. Always carry cash in Pakistani Rupees. We accept cash, card, and digital transfers at our Gilgit headquarters.',
  },
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    author: 'Hamza Tariq',
    city: 'Lahore, Pakistan',
    rating: 5,
    date: 'October 2024',
    vehicleUsed: 'Toyota Prado TX 2018',
    comment: 'Booked a 7-day Prado tour with driver Imran for Hunza and Khunjerab. The car was spotless, AC was crisp, and the driver knew every scenic photo spot and safe restaurant. 10/10 service by Malik Rent A Car!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'rev-2',
    author: 'Elena & Marcus Weber',
    city: 'Munich, Germany',
    rating: 5,
    date: 'August 2024',
    vehicleUsed: 'Toyota Hilux Revo 4x4',
    comment: 'We did the full Skardu and Deosai circuit. Roads in Deosai are tough, but the Hilux and our driver Malik handled the boulder crossings like champions. Honest pricing, no hidden extras, and 24/7 WhatsApp support.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'rev-3',
    author: 'Dr. Zeeshan Haider',
    city: 'Islamabad, Pakistan',
    rating: 5,
    date: 'November 2024',
    vehicleUsed: 'Toyota Prado TZ 2007',
    comment: 'Affordable and genuine! We rented the 2007 TZ Prado for PKR 11,000/day. The car had immense torque on steep climbs to Eagle’s Nest and Naltar. Malik brother personally ensured our airport pickup was on time.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'rev-4',
    author: 'Khadija & Family',
    city: 'Karachi, Pakistan',
    rating: 5,
    date: 'July 2024',
    vehicleUsed: 'Toyota Hiace Grand Cabin (14-seater)',
    comment: 'Travelled with 11 family members including elderly parents. The Grand Cabin van had super comfortable push-back seats and powerful AC even in the July sun. Our driver was extremely polite and cautious on mountain turns.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  },
];

export const FAQS = [
  {
    question: 'Can I rent a car for self-drive or is a driver included?',
    questionUrdu: 'کیا میں سیلف ڈرائیو کے لیے گاڑی لے سکتا ہوں یا ڈرائیور لازمی ہے؟',
    answer: 'We provide both! For most tourists, we strongly recommend our local mountain drivers who are masters of high-altitude mountain terrain, weather changes, and single-lane bridges. Self-drive is also available with a valid driving license, security deposit, and CNIC/Passport verification.',
    answerUrdu: 'ہم دونوں آپشنز پیش کرتے ہیں۔ سیاحوں کے لیے مقامی تجربہ کار ڈرائیور بہترین ہے، البتہ شناختی کارڈ اور ڈرائیونگ لائسنس پر سیلف ڈرائیو بھی دستیاب ہے۔',
  },
  {
    question: 'What is the fuel policy?',
    questionUrdu: 'فیول کی کیا پالیسی ہے؟',
    answer: 'Our standard rates are "Without Fuel" (you receive the vehicle with fuel and refill as needed during your journey). We also offer customized all-inclusive tour packages with fuel and driver daily allowances included so you do not have to worry about petrol pump stops.',
    answerUrdu: 'معمول کے کرائے بغیر فیول کے ہیں۔ آپ کی سہولت کے لیے ہم فیول سمیت مکمل ٹور پیکج بھی دیتے ہیں۔',
  },
  {
    question: 'How do I book from Gilgit or Skardu Airport?',
    questionUrdu: 'گلگت یا سکردو ائیرپورٹ سے بکنگ کیسے کی جائے؟',
    answer: 'Simply share your flight details via our booking form or WhatsApp (+92 317 9236600). Our driver will be waiting at the arrivals terminal holding a signboard with your name, ready to load your luggage into your pre-inspected 4x4 or van.',
    answerUrdu: 'اپنی فلائٹ کی تفصیلات واٹس ایپ پر بھیجیں۔ ہمارا نمائندہ ائیرپورٹ پر آپ کا استقبال کرے گا۔',
  },
  {
    question: 'What happens if a vehicle has mechanical trouble on the road?',
    questionUrdu: 'راستے میں گاڑی خراب ہونے کی صورت میں کیا سہولت ہے؟',
    answer: 'We operate 24/7 emergency dispatch across Gilgit, Skardu, Hunza, and Chilas. If any mechanical fault occurs, our roadside assistance team repairs it immediately or replaces the vehicle from our network so your holiday itinerary continues uninterrupted.',
    answerUrdu: 'ہم 24 گھنٹے ہنگامی امداد فراہم کرتے ہیں۔ کسی خرابی کی صورت میں فوری مرمت یا متبادل گاڑی دی جاتی ہے۔',
  },
  {
    question: 'What payment methods do you accept?',
    questionUrdu: 'ادائیگی کے کون سے طریقے قبول ہیں؟',
    answer: 'We accept Cash (PKR, USD, EUR, GBP), Visa, Mastercard, Debit cards, Bank Cheques, and NFC Mobile Payments (Raast, EasyPaisa, JazzCash). An invoice and digital receipt are provided upon booking.',
    answerUrdu: 'ہم کیش، ویزا، ماسٹر کارڈ، بینک ٹرانسفر اور ایزی پیسہ/جاز کیش قبول کرتے ہیں۔',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Ultimate 2026 Guide to Renting a 4x4 in Gilgit & Skardu',
    slug: 'rent-a-car-gilgit-skardu-guide',
    readTime: '6 min read',
    category: 'Travel Guide',
    date: 'January 2025',
    image: '/assets/aistudio/images__4__2a8814c6.jfif',
    excerpt: 'Everything you need to know about navigating the Karakoram Highway, Deosai crossings, and choosing between Prado TZ, TX, or Hilux Revo.',
    content: [
      'Gilgit-Baltistan is home to three of the world’s greatest mountain ranges: the Karakorams, Himalayas, and Hindu Kush.',
      'While the main Karakoram Highway is completely carpeted, getting to breathtaking viewpoints like Deosai, Fairy Meadows, Naltar, and Rama Lake requires genuine 4x4 low-range capabilities.',
      'Our Toyota Prado TX/TZ series provides the ideal balance of luxury seating for family members and robust rock-crawling torque.',
    ],
  },
  {
    id: 'post-2',
    title: 'Hunza Valley Cherry Blossom vs Autumn Foliage: Best Time to Visit',
    slug: 'best-time-to-visit-hunza-valley',
    readTime: '5 min read',
    category: 'Destinations',
    date: 'February 2025',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Compare the pastel pink cherry blossoms of April against the radiant golden poplar trees of October in Karimabad and Passu.',
    content: [
      'Spring arrives in April, transforming the valley into an ethereal sea of pink and white apricot blossoms set against snow-capped 7,000m summits.',
      'Autumn in October turns the landscape into a golden tapestry of yellow poplars, red maples, and crystal turquoise waters at Attabad Lake.',
      'Both seasons offer cool, crisp weather perfect for road touring.',
    ],
  },
  {
    id: 'post-3',
    title: 'Driving Skardu to Deosai Plains: Road Status, Clearance & Safety Tips',
    slug: 'skardu-to-deosai-road-guide',
    readTime: '7 min read',
    category: '4x4 Off-Road',
    date: 'March 2025',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Why standard cars cannot cross the Ali Malik pass, what to pack for freezing plateau winds, and bear-spotting guidelines.',
    content: [
      'At 4,114 meters, Deosai is a wilderness of roaring rivers and rolling grassy plains. The road from Skardu climbs via the steep Ali Malik pass.',
      'Never attempt Deosai in a sedan or 2WD vehicle. The boulder beds at Bara Pani and Kala Pani require ground clearance and four-wheel drive lock.',
      'Malik Rent A Car equips all Deosai-bound Prados and Hiluxes with tow straps, spare tires, and seasoned drivers.',
    ],
  },
];
