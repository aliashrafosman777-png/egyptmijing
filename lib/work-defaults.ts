import type { WorkPlace } from '@/lib/managed-content-types';

export const defaultWorkPlaces: WorkPlace[] = [
  {
    id: 'abu-simbel',
    title: { en: 'Abu Simbel', zhTW: '阿布辛貝' },
    kicker: { en: 'Temple · Ramesses II · Aswan', zhTW: '神廟 · 拉美西斯二世 · 亞斯文' },
    description: {
      en: 'Abu Simbel, on the banks of the Nile near Aswan in southern Egypt, is a colossal rock-cut temple commissioned by Pharaoh Ramesses II in the 13th century BCE. Four towering statues of Ramesses II, each standing 20 metres tall, guard the temple façade in majestic grandeur. Due to the construction of the Aswan High Dam, the entire temple was relocated to its present site in the 1960s to save it from submersion — a landmark achievement in international heritage conservation.',
      zhTW: '阿布辛貝神廟位於埃及南部亞斯文附近的尼羅河畔，是古埃及法老拉美西斯二世於公元前13世紀下令興建的巨型岩窟神廟。神廟正面矗立著四尊高達20公尺的拉美西斯二世巨像，氣勢雄偉。由於興建亞斯文水壩，神廟在1960年代被完整遷移到現址，以避免被水淹沒，成為國際文物保護的著名案例。',
    },
    image: '/images/abu-simbel.jpeg',
    imageAlt: { en: 'The monumental temples of Abu Simbel', zhTW: '壯麗的阿布辛貝神殿' },
    isPublished: true,
  },
  {
    id: 'white-desert',
    title: { en: 'Sculpted by Silence', zhTW: '由寂靜雕琢' },
    kicker: { en: 'White Desert · Camp · Stars', zhTW: '白色沙漠 · 營地 · 星空' },
    description: {
      en: 'The White Desert, located in Egypt’s Western Desert near Farafra Oasis, is a renowned national reserve. Wind and erosion have sculpted surreal white limestone formations resembling mushrooms, camels, and other fantastical shapes, creating a dreamlike landscape. At night, a canopy of stars reflects off the pristine white sands, making it a beloved destination for desert camping and stargazing.',
      zhTW: '白沙漠位於埃及西部沙漠，靠近法拉夫拉綠洲，是一座著名的國家保護區。這裡因風化與侵蝕作用形成了許多奇特的白色石灰岩地形，外形猶如蘑菇、駱駝等各種奇異造型，景色如夢似幻。夜晚時分，滿天繁星映照著潔白沙地，是熱門的沙漠露營與觀星勝地。',
    },
    image: '/images/white-desert-new.jpeg',
    imageAlt: { en: 'White limestone formations in the White Desert', zhTW: '白色沙漠的石灰岩地貌' },
    isPublished: true,
  },
  {
    id: 'pyramids',
    title: { en: 'The Pyramids', zhTW: '埃及金字塔' },
    kicker: { en: 'Giza · Ancient Wonder · Cairo', zhTW: '吉薩 · 古代奇蹟 · 開羅' },
    description: {
      en: 'The Egyptian Pyramids, standing on the Giza Plateau near Cairo, are colossal tomb structures built by the pharaohs of ancient Egypt. The most famous, the Great Pyramid of Khufu, was constructed around 2560 BCE and is the only surviving wonder of the ancient world. Built from millions of massive stone blocks, the pyramids showcase the extraordinary architectural mastery and ingenuity of ancient Egypt, and remain one of the world’s most important cultural heritage sites.',
      zhTW: '埃及金字塔位於開羅近郊的吉薩高原，是古埃及法老為安葬自己而建造的巨型陵墓建築。其中最著名的是胡夫金字塔，建於約公元前2560年，是古代世界七大奇蹟中唯一保存至今的建築。金字塔由數百萬塊巨石堆疊而成，展現了古埃及高超的建築技術與智慧，至今仍是世界重要的歷史文化遺產。',
    },
    image: '/images/the-pyramids.jpeg',
    imageAlt: { en: 'The Pyramids of Giza', zhTW: '吉薩金字塔' },
    isPublished: true,
  },
];
