document.addEventListener('DOMContentLoaded', () => {
  // --- SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after showing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');
    
    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all open items first
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        // Set dynamic max-height based on scroll height
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- STICKY MOBILE CTA DISPLAY ---
  const stickyCta = document.getElementById('stickyMobileCta');
  const heroSection = document.getElementById('hero');
  const footerSection = document.querySelector('footer');

  window.addEventListener('scroll', () => {
    if (!stickyCta || !heroSection) return;

    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    // Show sticky CTA after scrolling past Hero
    let shouldShow = scrollY > (heroHeight - 100);

    // Hide sticky CTA if near the bottom footer
    if (footerSection) {
      const footerTop = footerSection.offsetTop;
      const windowHeight = window.innerHeight;
      if (scrollY + windowHeight > footerTop + 20) {
        shouldShow = false;
      }
    }

    if (shouldShow) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  });

  // --- INTERACTIVE SIMULATOR DATABASE ---
  const simulatorDatabase = {
    'product:blouse|model:thai|location:cafe|mood:luxury': {
      prompt: "Analog film fashion photography of a 28yo Thai woman wearing a light blue silk blouse, sitting in a minimal warm-ivory concrete cafe, relaxed quiet luxury mood, iPhone lifestyle camera angle, shot on 35mm, f/2.8 --ar 4:5",
      images: {
        wide: "images/shot_01.jpg",
        medium: "images/shot_02.jpg",
        closeup: "images/shot_03.jpg",
        candid: "images/shot_04.jpg",
        detail: "images/shot_05.jpg",
        hero: "images/shot_06.jpg"
      }
    },
    'product:blouse|model:thai|location:cafe|mood:edgy': {
      prompt: "Candid snapshots of a 28yo Thai woman wearing a neon blue cropped blouse, standing outside a vintage concrete cafe, raw camera flash photography, edgy street style, high-contrast shadows, direct flash --ar 4:5",
      images: {
        wide: "images/blouse_thai_cafe_edgy_shot_01.jpg",
        medium: "images/blouse_thai_cafe_edgy_shot_02.jpg",
        closeup: "images/blouse_thai_cafe_edgy_shot_03.jpg",
        candid: "images/blouse_thai_cafe_edgy_shot_04.jpg",
        detail: "images/blouse_thai_cafe_edgy_shot_05.jpg",
        hero: "images/blouse_thai_cafe_edgy_shot_06.jpg"
      }
    },
    'product:blouse|model:thai|location:studio|mood:luxury': {
      prompt: "Commercial fashion lookbook photography of a 28yo Thai model in a sky blue linen blouse, minimalist sunlit studio with clean shadows, calm luxury editorial style, warm organic mood --ar 4:5",
      images: {
        wide: "images/blouse_thai_studio_shot_01.jpg",
        medium: "images/blouse_thai_studio_shot_02.jpg",
        closeup: "images/blouse_thai_studio_shot_03.jpg",
        candid: "images/blouse_thai_studio_shot_04.jpg",
        detail: "images/blouse_thai_studio_shot_05.jpg",
        hero: "images/blouse_thai_studio_shot_06.jpg"
      }
    },
    'product:blouse|model:thai|location:studio|mood:edgy': {
      prompt: "Underground fashion editorial featuring a 28yo Thai woman in a deconstructed blue cotton blouse, dark concrete warehouse studio, flash styling, high-contrast shadows, raw energy --ar 4:5",
      images: {
        wide: "images/blouse_thai_studio_edgy_shot_01.jpg",
        medium: "images/blouse_thai_studio_edgy_shot_02.jpg",
        closeup: "images/blouse_thai_studio_edgy_shot_03.jpg",
        candid: "images/blouse_thai_studio_edgy_shot_04.jpg",
        detail: "images/blouse_thai_studio_edgy_shot_05.jpg",
        hero: "images/blouse_thai_studio_edgy_shot_06.jpg"
      }
    },
    'product:dress|model:thai|location:cafe|mood:luxury': {
      prompt: "Cinematic lifestyle photography of a Thai woman wearing an elegant cream silk satin dress, relaxed sitting in a warm beige minimal cafe, quiet luxury mood, soft morning sunlight --ar 4:5",
      images: {
        wide: "images/dress_shot_01.jpg",
        medium: "images/dress_shot_02.jpg",
        closeup: "images/dress_shot_03.jpg",
        candid: "images/dress_shot_04.jpg",
        detail: "images/dress_shot_05.jpg",
        hero: "images/dress_shot_06.jpg"
      }
    },
    'product:dress|model:thai|location:cafe|mood:edgy': {
      prompt: "Street editorial of a Thai woman wearing a long cream satin dress with boots, walking by a vintage cafe window, raw flash photography, high contrast, documentary style --ar 4:5",
      images: {
        wide: "images/dress_cafe_edgy_shot_01.jpg",
        medium: "images/dress_cafe_edgy_shot_02.jpg",
        closeup: "images/dress_cafe_edgy_shot_03.jpg",
        candid: "images/dress_cafe_edgy_shot_04.jpg",
        detail: "images/dress_cafe_edgy_shot_05.jpg",
        hero: "images/dress_cafe_edgy_shot_06.jpg"
      }
    },
    'product:dress|model:thai|location:studio|mood:luxury': {
      prompt: "Minimalist fashion profile featuring a Thai model in a cream fluid satin slip dress, sitting on a wooden stool in a bright sunny studio, delicate shadows, high fashion lookbook --ar 4:5",
      images: {
        wide: "images/dress_studio_shot_01.jpg",
        medium: "images/dress_studio_shot_02.jpg",
        closeup: "images/dress_studio_shot_03.jpg",
        candid: "images/dress_studio_shot_04.jpg",
        detail: "images/dress_studio_shot_05.jpg",
        hero: "images/dress_studio_shot_06.jpg"
      }
    },
    'product:dress|model:thai|location:studio|mood:edgy': {
      prompt: "Raw flash photoshoot in a dark industrial studio, a Thai woman in a silk cream dress and leather jacket, bold contrasts, editorial grunge aesthetic, shot on film --ar 4:5",
      images: {
        wide: "images/dress_studio_edgy_shot_01.jpg",
        medium: "images/dress_studio_edgy_shot_02.jpg",
        closeup: "images/dress_studio_edgy_shot_03.jpg",
        candid: "images/dress_studio_edgy_shot_04.jpg",
        detail: "images/dress_studio_edgy_shot_05.jpg",
        hero: "images/dress_studio_edgy_shot_06.jpg"
      }
    },
    'product:blouse|model:korean|location:cafe|mood:luxury': {
      prompt: "Analog film fashion photography of a 23yo Korean model wearing a light blue silk blouse, sitting in a minimal warm-ivory concrete cafe, relaxed quiet luxury mood, iPhone lifestyle --ar 4:5",
      images: {
        wide: "images/blouse_korean_cafe_shot_01.jpg",
        medium: "images/blouse_korean_cafe_shot_02.jpg",
        closeup: "images/blouse_korean_cafe_shot_03.jpg",
        candid: "images/blouse_korean_cafe_shot_04.jpg",
        detail: "images/blouse_korean_cafe_shot_05.jpg",
        hero: "images/blouse_korean_cafe_shot_06.jpg"
      }
    },
    'product:blouse|model:korean|location:cafe|mood:edgy': {
      prompt: "Street fashion of a 23yo Korean model wearing a blue blouse, neon alley cafe background, direct flash photography, candid high-speed shutter snapshot --ar 4:5",
      images: {
        wide: "images/blouse_korean_cafe_edgy_shot_01.jpg",
        medium: "images/blouse_korean_cafe_edgy_shot_02.jpg",
        closeup: "images/blouse_korean_cafe_edgy_shot_03.jpg",
        candid: "images/blouse_korean_cafe_edgy_shot_04.jpg",
        detail: "images/blouse_korean_cafe_edgy_shot_05.jpg",
        hero: "images/blouse_korean_cafe_edgy_shot_06.jpg"
      }
    },
    'product:blouse|model:korean|location:studio|mood:luxury': {
      prompt: "High fashion photography of a 23yo Korean model in a sky blue blouse, sunlight clean studio, architectural concrete styling, relaxed expression --ar 4:5",
      images: {
        wide: "images/blouse_korean_studio_shot_01.jpg",
        medium: "images/blouse_korean_studio_shot_02.jpg",
        closeup: "images/blouse_korean_studio_shot_03.jpg",
        candid: "images/blouse_korean_studio_shot_04.jpg",
        detail: "images/blouse_korean_studio_shot_05.jpg",
        hero: "images/blouse_korean_studio_shot_06.jpg"
      }
    },
    'product:blouse|model:korean|location:studio|mood:edgy': {
      prompt: "Grungy studio portrait of a 23yo Korean model wearing a designer blue blouse, high-contrast flash shadow, bold urban lookbook style --ar 4:5",
      images: {
        wide: "images/blouse_korean_studio_edgy_shot_01.jpg",
        medium: "images/blouse_korean_studio_edgy_shot_02.jpg",
        closeup: "images/blouse_korean_studio_edgy_shot_03.jpg",
        candid: "images/blouse_korean_studio_edgy_shot_04.jpg",
        detail: "images/blouse_korean_studio_edgy_shot_05.jpg",
        hero: "images/blouse_korean_studio_edgy_shot_06.jpg"
      }
    },
    'product:dress|model:korean|location:cafe|mood:luxury': {
      prompt: "Elegant catalog photo of a 23yo Korean model wearing a cream silk satin dress, enjoying morning light inside a minimal concrete cafe, quiet luxury concept --ar 4:5",
      images: {
        wide: "images/dress_korean_shot_01.jpg",
        medium: "images/dress_korean_shot_02.jpg",
        closeup: "images/dress_korean_shot_03.jpg",
        candid: "images/dress_korean_shot_04.jpg",
        detail: "images/dress_korean_shot_05.jpg",
        hero: "images/dress_korean_shot_06.jpg"
      }
    },
    'product:dress|model:korean|location:cafe|mood:edgy': {
      prompt: "Street look of a 23yo Korean model in a fluid cream dress, sitting at a cafe stool outdoors, flash shadows, raw vintage look --ar 4:5",
      images: {
        wide: "images/dress_korean_cafe_edgy_shot_01.jpg",
        medium: "images/dress_korean_cafe_edgy_shot_02.jpg",
        closeup: "images/dress_korean_cafe_edgy_shot_03.jpg",
        candid: "images/dress_korean_cafe_edgy_shot_04.jpg",
        detail: "images/dress_korean_cafe_edgy_shot_05.jpg",
        hero: "images/dress_korean_cafe_edgy_shot_06.jpg"
      }
    },
    'product:dress|model:korean|location:studio|mood:luxury': {
      prompt: "Aesthetic profile of a 23yo Korean model in a cream silk dress, bright white sunlit studio with plants, editorial fashion styling --ar 4:5",
      images: {
        wide: "images/dress_korean_studio_shot_01.jpg",
        medium: "images/dress_korean_studio_shot_02.jpg",
        closeup: "images/dress_korean_studio_shot_03.jpg",
        candid: "images/dress_korean_studio_shot_04.jpg",
        detail: "images/dress_korean_studio_shot_05.jpg",
        hero: "images/dress_korean_studio_shot_06.jpg"
      }
    },
    'product:dress|model:korean|location:studio|mood:edgy': {
      prompt: "Edgy flash photo session of a 23yo Korean model in a cream satin gown, dark shadow backdrop, dramatic studio lighting --ar 4:5",
      images: {
        wide: "images/dress_korean_studio_edgy_shot_01.jpg",
        medium: "images/dress_korean_studio_edgy_shot_02.jpg",
        closeup: "images/dress_korean_studio_edgy_shot_03.jpg",
        candid: "images/dress_korean_studio_edgy_shot_04.jpg",
        detail: "images/dress_korean_studio_edgy_shot_05.jpg",
        hero: "images/dress_korean_studio_edgy_shot_06.jpg"
      }
    }
  };

  // Analytics tracking helper (GA4 + Meta Pixel)
  window.trackEvent = function(eventName, params = {}) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    if (typeof window.fbq === 'function') {
      if (eventName === 'checkout_start') {
        window.fbq('track', 'InitiateCheckout', {
          content_name: 'PFL Photoshoot Generator V2',
          content_category: 'AI Tool',
          value: 990,
          currency: 'THB'
        });
      } else {
        window.fbq('trackCustom', eventName, params);
      }
    }
    console.log(`[Event Tracked] ${eventName}`, params);
  };

  // --- YOUTUBE SHORTS DEMO PLAYER LOGIC ---
  const shortsContainer = document.getElementById('shortsPlayerContainer');
  const shortsPoster = document.getElementById('shortsPoster');
  const shortsIframe = document.getElementById('shortsIframe');

  window.playShortsVideo = function() {
    window.trackEvent('shorts_video_play');
    if (shortsPoster) {
      shortsPoster.classList.add('hidden');
    }
    if (shortsIframe) {
      shortsIframe.src = 'https://www.youtube-nocookie.com/embed/jO3UOd4hLWE?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1';
    }
  };

  if (shortsPoster) {
    shortsPoster.addEventListener('click', window.playShortsVideo);
  }

  // Checkout redirect logic with source tracking & pre-checkout upsell flow
  window.checkout = function(source = 'general') {
    window.trackEvent('checkout_start', { 
      source: source, 
      product: 'PFL Photoshoot Generator V2',
      price: 990
    });
    // Redirect to pre-checkout upsell page, preserving UTM parameters
    const searchParams = new URLSearchParams(window.location.search);
    if (source && !searchParams.has('source')) {
      searchParams.set('source', source);
    }
    const queryString = searchParams.toString();
    const destination = queryString ? `library.html?${queryString}` : 'library.html';
    window.location.href = destination;
  };
});
