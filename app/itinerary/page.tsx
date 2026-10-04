'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Check, Clock3, MapPin, Users, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/lib/language-context';

type Day = {
  title: string;
  place: string;
  stay: string;
  details: string[];
};

type Journey = {
  id: string;
  number: string;
  title: string;
  daysLabel: string;
  route: string;
  image: string;
  imageAlt: string;
  introduction: string;
  price: string;
  priceNote: string;
  group: string;
  days: Day[];
  included: string[];
  excluded: string[];
  payment?: string;
};

type PageContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  choose: string;
  routeLabel: string;
  guestsLabel: string;
  investmentLabel: string;
  dayLabel: string;
  stayLabel: string;
  includedLabel: string;
  excludedLabel: string;
  paymentLabel: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaCopy: string;
  ctaButton: string;
  journeys: Journey[];
};

const english: PageContent = {
  eyebrow: 'Curated Egypt itineraries',
  title: 'Three journeys.',
  titleAccent: 'One deeper Egypt.',
  intro: 'Explore three considered ways through Egypt, each balancing ancient monuments, living culture, and time to simply be present.',
  choose: 'Choose a journey',
  routeLabel: 'Route',
  guestsLabel: 'Guests',
  investmentLabel: 'Journey investment',
  dayLabel: 'Day',
  stayLabel: 'Stay',
  includedLabel: 'Included',
  excludedLabel: 'Not included',
  paymentLabel: 'Payment',
  ctaEyebrow: 'Made personal',
  ctaTitle: 'Let the itinerary become yours.',
  ctaCopy: 'These routes are a starting point. We can refine the pace, stays, and experiences around the way you want to encounter Egypt.',
  ctaButton: 'Begin a conversation',
  journeys: [
    {
      id: 'classic',
      number: '01',
      title: 'The Essential Passage',
      daysLabel: '8 days',
      route: 'Cairo · Aswan · Luxor · Red Sea',
      image: '/images/abu-simbel.jpeg',
      imageAlt: 'The monumental temples of Abu Simbel in southern Egypt',
      introduction: 'A sweeping private passage from Cairo’s great monuments to the temples of Upper Egypt, ending with a quiet day on the Red Sea.',
      price: '$3,675 total',
      priceNote: 'Quoted for three guests',
      group: '3 guests',
      days: [
        { title: 'Arrival and old Cairo', place: 'Cairo', stay: 'Cairo', details: ['Arrival on MS952 at 06:25, Cairo International Airport Terminal 3.', 'Airport assistance and visa formalities.', 'Saladin Citadel, the Cave Church via Garbage City, and the National Museum of Egyptian Civilization.', 'Lunch, Khan el-Khalili, then transfer to the hotel.'] },
        { title: 'Icons of Giza', place: 'Cairo', stay: 'Cairo', details: ['Breakfast at the hotel.', 'The Giza Pyramids and Great Sphinx.', 'Lunch followed by the Grand Egyptian Museum.'] },
        { title: 'South to Aswan', place: 'Aswan', stay: 'Aswan', details: ['Breakfast, then a domestic flight from Cairo to Aswan of approximately 1 hour 20 minutes.', 'Aswan High Dam and Philae Temple.', 'Lunch and hotel check-in.', 'Afternoon felucca journey to the Nubian Village.'] },
        { title: 'Abu Simbel', place: 'Aswan', stay: 'Aswan', details: ['Breakfast followed by the drive to Abu Simbel, approximately 3 hours.', 'Visit the temples and have lunch nearby.', 'Return to the Aswan hotel.'] },
        { title: 'The temples of the east bank', place: 'Luxor', stay: 'Luxor', details: ['Breakfast and check-out, then drive approximately 3 hours to Luxor.', 'Lunch on arrival.', 'Karnak Temple and Luxor Temple.', 'Transfer to the Luxor hotel.'] },
        { title: 'The west bank to the sea', place: 'Luxor · Red Sea', stay: 'Red Sea', details: ['Breakfast and check-out.', 'Valley of the Kings, Temple of Hatshepsut, and the Colossi of Memnon.', 'Lunch, then drive approximately 3 hours to the Red Sea.', 'Hotel check-in, rest, and dinner at the hotel.'] },
        { title: 'A day by the Red Sea', place: 'Red Sea', stay: 'Red Sea', details: ['A full free day at the resort.', 'Breakfast, lunch, and dinner are provided by the hotel.'] },
        { title: 'Return to Cairo', place: 'Red Sea · Cairo', stay: 'Departure', details: ['Check out at 12:00 and have lunch.', 'Depart at 13:00 for Cairo International Airport Terminal 3.', 'Driving time is approximately 5 hours.'] },
      ],
      included: ['Visa on arrival', 'Admission to all listed sights', 'Private 16-seat vehicle throughout, including parking and road fees', 'Driver and guide gratuities', 'Domestic flight', 'Daily lunch'],
      excluded: ['Hotel accommodation', 'Daily dinner unless specifically stated', 'Optional activities such as a Luxor hot-air balloon, Red Sea boat trip, or diving', 'International flights'],
    },
    {
      id: 'nile',
      number: '02',
      title: 'Nile to the Red Sea',
      daysLabel: '9 days',
      route: 'Cairo · Aswan · Nile Cruise · Luxor · Red Sea',
      image: '/images/dendera-ceiling.webp',
      imageAlt: 'The richly decorated ceiling of an ancient Egyptian temple',
      introduction: 'A generous route that pairs Cairo’s landmarks with a sleeper-train arrival in Aswan, a Nile cruise, and two unhurried days beside the Red Sea.',
      price: '$2,725 per guest',
      priceNote: 'Quoted for a group of twelve',
      group: '12 guests',
      days: [
        { title: 'Arrival and Cairo heritage', place: 'Cairo', stay: 'Cairo', details: ['Airport welcome, visa assistance, and transfer into Cairo.', 'Saladin Citadel.', 'Lunch, the National Museum of Egyptian Civilization, and Khan el-Khalili.', 'Dinner and rest at the hotel.'] },
        { title: 'Giza and the overnight train', place: 'Cairo · Aswan', stay: 'Sleeper train', details: ['Breakfast at the hotel.', 'Giza Pyramids, lunch, and the Grand Egyptian Museum.', 'Dinner, then board the sleeper train to Aswan; dinner is served on board.'] },
        { title: 'Aswan and Nubian culture', place: 'Aswan', stay: 'Nile cruise', details: ['Breakfast aboard the sleeper train.', 'Arrival at Aswan station and visit to the Aswan High Dam.', 'Afternoon visit to the Nubian Village.', 'Cruise check-in and lunch on board.'] },
        { title: 'Abu Simbel and Kom Ombo', place: 'Aswan · Kom Ombo', stay: 'Nile cruise', details: ['Depart at 04:00 with a packed breakfast for Abu Simbel.', 'Return to Aswan after the temple visit.', 'Visit Kom Ombo Temple in the afternoon.'] },
        { title: 'Edfu by carriage', place: 'Edfu', stay: 'Nile cruise', details: ['Breakfast on board.', 'Travel by horse-drawn carriage to the Temple of Edfu.'] },
        { title: 'Luxor to the Red Sea', place: 'Luxor · Red Sea', stay: 'Red Sea', details: ['Breakfast and cruise check-out.', 'Karnak Temple, Luxor Temple, and the Valley of the Kings.', 'Lunch, then drive to the Red Sea.', 'Buffet dinner at the hotel.'] },
        { title: 'A day at sea', place: 'Red Sea', stay: 'Red Sea', details: ['Private yacht excursion on the Red Sea.'] },
        { title: 'Unhurried coast', place: 'Red Sea', stay: 'Red Sea', details: ['A full free day at the resort.'] },
        { title: 'Return and departure', place: 'Red Sea · Cairo', stay: 'Departure', details: ['Breakfast at the hotel.', 'Drive approximately 5 hours to Cairo, with lunch at a service stop.', 'Continue directly to the airport.'] },
      ],
      included: ['Visa on arrival', 'Admission to all listed sights', 'Private 16-seat vehicle throughout, including parking and road fees', 'Driver and guide gratuities', 'Domestic sleeper train', 'Three meals daily', 'Tourist police permits', 'Red Sea yacht excursion'],
      excluded: ['Optional activities such as a Luxor hot-air balloon or Red Sea diving', 'International flights'],
      payment: 'A 50% deposit is paid in advance. The remaining 50% is payable in cash on arrival.',
    },
    {
      id: 'desert',
      number: '03',
      title: 'Desert, Nile and Sea',
      daysLabel: '11 days',
      route: 'Cairo · White Desert · Aswan · Nile Cruise · Red Sea',
      image: '/images/white-desert-new.jpeg',
      imageAlt: 'White limestone formations in Egypt’s White Desert',
      introduction: 'The most expansive route: Cairo’s cultural landmarks, a night under the White Desert stars, the temples of the Nile, and a restorative Red Sea finale.',
      price: '$2,630 per guest',
      priceNote: 'Quoted for a group of twelve',
      group: '12 guests',
      days: [
        { title: 'Arrival and old Cairo', place: 'Cairo', stay: 'Cairo', details: ['Airport welcome and visa assistance.', 'Saladin Citadel and the Cave Church via Garbage City.', 'Lunch, the National Museum of Egyptian Civilization, and Khan el-Khalili.', 'Dinner is not included.'] },
        { title: 'Giza’s great monuments', place: 'Cairo', stay: 'Cairo', details: ['Breakfast at the hotel.', 'Giza Pyramids, lunch, and the Grand Egyptian Museum.', 'Dinner is not included.'] },
        { title: 'Into the White Desert', place: 'Bahariya · White Desert', stay: 'Desert camp', details: ['Breakfast and check-out, then travel to Bahariya Oasis for lunch.', 'Continue by 4x4 to Crystal Mountain and the panoramic Agabat Valley.', 'Sandboarding and the White Desert’s wind-carved formations, including the rabbit, mushroom, and chicken shapes.', 'Campfire dinner beneath the stars.', 'Choose desert camping, or upgrade to a stargazing hotel with dinner but no open fire.'] },
        { title: 'Sunrise, black desert, night train', place: 'White Desert · Cairo · Aswan', stay: 'Sleeper train', details: ['Climb a dune for sunrise, followed by breakfast in the desert.', 'Explore the Black Desert and its volcanic basalt landscape.', 'Return to the oasis for a natural hot spring and lunch.', 'Drive to Cairo, then board the sleeper train to Aswan; dinner is served on board.'] },
        { title: 'Aswan and Nubian culture', place: 'Aswan', stay: 'Nile cruise', details: ['Breakfast aboard the train.', 'Arrival in Aswan and visit to the Aswan High Dam.', 'Afternoon visit to the Nubian Village.', 'Cruise check-in and lunch on board.'] },
        { title: 'Abu Simbel and Kom Ombo', place: 'Aswan · Kom Ombo', stay: 'Nile cruise', details: ['Depart at 04:00 with a packed breakfast for Abu Simbel.', 'Return to Aswan after the temple visit.', 'Visit Kom Ombo Temple in the afternoon.'] },
        { title: 'Edfu by carriage', place: 'Edfu', stay: 'Nile cruise', details: ['Breakfast on board.', 'Travel by horse-drawn carriage to the Temple of Edfu.'] },
        { title: 'Luxor to the Red Sea', place: 'Luxor · Red Sea', stay: 'Red Sea', details: ['Breakfast and cruise check-out.', 'Karnak Temple, Luxor Temple, and the Valley of the Kings.', 'Lunch, then drive to the Red Sea.', 'Buffet dinner at the hotel.'] },
        { title: 'Coastal freedom', place: 'Red Sea', stay: 'Red Sea', details: ['A full free day at the resort.'] },
        { title: 'One more day by the sea', place: 'Red Sea', stay: 'Red Sea', details: ['A second full free day at the resort.'] },
        { title: 'Return and departure', place: 'Red Sea · Cairo', stay: 'Departure', details: ['Breakfast at the hotel.', 'Drive approximately 5 hours to Cairo, with lunch at a service stop.', 'Continue directly to the airport.', 'Dinner is not included.'] },
      ],
      included: ['Visa on arrival', 'Admission to all listed sights', 'Private transport throughout, including parking and road fees', 'Driver and guide gratuities', 'Domestic sleeper train', 'Two meals daily', 'Tourist police permits'],
      excluded: ['Optional activities such as a Luxor hot-air balloon, Red Sea diving, or boat trip', 'International flights', 'Daily dinner unless specifically stated'],
    },
  ],
};

