// iThome 文章轉 Markdown 書籤工具
// 使用方法：
// 1. 在瀏覽器創建新書籤
// 2. 將下面的代碼複製到書籤的網址欄
// 3. 在 iThome 文章頁面點擊這個書籤
// 4. 自動複製 Markdown 格式到剪貼板

javascript:(function(){
  // 提取標題
  const titleEl = document.querySelector('h2.qa-list__title, h1.qa-header__title, .profile-header__name');
  const title = titleEl ? titleEl.textContent.trim() : '未知標題';
  
  // 提取日期
  const dateEl = document.querySelector('time, .qa-list__info-time');
  const date = dateEl ? dateEl.getAttribute('datetime') || dateEl.textContent.trim() : new Date().toISOString().split('T')[0];
  
  // 提取標籤
  const tagEls = document.querySelectorAll('.tag, .qa-list__tag a');
  const tags = Array.from(tagEls).map(el => el.textContent.trim()).filter(t => t);
  
  // 提取內容
  const contentEl = document.querySelector('.markdown__style, .qa-markdown, article');
  let content = '';
  
  if (contentEl) {
    // 複製內容的 HTML
    const clone = contentEl.cloneNode(true);
    
    // 轉換為 Markdown
    content = clone.innerHTML
      // 代碼塊
      .replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
        const decoded = code
          .replace(/<[^>]*>/g, '')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"');
        return '\n```\n' + decoded + '\n```\n';
      })
      // 標題
      .replace(/<h1[^>]*>(.*?)<\/h1>/g, '\n# $1\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/g, '\n## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/g, '\n### $1\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/g, '\n#### $1\n')
      // 列表
      .replace(/<li[^>]*>(.*?)<\/li>/g, '- $1\n')
      // 連結
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
      // 圖片
      .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)')
      .replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '![]($1)')
      // 粗體斜體
      .replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*')
      // 段落
      .replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n\n')
      .replace(/<br\s*\/?>/g, '\n')
      // 移除其他標籤
      .replace(/<[^>]*>/g, '')
      // HTML 實體
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      // 清理空行
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
  
  // 組合 Markdown
  const markdown = `---
title: ${title}
date: ${date.split('T')[0]}
tags: [${tags.join(', ')}]
categories: 技術文章
source: ${window.location.href}
---

${content}
`;
  
  // 複製到剪貼板
  navigator.clipboard.writeText(markdown).then(() => {
    alert('✅ 已複製 Markdown 格式！\n\n請貼到你的 Hexo 文章文件中。\n\n標題: ' + title);
  }).catch(err => {
    // 降級方案：顯示在彈窗
    const textarea = document.createElement('textarea');
    textarea.value = markdown;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.zIndex = '9999';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('✅ 已複製 Markdown 格式！\n\n請貼到你的 Hexo 文章文件中。');
  });
})();
