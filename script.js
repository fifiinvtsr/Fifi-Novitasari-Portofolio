// ===== PORTFOLIO JS =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  });

  // ===== MOBILE MENU TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ===== TYPING EFFECT =====
  const typedElement = document.getElementById('typedText');
  const texts = [
    'Programmer',
    'Software Developer',
    'Data Analyst',
    'UI/UX Designer',
    'Fresh Graduate 2026'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typedElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(typeText, typingSpeed);
  }

  // Start typing after hero animation
  setTimeout(typeText, 1200);

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add stagger delay based on data attribute or index within parent
        const staggerIndex = entry.target.style.getPropertyValue('--i') || 0;
        const delay = parseInt(staggerIndex) * 80;

        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== PARALLAX ON HERO =====
  const hero = document.querySelector('.hero');
  const heroPhotoStack = document.querySelector('.hero-photo-stack');

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const scrollRatio = window.scrollY / window.innerHeight;
      if (heroPhotoStack) {
        heroPhotoStack.style.transform = `translateY(${scrollRatio * 40}px)`;
      }
    }
  });

  // ===== SPARKLE FLOATING ANIMATION =====
  const sparkles = document.querySelectorAll('.sparkle');
  sparkles.forEach((sparkle, i) => {
    sparkle.style.animation = `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`;
  });

});

// ===== LIGHTBOX =====
function openLightbox(cardEl) {
  const img = cardEl.querySelector('img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  lightboxImg.src = img.src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  // Close only if clicking background or close button, not the image
  if (event.target === lightboxImg) return;

  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    // Also close chatbot on Escape
    const chatWindow = document.getElementById('chatbotWindow');
    if (chatWindow && chatWindow.classList.contains('open')) {
      toggleChatbot(false);
    }
  }
});