const traditionalChinese: PageContent = {
  eyebrow: '精心策劃的埃及行程',
  title: '三段旅程。',
  titleAccent: '一個更深刻的埃及。',
  intro: '探索三種細緻安排的埃及旅行方式，在古老遺蹟、當代文化與從容停留之間取得平衡。',
  choose: '選擇旅程',
  routeLabel: '路線',
  guestsLabel: '人數',
  investmentLabel: '旅程費用',
  dayLabel: '第',
  stayLabel: '住宿',
  includedLabel: '費用包含',
  excludedLabel: '費用不含',
  paymentLabel: '付款方式',
  ctaEyebrow: '為你而設',
  ctaTitle: '讓這段行程成為你的旅程。',
  ctaCopy: '這些路線只是起點。我們可以按照你探索埃及的方式，調整節奏、住宿與體驗。',
  ctaButton: '開啟對話',
  journeys: [
    {
      id: 'classic', number: '01', title: '經典埃及巡禮', daysLabel: '8 天', route: '開羅 · 阿斯旺 · 路克索 · 紅海', image: '/images/abu-simbel.jpeg', imageAlt: '埃及南部壯麗的阿布辛貝神殿',
      introduction: '從開羅的偉大古蹟一路走向上埃及神殿，最後在紅海度過一段寧靜時光。', price: '總費用 3,675 美元', priceNote: '三位旅客之總價', group: '3 位旅客',
      days: [
        { title: '抵達與開羅古城', place: '開羅', stay: '開羅', details: ['搭乘 MS952 於 06:25 抵達開羅國際機場第三航廈。', '機場接待與落地簽證協助。', '參觀薩拉丁城堡、途經垃圾城前往洞穴教堂，以及埃及文明國家博物館。', '午餐後遊覽汗哈利利市場，再前往酒店休息。'] },
        { title: '吉薩經典地標', place: '開羅', stay: '開羅', details: ['酒店早餐。', '參觀吉薩金字塔與獅身人面像。', '午餐後參觀大埃及博物館。'] },
        { title: '南下阿斯旺', place: '阿斯旺', stay: '阿斯旺', details: ['早餐後搭乘國內航班由開羅前往阿斯旺，飛行約 1 小時 20 分鐘。', '參觀阿斯旺高壩與菲萊神殿。', '午餐與酒店入住。', '下午乘坐風帆船前往努比亞村。'] },
        { title: '阿布辛貝神殿', place: '阿斯旺', stay: '阿斯旺', details: ['早餐後驅車約 3 小時前往阿布辛貝。', '參觀神殿並於附近享用午餐。', '返回阿斯旺酒店。'] },
        { title: '東岸神殿', place: '路克索', stay: '路克索', details: ['早餐、退房後驅車約 3 小時前往路克索。', '抵達後享用午餐。', '參觀卡爾納克神殿與路克索神殿。', '前往路克索酒店休息。'] },
        { title: '西岸到紅海', place: '路克索 · 紅海', stay: '紅海', details: ['早餐、退房。', '參觀帝王谷、哈特謝普蘇特女王神殿與門農巨像。', '午餐後驅車約 3 小時前往紅海。', '入住酒店、休息並於酒店享用晚餐。'] },
        { title: '紅海假日', place: '紅海', stay: '紅海', details: ['在度假酒店全天自由活動。', '酒店提供早餐、午餐與晚餐。'] },
        { title: '返回開羅', place: '紅海 · 開羅', stay: '離境', details: ['12:00 退房並享用午餐。', '13:00 出發前往開羅國際機場第三航廈。', '車程約 5 小時。'] },
      ],
      included: ['落地簽證', '所有列明景點門票', '全程 16 座私人用車，包括停車費與過路費', '司機與導遊小費', '國內機票', '每日午餐'],
      excluded: ['酒店住宿費用', '除特別註明外的每日晚餐', '路克索熱氣球、紅海出海或潛水等自選活動', '國際機票'],
    },
    {
      id: 'nile', number: '02', title: '尼羅河至紅海', daysLabel: '9 天', route: '開羅 · 阿斯旺 · 尼羅河郵輪 · 路克索 · 紅海', image: '/images/dendera-ceiling.webp', imageAlt: '古埃及神殿中精緻的彩繪天花板',
      introduction: '將開羅地標、前往阿斯旺的臥鋪火車、尼羅河郵輪與紅海悠閒時光串聯成一段充實旅程。', price: '每位 2,725 美元', priceNote: '以十二人團體計價', group: '12 位旅客',
      days: [
        { title: '抵達與開羅文化', place: '開羅', stay: '開羅', details: ['機場接待、落地簽證協助並進入開羅。', '參觀薩拉丁城堡。', '午餐後參觀埃及文明國家博物館與汗哈利利市場。', '晚餐後在酒店休息。'] },
        { title: '吉薩與夜行火車', place: '開羅 · 阿斯旺', stay: '臥鋪火車', details: ['酒店早餐。', '參觀吉薩金字塔、享用午餐並參觀大埃及博物館。', '晚餐後搭乘臥鋪火車前往阿斯旺；火車上亦提供晚餐。'] },
        { title: '阿斯旺與努比亞文化', place: '阿斯旺', stay: '尼羅河郵輪', details: ['在臥鋪火車上享用早餐。', '抵達阿斯旺後參觀阿斯旺高壩。', '下午前往努比亞村。', '辦理郵輪入住並於船上享用午餐。'] },
        { title: '阿布辛貝與康翁波', place: '阿斯旺 · 康翁波', stay: '尼羅河郵輪', details: ['凌晨 04:00 攜帶早餐出發前往阿布辛貝神殿。', '參觀後返回阿斯旺。', '下午參觀康翁波神殿。'] },
        { title: '乘馬車前往埃德富', place: '埃德富', stay: '尼羅河郵輪', details: ['在郵輪上享用早餐。', '乘坐馬車前往埃德富神殿。'] },
        { title: '路克索到紅海', place: '路克索 · 紅海', stay: '紅海', details: ['早餐後辦理郵輪退房。', '參觀卡爾納克神殿、路克索神殿與帝王谷。', '午餐後驅車前往紅海。', '在酒店享用自助晚餐。'] },
        { title: '紅海出海', place: '紅海', stay: '紅海', details: ['乘坐遊艇探索紅海。'] },
        { title: '悠閒海岸', place: '紅海', stay: '紅海', details: ['在度假酒店全天自由活動。'] },
        { title: '返回與離境', place: '紅海 · 開羅', stay: '離境', details: ['酒店早餐。', '驅車約 5 小時返回開羅，途中於服務區享用午餐。', '直接前往機場。'] },
      ],
      included: ['落地簽證', '所有列明景點門票', '全程 16 座私人用車，包括停車費與過路費', '司機與導遊小費', '國內臥鋪火車', '每日三餐', '旅遊警察許可', '紅海遊艇出海活動'],
      excluded: ['路克索熱氣球或紅海潛水等自選活動', '國際機票'],
      payment: '預付 50% 訂金；餘款 50% 於抵達後以現金支付。',
    },
    {
      id: 'desert', number: '03', title: '沙漠、尼羅河與紅海', daysLabel: '11 天', route: '開羅 · 白色沙漠 · 阿斯旺 · 尼羅河郵輪 · 紅海', image: '/images/white-desert-new.jpeg', imageAlt: '埃及白色沙漠的白色石灰岩地貌',
      introduction: '最完整的路線：開羅文化地標、白色沙漠星空露營、尼羅河神殿與紅海療癒假期。', price: '每位 2,630 美元', priceNote: '以十二人團體計價', group: '12 位旅客',
      days: [
        { title: '抵達與開羅古城', place: '開羅', stay: '開羅', details: ['機場接待與落地簽證協助。', '參觀薩拉丁城堡，以及途經垃圾城前往洞穴教堂。', '午餐後參觀埃及文明國家博物館與汗哈利利市場。', '晚餐不包含。'] },
        { title: '吉薩宏偉古蹟', place: '開羅', stay: '開羅', details: ['酒店早餐。', '參觀吉薩金字塔、享用午餐並參觀大埃及博物館。', '晚餐不包含。'] },
        { title: '深入白色沙漠', place: '巴哈利亞 · 白色沙漠', stay: '沙漠帳篷', details: ['早餐、退房後前往巴哈利亞綠洲享用午餐。', '乘坐四輪驅動車遊覽水晶山與阿加巴特山谷全景。', '體驗滑沙，欣賞白色沙漠中兔子、蘑菇、雞等風蝕岩層。', '在滿天星空下享用篝火晚餐。', '可選沙漠露營，或加價入住星空酒店並享用無明火晚餐。'] },
        { title: '日出、黑沙漠與夜行火車', place: '白色沙漠 · 開羅 · 阿斯旺', stay: '臥鋪火車', details: ['登上沙丘欣賞日出，並於沙漠享用早餐。', '探索覆蓋黑色玄武岩與火山碎屑的黑沙漠。', '返回綠洲享受天然溫泉並享用午餐。', '驅車返回開羅後搭乘臥鋪火車前往阿斯旺；火車上提供晚餐。'] },
        { title: '阿斯旺與努比亞文化', place: '阿斯旺', stay: '尼羅河郵輪', details: ['在火車上享用早餐。', '抵達阿斯旺後參觀阿斯旺高壩。', '下午前往努比亞村。', '辦理郵輪入住並於船上享用午餐。'] },
        { title: '阿布辛貝與康翁波', place: '阿斯旺 · 康翁波', stay: '尼羅河郵輪', details: ['凌晨 04:00 攜帶早餐出發前往阿布辛貝神殿。', '參觀後返回阿斯旺。', '下午參觀康翁波神殿。'] },
        { title: '乘馬車前往埃德富', place: '埃德富', stay: '尼羅河郵輪', details: ['在郵輪上享用早餐。', '乘坐馬車前往埃德富神殿。'] },
        { title: '路克索到紅海', place: '路克索 · 紅海', stay: '紅海', details: ['早餐後辦理郵輪退房。', '參觀卡爾納克神殿、路克索神殿與帝王谷。', '午餐後驅車前往紅海。', '在酒店享用自助晚餐。'] },
        { title: '海岸自由時光', place: '紅海', stay: '紅海', details: ['在度假酒店全天自由活動。'] },
        { title: '再享一天紅海假日', place: '紅海', stay: '紅海', details: ['在度假酒店再度享受全天自由活動。'] },
        { title: '返回與離境', place: '紅海 · 開羅', stay: '離境', details: ['酒店早餐。', '驅車約 5 小時返回開羅，途中於服務區享用午餐。', '直接前往機場。', '晚餐不包含。'] },
      ],
      included: ['落地簽證', '所有列明景點門票', '全程私人交通，包括停車費與過路費', '司機與導遊小費', '國內臥鋪火車', '每日兩餐', '旅遊警察許可'],
      excluded: ['路克索熱氣球、紅海潛水或出海等自選活動', '國際機票', '除特別註明外的每日晚餐'],
    },
  ],
};

