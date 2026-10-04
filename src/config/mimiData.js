// Central configuration file for Mimi's Surprise Website
// All text, photos, chat messages, notes, and secret content can easily be updated here.

export const mimiData = {
  // Authentication Credentials (DO NOT CHANGE as per prompt requirements)
  credentials: {
    loginId: "Mimi",
    secretUnlockId: "Mimi",
    secretUnlockPassword: "Mimi"
  },

  // Main Header & Top Hero Section
  hero: {
    title: "Thangamaana Pulla",
    subtitle: "A private, magical sanctuary crafted specially for the purest soul.",
    badge: "For My Dearest Mimi ✨",
    quote: "“In a world full of temporary things, you are a timeless masterpiece.”",
    // Center Photo / Main Visual Focus
    centerPhoto: {
      url: "/photos/mimi_memory_1.png",
      alt: "Mimi Center Photo - Konoha Duo Heart Pose",
      caption: "Angel_soul♡ & நாட்டாமை✓ — Our cute duo heart pose in Konoha! ✨",
      tag: "Main Focus"
    }
  },

  // Interactive Photo Memories Gallery
  photos: [
    {
      id: "p1",
      url: "/photos/mimi_memory_1.png",
      title: "Konoha Duo Heart Pose 💖",
      date: "Special Duo Memory",
      location: "Hidden Leaf Village",
      caption: "Matching heart pose in Konoha! Angel_soul♡ & நாட்டாமை✓ - forever the best squad.",
      likes: 1999
    },
    {
      id: "p2",
      url: "/photos/mimi_memory_2.png",
      title: "Golden Duo Standing Strong ✨",
      date: "Sunset Walk",
      location: "Konoha Square Plaza",
      caption: "Standing side by side, looking stylish as always! Angel_soul♡ in white butterfly top & Nattamai.",
      likes: 2404
    },
    {
      id: "p3",
      url: "/photos/mimi_memory_3.png",
      title: "Playful Poses & Queen Vibes 👑",
      date: "Weekend Moments",
      location: "Konoha Summit",
      caption: "You pointing at me while I bow down to the queen! Mimi leading the squad with elegance.",
      likes: 1854
    },
    {
      id: "p4",
      url: "/photos/mimi_memory_4.png",
      title: "Lone Wolf Headhunter Carry 🔥",
      date: "Clutch Match",
      location: "Iron Cage Arena",
      caption: "Mimi dominating with 5 eliminations and 1200 damage! True Headhunter carrying the game!",
      likes: 2540
    },
    {
      id: "p5",
      url: "/photos/mimi_memory_5.png",
      title: "In-Game Battle Duo ⚡",
      date: "Victory Match",
      location: "Ninjutsu Scroll Zone",
      caption: "Ready for combat! Dual katana aura - Angel_soul♡ & நாட்டாமை✓ ruling the battleground.",
      likes: 1777
    }
  ],

  // Interactive Chat / Conversation Section ("Remember this?")
  chat: {
    title: "Remember This Conversation?",
    subtitle: "Replaying the sweet little messages saved forever in heart.",
    messages: [
      {
        id: 1,
        sender: "them", // Mimi
        senderName: "Mimi ✨",
        text: "Hey! Do you remember our epic Free Fire clutch in Iron Cage? 🙈",
        time: "10:14 PM",
        avatar: "/photos/mimi_memory_1.png"
      },
      {
        id: 2,
        sender: "me",
        senderName: "You",
        text: "How could I ever forget? 5 eliminations and 1200 damage! You completely carried the team! ❤️",
        time: "10:15 PM"
      },
      {
        id: 3,
        sender: "them",
        senderName: "Mimi ✨",
        text: "Aww stop it! 🥹 You always know exactly what to say to make me smile!",
        time: "10:16 PM",
        avatar: "/photos/mimi_memory_1.png"
      },
      {
        id: 4,
        sender: "me",
        senderName: "You",
        text: "That smile of yours (Thangamaana Pulla!) is worth more than all the Booyahs in the world. ✨",
        time: "10:17 PM"
      },
      {
        id: 5,
        sender: "them",
        senderName: "Mimi ✨",
        text: "Promise me we'll keep making these beautiful duo memories forever? 💖",
        time: "10:18 PM",
        avatar: "/photos/mimi_memory_1.png"
      },
      {
        id: 6,
        sender: "me",
        senderName: "You",
        text: "Promise 100%. Cross my heart! Scroll down, I have a secret vault built for you...",
        time: "10:19 PM"
      }
    ]
  },

  // Little Secret Notes Cards
  secretNotes: [
    {
      id: "n1",
      cardTitle: "A little secret…",
      icon: "Sparkles",
      bgGradient: "from-pink-900/40 via-purple-900/30 to-indigo-900/40",
      content: "Every single time your name pops up on my screen, I automatically smile without even realizing it. You have this magical ability to turn any terrible day into pure light."
    },
    {
      id: "n2",
      cardTitle: "Open this…",
      icon: "Heart",
      bgGradient: "from-rose-900/40 via-pink-900/30 to-purple-900/40",
      content: "You are stronger, kinder, smarter, and infinitely more amazing than you give yourself credit for. Never forget how truly precious you are."
    },
    {
      id: "n3",
      cardTitle: "One memory…",
      icon: "Camera",
      bgGradient: "from-purple-900/40 via-amber-900/30 to-pink-900/40",
      content: "Remember that day we posed together in Leaf Village taking those cute duo screenshots? That exact moment is locked in my heart forever as one of my favorite memories."
    },
    {
      id: "n4",
      cardTitle: "Something I wanted to say…",
      icon: "MessageCircle",
      bgGradient: "from-violet-900/40 via-rose-900/30 to-amber-900/40",
      content: "Thank you for being you. Thank you for existing in my world. You make life feel like a cinematic fairytale, Mimi."
    }
  ],

  // Important Places Section
  importantPlaces: [
    {
      id: "loc1",
      name: "Hidden Leaf Village Summit",
      tag: "Where Duo Heart Pose Was Born",
      image: "/photos/mimi_memory_1.png",
      shortDescription: "The iconic spot overlooking Hokage Rock where Angel_soul♡ & நாட்டாமை✓ struck the heart pose.",
      fullMemory: "We stood on the cliff under the blue sky, striking matching poses and taking screenshots. The vibes were immaculate, time completely stopped right here."
    },
    {
      id: "loc2",
      name: "Iron Cage Arena",
      tag: "5 Eliminations Clutch Zone",
      image: "/photos/mimi_memory_4.png",
      shortDescription: "Where Mimi unleashed 1200 damage and earned the Headhunter badge.",
      fullMemory: "The battle was intense, but Mimi took control and dominated the entire Lone Wolf match! A core memory of unstoppable teamwork and skill."
    },
    {
      id: "loc3",
      name: "Ninjutsu Scroll Zone",
      tag: "Dual Katana Aura Sanctuary",
      image: "/photos/mimi_memory_5.png",
      shortDescription: "Standing side by side with glowing aura ready to dominate.",
      fullMemory: "Under the bright skies with Leaf emblem shields shining, Angel_soul♡ & நாட்டாமை✓ ready to conquer every match together."
    },
    {
      id: "loc4",
      name: "Konoha Square Plaza",
      tag: "Golden Duo Standing Strong",
      image: "/photos/mimi_memory_2.png",
      shortDescription: "Casual posing in the heart of the village with white boots & butterfly top.",
      fullMemory: "No rush, no stress. Just standing together enjoying the view and striking iconic squad poses."
    }
  ],

  // Final Secret Unlocked Section Content
  finalSecret: {
    badge: "CLASSIFIED HEART VAULT UNLOCKED 🔑",
    title: "Welcome to Mimi's Private Universe",
    subtitle: "You found the key to the ultimate secret box created exclusively for you.",
    mainPhoto: "/photos/mimi_memory_2.png",
    letterTitle: "A Letter from the Heart",
    letterContent: [
      "Dearest Mimi,",
      "If you are reading this right now, it means you successfully unlocked the final vault! This entire digital universe was built line by line, animation by animation, purely to remind you how extraordinarily special you are.",
      "You are 'Thangamaana Pulla' — a golden heart in a world that so desperately needs your kind of light. Your laughter brings warmth, your presence brings peace, and your strength inspires everyone lucky enough to know you.",
      "Never doubt yourself. Never let the noise of the world dim your sparkle. Whatever dreams you hold in your heart, know that I am cheering for you always, today, tomorrow, and every day that follows.",
      "Thank you for being the wonderful, radiant, unmatched person that you are. This secret world will always remain right here, waiting whenever you need a little reminder of how deeply you are cherished."
    ],
    promises: [
      "✨ Always bring a smile to your face",
      "💖 Celebrate your victories & Free Fire clutches",
      "🌟 Stand by you as your ultimate game duo & best friend",
      "🌙 Keep all our shared memories safe forever"
    ],
    gallery: [
      "/photos/mimi_memory_1.png",
      "/photos/mimi_memory_3.png",
      "/photos/mimi_memory_4.png",
      "/photos/mimi_memory_5.png"
    ]
  }
};
