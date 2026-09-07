export type ApplicationStatus = 'accepted' | 'instant' | 'pending';

export interface Brand {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
}

export interface Collaboration {
  id: string;
  title: string;
  description: string;
  categoryKey: 'restaurants' | 'salons' | 'events' | 'brands' | 'clubs' | 'other';
  categoryLabel: string;
  formatKey: 'barter' | 'paid' | 'ugc';
  formatLabel: string;
  formatTone: 'green' | 'blue';
  audienceTag?: string;
  date: string;
  when: 'today' | 'week' | 'later';
  location: string;
  audienceMin: number;
  spotsLeft: number | null;
  applicants: number;
  invited?: boolean;
  hero: string; // image slot id
  thumb: string; // image slot id (square thumb, usually same photo)
  whatNeeded: string;
  whatYouGet: string;
  rewardShort?: string;
  brandId: string;
  createdByMe?: boolean;
}

export const brands: Brand[] = [
  {
    id: 'nian',
    name: 'Nian',
    logo: 'cc-detail-brand',
    category: 'Паназиатский ресторан · Москва',
    description: 'Новый паназиатский ресторан в центре Москвы. Ищем lifestyle- и food-креаторов для контента с открытия.',
  },
  {
    id: 'glow-salon',
    name: 'Glow Studio',
    logo: 'cc-cat-5',
    category: 'Бьюти-салон · Москва',
    description: 'Салон полного цикла на Патриарших. Бартер на уходовые и бьюти-процедуры для честных обзоров.',
  },
  {
    id: 'local-heroes',
    name: 'Local Heroes',
    logo: 'cc-cat-4',
    category: 'Fashion pop-up · Москва',
    description: 'Капсульные коллекции независимых дизайнеров. Три дня pop-up на Даниловском рынке.',
  },
];

