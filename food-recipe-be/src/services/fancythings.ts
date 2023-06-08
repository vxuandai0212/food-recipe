export const CATEGORY = {
  PROGRAM: {
    VALUE: 1,
    SUB_CATEGORY: {
      WEBSITE: 4,
      MOBILE: 5,
      DESKTOP: 6
    }
  },
  DESIGN: {
    VALUE: 2,
    SUB_CATEGORY: {
      GAME: 7,
      LOGO: 8,
      BANNER: 9
    }
  },
  LANGUAGE: {
    VALUE: 3,
    SUB_CATEGORY: {
      LAOS: 10,
      ESPAGNOL: 11,
      RUSSIA: 12,
      ENGLISH: 13
    }
  }
}

const ALL_POST = [
  {
    id: 1,
    title: 'Sử dụng bộ nhớ cache để lưu dữ liệu tạm thời - In-MemoryCache',
    categoryId: CATEGORY.PROGRAM.VALUE,
    subCategoryId: CATEGORY.PROGRAM.SUB_CATEGORY.WEBSITE,
    thubnailUrl: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2825&q=80'
  },
  {
    id: 2,
    title: 'Giới thiệu về công cụ Push Notifications OneSignal',
    categoryId: CATEGORY.PROGRAM.VALUE,
    subCategoryId: CATEGORY.PROGRAM.SUB_CATEGORY.MOBILE,
    thubnailUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2106&q=80'
  },
  {
    id: 3,
    title: 'Sử dụng Mixin trong SASS',
    categoryId: CATEGORY.PROGRAM.VALUE,
    subCategoryId: CATEGORY.PROGRAM.SUB_CATEGORY.WEBSITE,
    thubnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2831&q=80'
  },
  {
    id: 4,
    title: 'Tạo một div lấp đầy chiều cao của không gian màn hình còn lại',
    categoryId: CATEGORY.PROGRAM.VALUE,
    subCategoryId: CATEGORY.PROGRAM.SUB_CATEGORY.WEBSITE,
    thubnailUrl: 'https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 5,
    title: 'Một số trò chơi vui nhộn giúp bạn học và thực hành CSS',
    categoryId: CATEGORY.PROGRAM.VALUE,
    subCategoryId: CATEGORY.PROGRAM.SUB_CATEGORY.WEBSITE,
    thubnailUrl: 'https://images.unsplash.com/photo-1545296664-39db56ad95bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1701&q=80'
  },
  {
    id: 6,
    title: 'Computerist-inspired Illustrations',
    categoryId: CATEGORY.DESIGN.VALUE,
    subCategoryId: CATEGORY.DESIGN.SUB_CATEGORY.BANNER,
    thubnailUrl: 'https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/33da1285109557.5ea4b16ce7577.png.webp?itok=VuyDeO5N'
  },
  {
    id: 7,
    title: 'A Sweet Escape - CGI Campaign for Chupa Chups',
    categoryId: CATEGORY.DESIGN.VALUE,
    subCategoryId: CATEGORY.DESIGN.SUB_CATEGORY.GAME,
    thubnailUrl: 'https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/7d9ff899870005.5efc561f5a75a.jpg.webp?itok=nRUNoj8N'
  },
  {
    id: 8,
    title: 'Greedy Farmers Branding and Visual Identity',
    categoryId: CATEGORY.DESIGN.VALUE,
    subCategoryId: CATEGORY.DESIGN.SUB_CATEGORY.LOGO,
    thubnailUrl: 'https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_greedy_farmer.jpg.webp?itok=GCPlRR-Y'
  },
  {
    id: 9,
    title: '10 bài hát hay nhất nước Nga',
    categoryId: CATEGORY.LANGUAGE.VALUE,
    subCategoryId: CATEGORY.LANGUAGE.SUB_CATEGORY.RUSSIA,
    thubnailUrl: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 10,
    title: 'Nói về tên của bạn',
    categoryId: CATEGORY.LANGUAGE.VALUE,
    subCategoryId: CATEGORY.LANGUAGE.SUB_CATEGORY.ENGLISH,
    thubnailUrl: 'https://images.unsplash.com/photo-1543832923-44667a44c804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1644&q=80'
  }
]

