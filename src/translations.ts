export type Language = 'ru' | 'en' | 'ky';

export const translations = {
  ru: {
    nav: {
      about: "О нас",
      services: "Услуги",
      stylist: "Стилист",
      gallery: "Галерея",
      contact: "Контакты",
      book: "Записаться"
    },
    hero: {
      title: "Искусство классического бритья",
      subtitle: "Neva Heritage — это не просто барбершоп. Это место, где традиции встречаются с современным стилем, создавая неповторимый образ каждого мужчины.",
      cta: "Записаться по телефону"
    },
    about: {
      title: "Наследие и Стиль",
      subtitle: "Больше чем просто стрижка",
      p1: "Мы верим, что визит к барберу — это ритуал. В Neva Heritage мы возрождаем классические традиции мужского ухода, уделяя внимание каждой детали.",
      p2: "Наши мастера — это художники своего дела, которые сочетают проверенные временем техники с современными трендами.",
      stat1: "Мастеров",
      stat2: "Клиентов",
      stat3: "Лет опыта"
    },
    services: {
      title: "Наши Услуги",
      subtitle: "Премиальный уход для настоящих джентльменов",
      duration: "мин",
      list: [
        {
          name: "Классическая стрижка",
          price: "2500 ₽",
          description: "Индивидуальный подход, мытье головы, укладка и консультация по стилю.",
          duration: "60"
        },
        {
          name: "Моделирование бороды",
          price: "1800 ₽",
          description: "Придание формы, четкие контуры опасной бритвой и уход с использованием премиальных масел.",
          duration: "45"
        },
        {
          name: "Королевское бритье",
          price: "3000 ₽",
          description: "Традиционное бритье опасной бритвой с распариванием горячим полотенцем.",
          duration: "60"
        },
        {
          name: "Отец и сын",
          price: "4000 ₽",
          description: "Стрижка для двоих. Традиции, передающиеся из поколения в поколение.",
          duration: "120"
        }
      ]
    },
    contact: {
      title: "Контакты",
      subtitle: "Ждем вас в гости",
      address: "Адрес",
      addressValue: "Невский пр., 15, Санкт-Петербург",
      phone: "Телефон",
      hours: "Часы работы",
      hoursValue: "Ежедневно: 10:00 — 22:00",
      formTitle: "Связаться с нами",
      name: "Ваше имя",
      phoneLabel: "Телефон",
      service: "Услуга",
      message: "Сообщение",
      send: "Отправить заявку",
      successTitle: "Успешно!",
      successMsg: "Мы свяжемся с вами в ближайшее время."
    },
    gallery: {
      title: "Галерея работ",
      subtitle: "Атмосфера",
      description: "Взгляните на наше пространство и примеры работ наших мастеров. Мы создаем стиль, который подчеркивает вашу индивидуальность."
    },
    testimonials: {
      quote: "Лучший барбершоп в Петербурге. Атмосфера, сервис и мастерство на высшем уровне. Хожу сюда уже три года и ни разу не разочаровался.",
      author: "Александр Волков",
      role: "Постоянный клиент"
    },
    footer: {
      rights: "Все права защищены.",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования"
    },
    styleExplorer: {
      title: "Виртуальный Стилист",
      subtitle: "Примерьте новый образ",
      description: "Выберите один из наших классических стилей, чтобы увидеть, как он преображает образ. Наш ИИ-стилист продемонстрирует результат.",
      processing: "Стилизация...",
      styles: {
        fade: "Фейд",
        pompadour: "Помпадур",
        buzz: "Бокс",
        long: "Длинные волосы",
        beard: "Борода"
      },
      camera: {
        use: "Использовать камеру",
        take: "Сделать фото",
        retake: "Переснять",
        error: "Ошибка доступа к камере",
        stop: "Выключить камеру"
      }
    },
    chatbot: {
      title: "Neva Heritage Ассистент",
      status: "В сети",
      placeholder: "Ваш вопрос...",
      welcome: "Здравствуйте! Я ваш персональный ассистент Neva Heritage. Как я могу вам помочь сегодня?"
    }
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      stylist: "Stylist",
      gallery: "Gallery",
      contact: "Contact",
      book: "Book Now"
    },
    hero: {
      title: "The Art of Classic Shaving",
      subtitle: "Neva Heritage is not just a barbershop. It's a place where traditions meet modern style, creating a unique look for every man.",
      cta: "Book by Phone"
    },
    about: {
      title: "Heritage and Style",
      subtitle: "More than just a haircut",
      p1: "We believe that a visit to the barber is a ritual. At Neva Heritage, we revive classic traditions of men's grooming, paying attention to every detail.",
      p2: "Our masters are artists of their craft, combining time-tested techniques with modern trends.",
      stat1: "Masters",
      stat2: "Clients",
      stat3: "Years Exp"
    },
    services: {
      title: "Our Services",
      subtitle: "Premium care for true gentlemen",
      duration: "min",
      list: [
        {
          name: "Classic Haircut",
          price: "2500 ₽",
          description: "Individual approach, hair wash, styling, and style consultation.",
          duration: "60"
        },
        {
          name: "Beard Grooming",
          price: "1800 ₽",
          description: "Shaping, sharp contours with a straight razor, and care with premium oils.",
          duration: "45"
        },
        {
          name: "Royal Shave",
          price: "3000 ₽",
          description: "Traditional straight razor shave with hot towel steaming.",
          duration: "60"
        },
        {
          name: "Father and Son",
          price: "4000 ₽",
          description: "Haircut for two. Traditions passed down through generations.",
          duration: "120"
        }
      ]
    },
    contact: {
      title: "Contact",
      subtitle: "We are waiting for you",
      address: "Address",
      addressValue: "Nevsky Ave, 15, Saint Petersburg",
      phone: "Phone",
      hours: "Working Hours",
      hoursValue: "Daily: 10:00 — 22:00",
      formTitle: "Get in Touch",
      name: "Your Name",
      phoneLabel: "Phone",
      service: "Service",
      message: "Message",
      send: "Send Request",
      successTitle: "Success!",
      successMsg: "We will contact you shortly."
    },
    gallery: {
      title: "Gallery of Works",
      subtitle: "Atmosphere",
      description: "Take a look at our space and examples of our masters' work. We create a style that emphasizes your individuality."
    },
    testimonials: {
      quote: "The best barbershop in St. Petersburg. The atmosphere, service, and craftsmanship are at the highest level. I've been coming here for three years and have never been disappointed.",
      author: "Alexander Volkov",
      role: "Regular Customer"
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    styleExplorer: {
      title: "Virtual Stylist",
      subtitle: "Try a new look",
      description: "Select one of our classic styles to see how it transforms the look. Our AI stylist will demonstrate the result.",
      processing: "Styling...",
      styles: {
        fade: "Fade",
        pompadour: "Pompadour",
        buzz: "Buzz Cut",
        long: "Long Hair",
        beard: "Beard"
      },
      camera: {
        use: "Use Camera",
        take: "Take Photo",
        retake: "Retake",
        error: "Camera access error",
        stop: "Stop Camera"
      }
    },
    chatbot: {
      title: "Neva Heritage Assistant",
      status: "Online",
      placeholder: "Your question...",
      welcome: "Hello! I am your personal Neva Heritage assistant. How can I help you today?"
    }
  },
  ky: {
    nav: {
      about: "Биз жөнүндө",
      services: "Кызматтар",
      stylist: "Стилист",
      gallery: "Галерея",
      contact: "Байланыш",
      book: "Жазылуу"
    },
    hero: {
      title: "Классикалык сакал алуу искусствосу",
      subtitle: "Neva Heritage — бул жөн гана барбершоп эмес. Бул салттар заманбап стиль менен айкалышкан, ар бир эркектин кайталангыс образын жараткан жер.",
      cta: "Телефон аркылуу жазылуу"
    },
    about: {
      title: "Мурас жана Стиль",
      subtitle: "Жөн гана чач кыркуудан артык",
      p1: "Биз барберге баруу — бул ритуал деп ишенебиз. Neva Heritage'де биз ар бир майда-чүйдөсүнө чейин көңүл буруп, эркектердин кам көрүүсүнүн классикалык салттарын жандандырабыз.",
      p2: "Биздин чеберлер — өз ишинин сүрөтчүлөрү, алар убакыт сынагынан өткөн ыкмаларды заманбап тренддер менен айкалыштырышат.",
      stat1: "Чеберлер",
      stat2: "Кардарлар",
      stat3: "Жылдык тажрыйба"
    },
    services: {
      title: "Биздин Кызматтар",
      subtitle: "Чыныгы джентльмендер үчүн премиум кам көрүү",
      duration: "мүн",
      list: [
        {
          name: "Классикалык чач кыркуу",
          price: "2500 ₽",
          description: "Жеке мамиле, чач жуу, жасалгалоо жана стиль боюнча кеңеш берүү.",
          duration: "60"
        },
        {
          name: "Сакалды моделдөө",
          price: "1800 ₽",
          description: "Форма берүү, кооптуу устара менен так контурлар жана премиум майлар менен кам көрүү.",
          duration: "45"
        },
        {
          name: "Падышалык сакал алуу",
          price: "3000 ₽",
          description: "Ысык сүлгү менен бууга бышыруу жана кооптуу устара менен салттуу сакал алуу.",
          duration: "60"
        },
        {
          name: "Ата жана бала",
          price: "4000 ₽",
          description: "Эки кишилик чач кыркуу. Муундан муунга өтүп келген салттар.",
          duration: "120"
        }
      ]
    },
    contact: {
      title: "Байланыш",
      subtitle: "Сизди күтөбүз",
      address: "Дарек",
      addressValue: "Невский пр., 15, Санкт-Петербург",
      phone: "Телефон",
      hours: "Иштөө убактысы",
      hoursValue: "Күн сайын: 10:00 — 22:00",
      formTitle: "Биз менен байланышыңыз",
      name: "Сиздин атыңыз",
      phoneLabel: "Телефон",
      service: "Кызмат",
      message: "Билдирүү",
      send: "Өтүнмө жөнөтүү",
      successTitle: "Ийгиликтүү!",
      successMsg: "Биз сиз менен жакынкы арада байланышабыз."
    },
    gallery: {
      title: "Эмгектердин галереясы",
      subtitle: "Атмосфера",
      description: "Биздин мейкиндикти жана чеберлерибиздин эмгектеринин үлгүлөрүн карап көрүңүз. Биз сиздин жеке өзгөчөлүгүңүздү баса белгилеген стилди жаратабыз."
    },
    testimonials: {
      quote: "Петербургдагы эң мыкты барбершоп. Атмосфера, тейлөө жана чеберчилик эң жогорку деңгээлде. Бул жерге үч жылдан бери келем жана бир дагы жолу көңүлүм калган жок.",
      author: "Александр Волков",
      role: "Туруктуу кардар"
    },
    footer: {
      rights: "Бардык укуктар корголгон.",
      privacy: "Купуялык саясаты",
      terms: "Колдонуу шарттары"
    },
    styleExplorer: {
      title: "Виртуалдык Стилист",
      subtitle: "Жаңы образды байкап көрүңүз",
      description: "Биздин классикалык стилдерибиздин бирин тандап, ал образды кандайча өзгөртөрүн көрүңүз. Биздин ИИ-стилистибиз натыйжаны көрсөтөт.",
      processing: "Стилдештирүү...",
      styles: {
        fade: "Фейд",
        pompadour: "Помпадур",
        buzz: "Бокс",
        long: "Узун чач",
        beard: "Сакал"
      },
      camera: {
        use: "Камераны колдонуу",
        take: "Сүрөткө тартуу",
        retake: "Кайра тартуу",
        error: "Камерага кирүү катасы",
        stop: "Камераны өчүрүү"
      }
    },
    chatbot: {
      title: "Neva Heritage Ассистенти",
      status: "Тармактарда",
      placeholder: "Сиздин сурооңуз...",
      welcome: "Саламатсызбы! Мен сиздин жеке Neva Heritage ассистентиңизмин. Бүгүн сизге кантип жардам бере алам?"
    }
  }
};