export const collaborations: Collaboration[] = [
  {
    id: 'nian-opening',
    title: 'Открытие ресторана «Nian»',
    description: 'Дегустация и съёмка нового паназиатского ресторана.',
    categoryKey: 'restaurants',
    categoryLabel: 'Рестораны',
    formatKey: 'barter',
    formatLabel: 'Бартер',
    formatTone: 'green',
    date: '20 мая · 19:00',
    when: 'week',
    location: 'Тверская, 12',
    audienceMin: 3000,
    spotsLeft: 3,
    applicants: 12,
    invited: true,
    hero: 'cc-detail-hero',
    thumb: 'cc-feed-1',
    whatNeeded: '1 Reels + 3 Stories',
    whatYouGet: 'Ужин и приглашение на закрытое открытие',
    rewardShort: 'Ужин за 1 Reels + 3 Stories',
    brandId: 'nian',
  },
  {
    id: 'beauty-day',
    title: 'Бьюти-день: бартер на уход',
    description: 'Ищем бьюти-креаторов для съёмки и честного обзора процедур.',
    categoryKey: 'salons',
    categoryLabel: 'Салоны',
    formatKey: 'barter',
    formatLabel: 'Бартер',
    formatTone: 'green',
    date: '22 мая · 11:00',
    when: 'week',
    location: 'Патриаршие пруды',
    audienceMin: 1000,
    spotsLeft: 5,
    applicants: 8,
    hero: 'cc-feed-2',
    thumb: 'cc-feed-2',
    whatNeeded: 'Обзор + 2 Stories',
    whatYouGet: 'Процедура на выбор',
    rewardShort: 'Процедура за обзор и 2 Stories',
    brandId: 'glow-salon',
  },
  {
    id: 'fashion-popup',
    title: 'Fashion Pop-Up x Local Heroes',
    description: 'Контент-съёмка и обзор новой капсульной коллекции.',
    categoryKey: 'events',
    categoryLabel: 'Мероприятия',
    formatKey: 'barter',
    formatLabel: 'Бартер',
    formatTone: 'blue',
    audienceTag: 'Микроблогерам',
    date: '24–26 мая',
    when: 'later',
    location: 'Даниловский рынок',
    audienceMin: 500,
    spotsLeft: 2,
    applicants: 21,
    hero: 'cc-feed-3',
    thumb: 'cc-feed-3',
    whatNeeded: 'Контент-съёмка и обзор коллекции',
    whatYouGet: 'Капсула из коллекции на выбор',
    rewardShort: 'Контент-съёмка и обзор коллекции',
    brandId: 'local-heroes',
  },
  {
    id: 'terrace-launch',
    title: 'Летняя терраса «Облака»',
    description: 'Съёмка панорамного вида и сет-меню шефа для открытия сезона.',
    categoryKey: 'restaurants',
    categoryLabel: 'Рестораны',
    formatKey: 'paid',
    formatLabel: 'Оплата',
    formatTone: 'blue',
    date: '28 мая · 20:00',
    when: 'week',
    location: 'Кутузовский, 5',
    audienceMin: 5000,
    spotsLeft: 4,
    applicants: 6,
    hero: 'picsum:terrace-launch',
    thumb: 'picsum:terrace-launch',
    whatNeeded: '2 Reels',
    whatYouGet: 'Гонорар + ужин на двоих',
    brandId: 'nian',
  },
  {
    id: 'wellness-club',
    title: 'Wellness Club: день открытых дверей',
    description: 'Йога, сауна и бьюти-бар — контент с открытия нового пространства.',
    categoryKey: 'clubs',
    categoryLabel: 'Клубы',
    formatKey: 'barter',
    formatLabel: 'Бартер',
    formatTone: 'green',
    date: '1 июня · 10:00',
    when: 'later',
    location: 'Ходынский бульвар, 4',
    audienceMin: 2000,
    spotsLeft: 6,
    applicants: 4,
    hero: 'picsum:wellness-club',
    thumb: 'picsum:wellness-club',
    whatNeeded: '1 Reels + 4 Stories',
    whatYouGet: 'Месяц безлимитного посещения',
    brandId: 'glow-salon',
  },
  {
    id: 'ugc-capsule',
    title: 'UGC-съёмка для капсулы Local Heroes',
    description: 'Съёмка предметки и лукбука для запуска онлайн-продаж.',
    categoryKey: 'brands',
    categoryLabel: 'Бренды',
    formatKey: 'ugc',
    formatLabel: 'UGC',
    formatTone: 'blue',
    date: 'Сегодня · 15:00',
    when: 'today',
    location: 'Студия на Патриарших',
    audienceMin: 1000,
    spotsLeft: 1,
    applicants: 15,
    hero: 'picsum:ugc-capsule',
    thumb: 'picsum:ugc-capsule',
    whatNeeded: '6 UGC-видео',
    whatYouGet: 'Гонорар за видео',
    brandId: 'local-heroes',
  },
];

export const initialApplications: Record<string, ApplicationStatus> = {
  'nian-opening': 'accepted',
  'beauty-day': 'instant',
  'fashion-popup': 'pending',
};

export interface Social {
  id: string;
  label: string;
  handle: string;
  followers: string;
}

export interface CreatorProfile {
  name: string;
  city: string;
  avatar: string;
  bio: string;
  role: string;
  topics: string[];
  selectedTopics: string[];
  formats: string[];
  selectedFormats: string[];
  socials: Social[];
  phone: string;
  email: string;
  stats: { followers: string; reach: string; er: string; avgLikes: string };
  photos: string[];
}

export const allTopics = ['Lifestyle', 'Beauty', 'Food', 'Travel', 'Fashion', 'Wellness', 'Уют', 'Спорт'];
export const allFormats = ['Бартер', 'Мероприятия', 'Оплата', 'UGC'];