export default function ItineraryPage() {
  const { locale } = useLanguage();
  const content = locale === 'zh-TW' ? traditionalChinese : english;

  return (
    <main className="itinerary-page">
      <section className="itinerary-hero">
        <Image src="/images/the-pyramids.jpeg" alt="The Giza pyramids rising above the desert" fill priority sizes="100vw" className="itinerary-hero-image" />
        <div className="itinerary-hero-shade" />
        <div className="shell itinerary-hero-content">
          <p className="eyebrow light">{content.eyebrow}</p>
          <h1>{content.title}<span>{content.titleAccent}</span></h1>
          <p>{content.intro}</p>
        </div>
        <div className="itinerary-hero-index" aria-hidden="true">01 — 03</div>
      </section>

      <section className="itinerary-explorer">
        <Tabs defaultValue="classic" className="shell itinerary-tabs">
          <div className="itinerary-tabs-heading">
            <p className="eyebrow">{content.choose}</p>
            <span>01 — 03</span>
          </div>
          <TabsList className="itinerary-tab-list" aria-label={content.choose}>
            {content.journeys.map((journey) => (
              <TabsTrigger key={journey.id} value={journey.id} className="itinerary-tab-trigger">
                <span className="itinerary-tab-number">{journey.number}</span>
                <span><strong>{journey.title}</strong><small>{journey.daysLabel} · {journey.route}</small></span>
              </TabsTrigger>
            ))}
          </TabsList>

          {content.journeys.map((journey) => (
            <TabsContent key={journey.id} value={journey.id} className="itinerary-tab-content">
              <article>
                <header className="itinerary-overview">
                  <div className="itinerary-overview-image">
                    <Image src={journey.image} alt={journey.imageAlt} fill sizes="(max-width: 850px) 100vw, 46vw" />
                    <span>{journey.number}</span>
                  </div>
                  <div className="itinerary-overview-copy">
                    <p className="eyebrow">{journey.daysLabel}</p>
                    <h2>{journey.title}</h2>
                    <p className="itinerary-introduction">{journey.introduction}</p>
                    <dl className="itinerary-facts">
                      <div><dt><MapPin size={16} />{content.routeLabel}</dt><dd>{journey.route}</dd></div>
                      <div><dt><Users size={16} />{content.guestsLabel}</dt><dd>{journey.group}</dd></div>
                      <div><dt><Clock3 size={16} />{content.investmentLabel}</dt><dd>{journey.price}<small>{journey.priceNote}</small></dd></div>
                    </dl>
                  </div>
                </header>

                <div className="itinerary-detail-grid">
                  <div className="itinerary-timeline">
                    {journey.days.map((day, index) => (
                      <section className="itinerary-day" key={`${journey.id}-${index}`}>
                        <div className="itinerary-day-number"><span>{content.dayLabel}</span>{String(index + 1).padStart(2, '0')}</div>
                        <div className="itinerary-day-copy">
                          <p className="itinerary-place"><MapPin size={14} />{day.place}</p>
                          <h3>{day.title}</h3>
                          <ul>{day.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                        </div>
                        <p className="itinerary-stay"><BedDouble size={15} /><span>{content.stayLabel}</span><strong>{day.stay}</strong></p>
                      </section>
                    ))}
                  </div>

                  <aside className="itinerary-terms">
                    <div>
                      <p className="itinerary-terms-title">{content.includedLabel}</p>
                      <ul>{journey.included.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
                    </div>
                    <div>
                      <p className="itinerary-terms-title">{content.excludedLabel}</p>
                      <ul>{journey.excluded.map((item) => <li key={item}><X size={15} />{item}</li>)}</ul>
                    </div>
                    {journey.payment && <div className="itinerary-payment"><p>{content.paymentLabel}</p><span>{journey.payment}</span></div>}
                  </aside>
                </div>
              </article>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="itinerary-cta">
        <div className="shell">
          <p className="eyebrow light">{content.ctaEyebrow}</p>
          <h2>{content.ctaTitle}</h2>
          <p>{content.ctaCopy}</p>
          <Link href="/contact" className="button gold">{content.ctaButton}</Link>
        </div>
      </section>
    </main>
  );
}
