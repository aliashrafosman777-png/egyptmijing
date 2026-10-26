import type { SiteImages } from '@/lib/managed-content-types';

export const defaultSiteImages: SiteImages = {
  homeHero: {
    id: 'home-hero',
    image: '/images/siwa-palms.webp',
    imageAlt: {
      en: 'Siwa Oasis at sunset, with palm groves below the desert plateau',
      zhTW: '夕陽下的錫瓦綠洲，棕櫚林延伸至沙漠高原',
    },
  },
  homeJourneys: [
    {
      id: 'siwa-oasis',
      image: '/images/siwa-palms.webp',
      imageAlt: { en: 'Siwa Oasis palm groves and desert plateau', zhTW: '錫瓦綠洲的棕櫚林與沙漠高原' },
    },
    {
      id: 'white-desert',
      image: '/images/white-desert.webp',
      imageAlt: { en: 'Wind-carved formations in Egypt’s White Desert', zhTW: '埃及白色沙漠中由風雕刻而成的地貌' },
    },
    {
      id: 'dendera',
      image: '/images/dendera-ceiling.webp',
      imageAlt: { en: 'Painted ceiling within the Temple of Hathor at Dendera', zhTW: '丹德拉哈索爾神廟內的彩繪天花板' },
    },
  ],
  aboutGuides: [
    {
      id: 'emad',
      image: '/images/emad-monochrome.png',
      imageAlt: { en: 'Portrait of Emad, cultural guide', zhTW: '文化導遊埃馬德的肖像' },
    },
    {
      id: 'hashim',
      image: '/images/hashim-monochrome.png',
      imageAlt: { en: 'Portrait of Hashim, cultural guide', zhTW: '文化導遊高明的肖像' },
    },
    {
      id: 'li-jian',
      image: '/images/li-jian-profile.jpeg',
      imageAlt: { en: 'Portrait of Li Jian, senior Chinese-speaking guide', zhTW: '資深中文導遊李健的肖像' },
    },
  ],
};
