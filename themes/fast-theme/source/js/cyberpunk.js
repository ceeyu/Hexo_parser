// Cyberpunk 2077 風格動畫效果

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. 滑鼠追蹤光暈
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);
  
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX - 10 + 'px';
    cursorGlow.style.top = e.clientY - 10 + 'px';
  });

  // 2. 數據流背景 (Matrix 風格)
  function createDataStream() {
    const container = document.createElement('div');
    container.className = 'data-stream';
    document.body.appendChild(container);
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
      const span = document.createElement('span');
      span.style.left = (i * 20) + 'px';
      span.style.animationDuration = (Math.random() * 10 + 5) + 's';
      span.style.animationDelay = (Math.random() * 5) + 's';
      
      // 隨機字符
      let text = '';
      for (let j = 0; j < 20; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '\n';
      }
      span.textContent = text;
      container.appendChild(span);
    }
  }
  
  // 只在首頁啟用數據流
  if (document.querySelector('.hero-section')) {
    createDataStream();
  }

  // 3. 故障效果 (Glitch) 應用到標題
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.classList.add('glitch');
    heroTitle.setAttribute('data-text', heroTitle.textContent);
  }

  // 4. 霓虹效果應用到網站標題
  const siteTitle = document.querySelector('.site-title a');
  if (siteTitle) {
    siteTitle.classList.add('neon-text');
  }

  // 5. 卡片霓虹邊框效果
  document.querySelectorAll('.series-card, .post, .category-post-item').forEach(card => {
    card.classList.add('cyber-card');
  });

  // 6. 按鈕賽博風格
  document.querySelectorAll('.read-more, .view-all, .cyber-btn').forEach(btn => {
    btn.classList.add('cyber-btn');
  });

  // 7. 隨機故障效果
  function randomGlitch() {
    const elements = document.querySelectorAll('.post-title a, .series-title');
    const randomEl = elements[Math.floor(Math.random() * elements.length)];
    
    if (randomEl) {
      randomEl.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
      randomEl.style.textShadow = `
        ${Math.random() * 4 - 2}px 0 var(--cyber-cyan),
        ${Math.random() * -4 + 2}px 0 var(--cyber-pink)
      `;
      
      setTimeout(() => {
        randomEl.style.transform = '';
        randomEl.style.textShadow = '';
      }, 100);
    }
  }
  
  // 每 3-8 秒隨機觸發故障效果
  setInterval(randomGlitch, Math.random() * 5000 + 3000);

  // 8. 打字機效果
  const subtitles = document.querySelectorAll('.hero-subtitle');
  subtitles.forEach(el => {
    el.classList.add('typewriter');
  });

  // 9. 滾動時的霓虹閃爍
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (Math.abs(currentScroll - lastScroll) > 50) {
      document.body.style.filter = 'hue-rotate(10deg)';
      setTimeout(() => {
        document.body.style.filter = '';
      }, 100);
    }
    
    lastScroll = currentScroll;
  });

  // 10. 頁面載入動畫
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
    
    // 載入完成後的故障效果
    document.body.style.animation = 'glitch 0.3s';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 300);
  }, 100);

  // 11. 音效提示 (hover 時的視覺反饋)
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.filter = 'brightness(1.2)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.filter = '';
    });
  });

  console.log('%c🌆 CYBERPUNK MODE ACTIVATED 🌆', 
    'color: #05d9e8; font-size: 20px; text-shadow: 0 0 10px #05d9e8;');
});