export const defaultCreatorProfile: CreatorProfile = {
  name: 'Елена Иванова',
  city: 'Москва, Россия',
  avatar: 'cc-prof-avatar',
  bio: 'Создаю эстетический контент о жизни, путешествиях и стиле. Вдохновляю на красивую и осознанную жизнь.',
  role: 'lifestyle creator',
  topics: allTopics,
  selectedTopics: ['Lifestyle', 'Beauty', 'Food'],
  formats: allFormats,
  selectedFormats: ['Бартер', 'Мероприятия', 'UGC'],
  socials: [
    { id: 'instagram', label: 'Instagram', handle: '@elena.life', followers: '28.7K' },
    { id: 'tiktok', label: 'TikTok', handle: '@elena.life', followers: '64.1K' },
    { id: 'telegram', label: 'Telegram', handle: '@elena_life', followers: '3.2K' },
  ],
  phone: '+7 999 123-45-67',
  email: 'hello@elenalife.com',
  stats: { followers: '28.7K', reach: '142K', er: '5.6%', avgLikes: '4.3K' },
  photos: ['cc-prof-p1', 'cc-prof-p2', 'cc-prof-p3'],
};

export interface BrandProfile {
  name: string;
  avatar: string;
  category: string;
  description: string;
}

export const defaultBrandProfile: BrandProfile = {
  name: '',
  avatar: 'cc-role-brand',
  category: 'Рестораны',
  description: '',
};

export interface Notification {
  id: string;
  text: string;
  time: string;
  status?: 'accepted' | 'pending';
  read: boolean;
  collabId?: string;
  goTo?: 'profile';
  section: 'today' | 'earlier';
  icon?: 'stats';
}

export const creatorNotifications: Notification[] = [
  {
    id: 'cn1',
    text: 'Nian принял вашу заявку. Ждём вас 20 мая в 19:00.',
    time: '2 ч назад',
    status: 'accepted',
    read: false,
    collabId: 'nian-opening',
    section: 'today',
  },
  {
    id: 'cn2',
    text: 'Новая коллаборация в категории «Салоны» рядом с вами.',
    time: '5 ч назад',
    read: false,
    collabId: 'beauty-day',
    section: 'today',
  },
  {
    id: 'cn3',
    text: 'Fashion Pop-Up x Local Heroes: заявка на рассмотрении.',
    time: 'Вчера',
    status: 'pending',
    read: true,
    collabId: 'fashion-popup',
    section: 'earlier',
  },
  {
    id: 'cn4',
    text: 'Профиль заполнен на 80%. Добавьте статистику блога.',
    time: '3 дня назад',
    read: true,
    goTo: 'profile',
    section: 'earlier',
    icon: 'stats',
  },
];

export const brandNotifications: Notification[] = [
  {
    id: 'bn1',
    text: 'Елена Иванова откликнулась на «Открытие ресторана Nian». Посмотрите профиль креатора.',
    time: '2 ч назад',
    read: false,
    collabId: 'nian-opening',
    section: 'today',
  },
  {
    id: 'bn2',
    text: 'Новая заявка на «Бьюти-день: бартер на уход» — рассмотрите отклик.',
    time: '5 ч назад',
    status: 'pending',
    read: false,
    collabId: 'beauty-day',
    section: 'today',
  },
  {
    id: 'bn3',
    text: '«Fashion Pop-Up x Local Heroes» уже набрала 21 отклик от креаторов.',
    time: 'Вчера',
    read: true,
    collabId: 'fashion-popup',
    section: 'earlier',
  },
  {
    id: 'bn4',
    text: 'Профиль бренда заполнен на 60%. Добавьте описание и логотип, чтобы получать больше откликов.',
    time: '3 дня назад',
    read: true,
    goTo: 'profile',
    section: 'earlier',
    icon: 'stats',
  },
];

export const categoryTiles: { key: Collaboration['categoryKey']; label: string; image: string }[] = [
  { key: 'brands', label: 'Бренды', image: 'cc-cat-1' },
  { key: 'restaurants', label: 'Рестораны', image: 'cc-cat-2' },
  { key: 'clubs', label: 'Клубы', image: 'cc-cat-3' },
  { key: 'events', label: 'Мероприятия', image: 'cc-cat-4' },
  { key: 'salons', label: 'Салоны', image: 'cc-cat-5' },
  { key: 'other', label: 'Другое', image: 'cc-cat-6' },
];