// ===== CHATBOT =====
(function () {
  const fab = document.getElementById('chatbotFab');
  const chatWindow = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const messagesEl = document.getElementById('chatbotMessages');
  const quickRepliesEl = document.getElementById('chatbotQuickReplies');
  const inputEl = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const badge = fab.querySelector('.chatbot-fab-badge');

  let isOpen = false;
  let hasGreeted = false;

  // --- Knowledge base ---
  const info = {
    name: 'Fifi Novitasari',
    education: 'Lulusan D-IV Sistem Informasi Bisnis, Jurusan Teknologi Informasi, Politeknik Negeri Malang (2022-2026) dengan IPK 3.58/4.00.',
    skills_soft: 'Teamwork, Critical Thinking, Time Management, Leadership Basic, Adaptability, Creativity & Innovation.',
    skills_hard: 'Canva, Microsoft Office, Google Colab, Looker Studio, Figma, Adobe InDesign, Python, Excel.',
    experience_org: 'Pimpinan Redaksi Bidang Humas UKM BKM Polinema (2023-2025), Delegasi Studi Banding Polinema Semarang, Divisi Acara Program Bhakti Mahasiswa.',
    experience_committee: 'Tim Riset Kolaborasi POLINEMA & PT. Pos Indonesia, Publication & Documentation GDG Surabaya, Divisi Penghijauan Desa UKM BKM.',
    internship: 'Magang di PT Ina Gata Persada Malang sebagai UI/UX Designer (2025). Mengerjakan UI Mobile App Time Management System, UX Website Rumah Data SastraUM, Design Product Aqiqah, dan Pemateri Kunjungan Industri Universitas Gontor.',
    achievements: '• Pendanaan Insentif PKM-GFT 2025 (Belmawa Dikti)\n• Mahasiswa Berprestasi Non-Akademik JTI 2024 & 2025\n• Juara 1 Lomba Karikatur Porseni XIV 2024\n• Juara 1 Poster Design E-Government KMIPN V 2023\n• Juara 3 E-Government Kompetisi Internal 2023',
    projects: '1. Sistem Survey Kepuasan Pelanggan — UI/UX Design & Flowchart\n2. Sistem Kompensasi Teknologi Informasi — UI/UX Design, Flowchart & Frontend\n3. Digital Marketing "CanVas Polinema" — Social Media Specialist',
    research: 'Penelitian kolaborasi Polinema & PT. Pos Indonesia: Sistem Prediksi Jumlah Paket per Kategori SLA menggunakan XGBoost Machine Learning dengan Dashboard Analytics interaktif.',
    contact: '📱 WhatsApp: +62 877-5819-8469\n📧 Email: fifinovitasari13@gmail.com\n💼 LinkedIn: linkedin.com/in/fifi-novitasari\n🐙 GitHub: github.com/fifiinvtsr',
    certifications: 'Google Ads AI-Powered Performance, Claude Academy, Pelatihan AI JTI Polinema, Data Analyst Looker Studio, Dicoding Generative AI, Dicoding AI Produktivitas.',
    devfest: 'Berkontribusi di Developer Festival 2025, Google Developer Group Surabaya — Graphic Design (Banner, Voucher, PPT) dan Packaging Product Marketing.'
  };

  // --- Intent matching ---
  const intents = [
    {
      patterns: [/siapa\s*(fifi|kamu|dia)/i, /about/i, /profil/i, /perkenal/i, /nama/i, /who\s*(is|are)/i, /introduce/i, /tell me about/i],
      reply: `Halo! 👋 Saya asisten virtual dari **${info.name}**.\n\n${info.name} adalah lulusan D-IV Sistem Informasi Bisnis dari Politeknik Negeri Malang (IPK 3.58). Passionate di bidang **UI/UX Design**, **Data Analyst**, dan **Software Development**.`
    },
    {
      patterns: [/pendidikan/i, /kampus/i, /kuliah/i, /education/i, /univ/i, /ipk|gpa/i, /jurusan/i, /sekolah/i, /college/i],
      reply: `🎓 **Education**\n\n${info.education}`
    },
    {
      patterns: [/skill/i, /keahlian/i, /kemampuan/i, /bisa\s*apa/i, /tools/i, /tech/i],
      reply: `💡 **Skills**\n\n**Soft Skills:** ${info.skills_soft}\n\n**Hard Skills:** ${info.skills_hard}`
    },
    {
      patterns: [/pengalaman/i, /experience/i, /organisasi/i, /organization/i, /kerja/i, /work/i, /karir/i],
      reply: `💼 **Experience**\n\n**Organisasi:**\n${info.experience_org}\n\n**Kepanitiaan:**\n${info.experience_committee}`
    },
    {
      patterns: [/magang/i, /internship/i, /ina\s*gata/i, /intern/i],
      reply: `🏢 **Internship**\n\n${info.internship}`
    },
    {
      patterns: [/prestasi/i, /achievement/i, /juara/i, /lomba/i, /award/i, /penghargaan/i, /pkm/i, /mapres/i],
      reply: `🏆 **Achievements**\n\n${info.achievements}`
    },
    {
      patterns: [/project/i, /proyek/i, /portofolio/i, /portfolio/i],
      reply: `📂 **Recent Projects**\n\n${info.projects}`
    },
    {
      patterns: [/riset|penelitian|research|prediksi|pos\s*indonesia|xgboost|machine\s*learning/i],
      reply: `🔬 **Research**\n\n${info.research}`
    },
    {
      patterns: [/kontak|contact|hubung|email|whatsapp|linkedin|github|wa\b|telp|phone/i],
      reply: `📬 **Contact**\n\n${info.contact}`
    },
    {
      patterns: [/sertifikat|certification|certificate|google\s*ads|claude|dicoding|looker/i],
      reply: `📜 **Certifications**\n\n${info.certifications}`
    },
    {
      patterns: [/devfest|gdg|developer\s*festival|surabaya/i],
      reply: `🎪 **DevFest 2025**\n\n${info.devfest}`
    },
    {
      patterns: [/hai|halo|hello|hi\b|hey|hallo|assalamu/i],
      reply: `Halo! 👋 Selamat datang di portfolio ${info.name}!\n\nAda yang bisa saya bantu? Kamu bisa tanya tentang profil, skill, pengalaman, atau lainnya 😊`
    },
    {
      patterns: [/terima\s*kasih|thanks|thank|makasih|thx/i],
      reply: 'Sama-sama! 😊 Jangan ragu untuk bertanya lagi ya. Semoga informasinya bermanfaat! ✨'
    },
    {
      patterns: [/hire|rekrut|join|lamar|available/i],
      reply: `Fifi terbuka untuk kesempatan kerja! 🚀\n\nSilakan hubungi langsung:\n${info.contact}`
    }
  ];

  const defaultReplies = [
    `Hmm, saya belum paham pertanyaan itu 😅\nCoba tanya tentang **skill**, **pengalaman**, **project**, **prestasi**, atau **kontak** Fifi ya!`,
    `Maaf, saya belum bisa menjawab itu. Tapi kamu bisa tanya:\n• Siapa Fifi?\n• Skill apa saja?\n• Pengalaman kerja\n• Prestasi & sertifikat\n• Kontak`,
    `Saya asisten sederhana 🤖 Coba tanya hal spesifik tentang portfolio Fifi, seperti **pendidikan**, **magang**, atau **project**!`
  ];

  const defaultQuickReplies = [
    'Siapa Fifi?', 'Skills', 'Experience', 'Achievements', 'Projects', 'Contact'
  ];

  // --- Helpers ---
  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function formatMsg(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chatbot-msg ${sender}`;

    if (sender === 'bot') {
      msgDiv.innerHTML = `
        <div class="chatbot-msg-avatar"><img src="about_fifi.jpg" alt="Fifi"></div>
        <div class="chatbot-msg-bubble">${formatMsg(text)}</div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="chatbot-msg-bubble">${formatMsg(text)}</div>
      `;
    }

    messagesEl.appendChild(msgDiv);
    scrollToBottom();
  }

  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-msg bot';
    typingDiv.id = 'chatbotTyping';
    typingDiv.innerHTML = `
      <div class="chatbot-msg-avatar"><img src="about_fifi.jpg" alt="Fifi"></div>
      <div class="chatbot-msg-bubble"><div class="chatbot-typing"><span></span><span></span><span></span></div></div>
    `;
    messagesEl.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeTyping() {
    const typingEl = document.getElementById('chatbotTyping');
    if (typingEl) typingEl.remove();
  }

  function showQuickReplies(options) {
    quickRepliesEl.innerHTML = '';
    options.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'chatbot-quick-btn';
      btn.textContent = text;
      btn.addEventListener('click', () => handleUserMessage(text));
      quickRepliesEl.appendChild(btn);
    });
  }

  function getReply(message) {
    const msg = message.toLowerCase().trim();
    for (const intent of intents) {
      for (const pattern of intent.patterns) {
        if (pattern.test(msg)) return intent.reply;
      }
    }
    return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;

    addMessage(text, 'user');
    inputEl.value = '';
    quickRepliesEl.innerHTML = '';

    showTyping();

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      removeTyping();
      const reply = getReply(text);
      addMessage(reply, 'bot');
      showQuickReplies(defaultQuickReplies);
    }, delay);
  }

  // --- Toggle chatbot ---
  window.toggleChatbot = function (forceOpen) {
    isOpen = forceOpen !== undefined ? forceOpen : !isOpen;
    chatWindow.classList.toggle('open', isOpen);
    fab.classList.toggle('active', isOpen);

    if (isOpen) {
      badge.classList.add('hidden');
      if (!hasGreeted) {
        hasGreeted = true;
        setTimeout(() => {
          addMessage(`Halo! 👋 Saya asisten virtual di portfolio **Fifi Novitasari**.\n\nAda yang bisa saya bantu? Silakan pilih topik di bawah atau ketik pertanyaanmu!`, 'bot');
          showQuickReplies(defaultQuickReplies);
        }, 400);
      }
      setTimeout(() => inputEl.focus(), 350);
    }
  };

  // --- Events ---
  fab.addEventListener('click', () => toggleChatbot());
  closeBtn.addEventListener('click', () => toggleChatbot(false));

  sendBtn.addEventListener('click', () => handleUserMessage(inputEl.value));
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleUserMessage(inputEl.value);
  });
})();
