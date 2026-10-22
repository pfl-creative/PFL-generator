/**
 * Prompt Fashion Lab (PFL) - Library Pre-Checkout Controller
 * Handles UTM preservation, Meta Pixel / GA4 tracking, and Stripe checkout redirection.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. PRESERVE UTM PARAMETERS TO STRIPE CHECKOUT ---
  function getStripeUrlWithParams(baseUrl) {
    try {
      const currentParams = new URLSearchParams(window.location.search);
      const targetUrl = new URL(baseUrl);
      
      currentParams.forEach((value, key) => {
        // Forward UTMs, fbclid, gclid, and attribution tokens
        targetUrl.searchParams.set(key, value);
      });
      
      return targetUrl.toString();
    } catch (e) {
      console.warn('[UTM Forwarding Error]', e);
      return baseUrl;
    }
  }

  // --- 2. CHECKOUT REDIRECT & TRACKING LOGIC ---
  window.goToCheckout = function(plan, source = 'library') {
    const isBundle = plan === 'bundle';
    const price = isBundle ? 1240.00 : 990.00;
    const productName = isBundle 
      ? 'PFL Photoshoot Generator V2 + 2 Libraries' 
      : 'PFL Photoshoot Generator V2';
    
    const baseUrl = isBundle 
      ? 'https://buy.stripe.com/7sY7sL7kd3Lj0c95NtcIE04' 
      : 'https://buy.stripe.com/7sYbJ10VP1DbcYV2BhcIE03';

    // Meta Pixel InitiateCheckout Event
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: productName,
        content_category: isBundle ? 'Bundle Offer' : 'Single Product',
        value: price,
        currency: 'THB'
      });
    }

    // GA4 begin_checkout Event
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'begin_checkout', {
        value: price,
        currency: 'THB',
        items: [{
          item_name: productName,
          price: price,
          quantity: 1
        }]
      });
    }

    console.log(`[InitiateCheckout] Plan: ${plan}, Source: ${source}, Price: ฿${price}`);

    const finalCheckoutUrl = getStripeUrlWithParams(baseUrl);
    
    // Redirect to Stripe checkout
    window.location.href = finalCheckoutUrl;
  };

  // --- 3. SCROLL REVEAL ANIMATIONS ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- 4. STICKY MOBILE DECISION BAR CONTROLLER ---
  const stickyBar = document.querySelector('.mobile-sticky-decision-bar');
  const heroSection = document.querySelector('.library-hero-section');
  const footerSection = document.querySelector('footer');

  if (stickyBar && heroSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      
      let shouldShow = scrollY > (heroBottom - 180);

      if (footerSection) {
        const footerTop = footerSection.offsetTop;
        const windowBottom = scrollY + window.innerHeight;
        if (windowBottom > footerTop + 30) {
          shouldShow = false;
        }
      }

      if (shouldShow) {
        stickyBar.style.display = 'flex';
      } else {
        stickyBar.style.display = 'none';
      }
    });
  }
});