const PROGRAM_POST = {
  title: 'Kubernetes Patterns - Behavioral Patterns: Service Discovery',
  createdAt: '11-05-2022 16:00:00',
  contents: [
    { type: 'image', data: 'https://images.unsplash.com/photo-1549314662-c81dcbec48a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80' },
    { type: 'heading', data: 'Giới thiệu' },
    {
      type: 'paragraph',
      data: 'I really like these 2D grain effects applied to 3D elements. It kind of has this cool feeling of cray and rocks and I decided to try and reproduce it from scratch. I started with a custom light shader, then mixed it with a grain effect and by playing with some values I got to this final result:'
    },
    { type: 'image', data: 'https://images.unsplash.com/photo-1519526933243-dd9747bfaae5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80' },
    { type: 'heading', data: 'Demo' },
    {
      type: 'paragraph',
      data: 'Recently, I release my brand new portfolio, home to my projects that I have worked on in the past couple of years:'
    },
    { type: 'heading', data: 'Cài đặt' },
    { type: 'video', data: 'https://www.youtube.com/watch?v=G_fVwdpLKZ4&list=RDG_fVwdpLKZ4&start_radio=1' },
    {
      type: 'paragraph',
      data: 'Recently, I release my brand new portfolio, home to my projects that I have worked on in the past couple of years:'
    },
    {
      type: 'code',
      data: 'colorNoise *= light_value.r;'
    },
    { type: 'heading', data: 'Tham khảo' },
    {
      type: 'order-list',
      data: [
        'https://webglfundamentals.org/',
        'https://google.com'
      ]
    }
  ],
  toc: [
    'Giới thiệu',
    'Demo',
    'Cài đặt',
    'Tham khảo'
  ],
  relatedArticles: ALL_POST.slice(5)
}

const LANGUAGE_POST = {
  title: 'Speaking task 1 - Topic name',
  createdAt: '11-05-2022 16:00:00',
  contents: [
    { type: 'heading', data: 'Dàn ý' },
    {
      type: 'order-list',
      data: [
        'Who gave you your name?',
        'Does your name have any particular (or special) meaning?',
        'Do you like your name?',
        'In your country, do people feel that their name is very important?',
        'Would you like to change your name?',
        'Is it easy to change your name in your country?',
        'Who usually names babies in your country?',
        'Do you have any special traditions about naming children?',
        'What names are most common in your hometown?'
      ]
    },
    { type: 'heading', data: 'Bài mẫu' },
    {
      type: 'paragraph',
      // eslint-disable-next-line no-multi-str
      data: 'My parents gave me my name, my father to be exact. \
        Zhi means knowledge, and Lei means accumulation. So I guess my parents \
        wanted to tell me that being knowledgeable depends on accumulation. You see \
        they put a lot of pressure on my shoulders with this name.\
        \
        I quite like my name, and I won\'t change it for the world, because it is unique. I \
        don\'t think that anyone else in China has the same name. It\'s part of my identity, \
        and it is meaningful to me.\
        \
        People in my country pay great attention to their names because they believe \
        that suitable names will bring them good fortune. Sometimes they even change \
        their names for their business and family purpose.\
        \
        In China, I believe that fathers are in the position of naming their children. \
        Sometimes they will look through some Chinese classical literatures to seek the \
        meaningful words for their children.\
        \
        Oh, there are some nicknames that are very popular in China. For example, Lili \
        means that their parents hope their daughters would be beautiful; and Kuan \
        kuan, indicates that their sons would be magnanimous when they are grown up.'
    },
    { type: 'heading', data: 'Từ vựng' },
    {
      type: 'order-list',
      data: [
        'magnanimous /mæg\'næniməs/ (adjective): hào hiệp, cao thượng.',
        'accumulation /ə,kju:mju\'lei∫n/ (n): sự chất đống, sự chồng chất, sự tích luỹ, sự tích lại, sự tích tụ, sự góp nhặt.'
      ]
    },
    { type: 'heading', data: 'Ngữ pháp' },
    {
      type: 'order-list',
      data: [
        // eslint-disable-next-line no-multi-str
        'depend on + sb/sth: dựa vào, tùy thuộc vào ai/điều gì. \
        Ví dụ:\
        - Do you want to go out with him? \
        - I think it depends on the weather.\
        2. look through: đọc lướt qua.\
        Ví dụ:\
        Her plan has many creative ideas and it is presented clearly. Have you looked through it?'
      ]
    }
  ],
  toc: [
    'Dàn ý',
    'Bài mẫu',
    'Từ vựng',
    'Ngữ pháp'
  ],
  relatedArticles: ALL_POST.slice(5)
}

const get = async (req: any) => {
  return LANGUAGE_POST
}

const getAll = async (req: any) => {
  return ALL_POST
}

const service = {
  get,
  getAll
}

export default service
