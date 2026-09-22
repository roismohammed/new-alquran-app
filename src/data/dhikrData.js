export const DHIKR_PRESETS = [
  {
    id: 'tasbih',
    name: 'Tasbih',
    arab: 'سُبْحَانَ اللَّهِ',
    latin: 'Subhanallah',
    arti: 'Maha Suci Allah',
    target: 33,
    keutamaan: 'Menggugurkan dosa-dosa dan menanam pohon di surga.'
  },
  {
    id: 'tahmid',
    name: 'Tahmid',
    arab: 'الْحَمْدُ لِلَّهِ',
    latin: 'Alhamdulillah',
    arti: 'Segala puji bagi Allah',
    target: 33,
    keutamaan: 'Memenuhi timbangan amal kebaikan pada hari kiamat.'
  },
  {
    id: 'takbir',
    name: 'Takbir',
    arab: 'اللَّهُ أَكْبَرُ',
    latin: 'Allahu Akbar',
    arti: 'Allah Maha Besar',
    target: 33,
    keutamaan: 'Mengagungkan kebesaran Allah di langit dan bumi.'
  },
  {
    id: 'tahlil',
    name: 'Tahlil',
    arab: 'لَا إِلَهَ إِلَّا اللَّهُ',
    latin: 'Laa ilaaha illallah',
    arti: 'Tiada Tuhan selain Allah',
    target: 100,
    keutamaan: 'Dzikir paling utama dan kunci surga.'
  },
  {
    id: 'istighfar',
    name: 'Istighfar',
    arab: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
    latin: 'Astaghfirullahal \'Azhim',
    arti: 'Aku memohon ampun kepada Allah yang Maha Agung',
    target: 100,
    keutamaan: 'Membuka pintu rezeki, melapangkan kesempitan, dan menghapus dosa.'
  },
  {
    id: 'shalawat',
    name: 'Shalawat Nabi',
    arab: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ',
    latin: 'Allahumma shalli \'ala sayyidina Muhammad',
    arti: 'Ya Allah limpahkanlah rahmat kepada junjungan kami Nabi Muhammad',
    target: 100,
    keutamaan: 'Barangsiapa bershalawat 1 kali, Allah akan bershalawat kepadanya 10 kali.'
  },
  {
    id: 'hauqalah',
    name: 'Hauqalah',
    arab: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    latin: 'Laa hawla wa laa quwwata illaa billaah',
    arti: 'Tiada daya dan upaya kecuali dengan pertolongan Allah',
    target: 33,
    keutamaan: 'Salah satu harta simpanan di surga.'
  },
  {
    id: 'tasbih-lengkap',
    name: 'Tasbih Lengkap',
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
    latin: 'Subhanallahi wa bihamdihi Subhanallahil \'Azhim',
    arti: 'Maha Suci Allah dengan segala puji-Nya, Maha Suci Allah yang Maha Agung',
    target: 100,
    keutamaan: 'Dua kalimat yang ringan di lisan, berat di timbangan amal, dicintai Allah.'
  }
];

export const DHIKR_ROUTINES = {
  pagi: [
    {
      id: 'p1',
      arab: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      latin: 'Ashbahnaa wa ashbahal mulku lillah, walhamdulillah, laa ilaaha illallah wahdahu laa syariika lah',
      arti: 'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah...',
      target: 1
    },
    {
      id: 'p2',
      arab: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
      latin: 'Allahumma bika ashbahnaa, wa bika amsaynaa, wa bika nahyaa, wa bika namuutu wa ilaykan nusyuur',
      arti: 'Ya Allah, dengan rahmat-Mu kami memasuki waktu pagi, dengan-Mu kami memasuki petang, dengan-Mu kami hidup, dan dengan-Mu kami mati...',
      target: 1
    },
    {
      id: 'p3',
      arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      latin: 'Subhanallahi wa bihamdihi',
      arti: 'Maha Suci Allah dan segala puji bagi-Nya (dibaca 100x di waktu pagi)',
      target: 100
    }
  ],
  petang: [
    {
      id: 's1',
      arab: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      latin: 'Amsaynaa wa amsal mulku lillah, walhamdulillah, laa ilaaha illallah wahdahu laa syariika lah',
      arti: 'Kami telah memasuki waktu petang dan kerajaan hanya milik Allah...',
      target: 1
    },
    {
      id: 's2',
      arab: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
      latin: 'Allahumma bika amsaynaa, wa bika ashbahnaa, wa bika nahyaa, wa bika namuutu wa ilaykal mashiir',
      arti: 'Ya Allah, dengan rahmat-Mu kami memasuki waktu petang...',
      target: 1
    },
    {
      id: 's3',
      arab: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      latin: "A'uudzu bikalimaatillaahit-taammaati min syarri maa khalaq",
      arti: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang Dia ciptakan (dibaca 3x)',
      target: 3
    }
  ]
};
