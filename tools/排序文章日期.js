const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'source', '_posts');

// 系列日期配置
const seriesConfig = {
  'C++ 基礎教學': {
    startDate: new Date('2022-09-02'),
    pattern: /^2025-12-25-day(\d+)/
  },
  'Flutter 30天': {
    startDate: new Date('2023-09-09'),
    pattern: /無職轉生.*day(\d+)/i
  },
  '雲端資安': {
    startDate: new Date('2024-08-11'),
    pattern: /開局地端紅隊.*day(\d+)/i
  }
};

// 讀取所有文章
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 檢查屬於哪個系列
  for (const [series, config] of Object.entries(seriesConfig)) {
    const match = file.match(config.pattern);
    if (match) {
      const dayNum = parseInt(match[1]);
      
      // 計算新日期
      const newDate = new Date(config.startDate);
      newDate.setDate(newDate.getDate() + dayNum - 1);
      
      const dateStr = newDate.toISOString().split('T')[0];
      const timeStr = String(dayNum).padStart(2, '0') + ':00:00';
      const fullDate = `${dateStr} ${timeStr}`;
      
      // 替換 front-matter 中的日期
      content = content.replace(
        /^(---[\s\S]*?date:\s*).+$/m,
        `$1${fullDate}`
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`${series} Day ${dayNum}: ${fullDate}`);
      break;
    }
  }
});

console.log('\n日期更新完成！');
