/**
 * site-helper.js - 页面提示卡片与关键词徽章生成器
 * 无依赖，通过配置数据生成辅助UI组件
 */
(function() {
  'use strict';

  // 站点基础配置
  var SITE_CONFIG = {
    name: '华体会助手',
    domain: 'home-web-hth.com.cn',
    url: 'https://home-web-hth.com.cn',
    keywords: ['华体会', '体育资讯', '赛事提醒', '安全访问']
  };

  // 提示卡片数据
  var tipCards = [
    {
      id: 'tip-access',
      icon: '🔒',
      title: '访问说明',
      content: '请直接通过浏览器访问 ' + SITE_CONFIG.url + '，确保使用最新版浏览器。',
      level: 'info'
    },
    {
      id: 'tip-keywords',
      icon: '🏷️',
      title: '关键词提示',
      content: '核心关键词：' + SITE_CONFIG.keywords[0] + '，可用于搜索相关内容。',
      level: 'highlight'
    },
    {
      id: 'tip-security',
      icon: '🛡️',
      title: '安全提醒',
      content: '请认准官方域名 ' + SITE_CONFIG.domain + '，谨防仿冒站点。',
      level: 'warning'
    }
  ];

  // 生成徽章 HTML
  function createBadge(text, color) {
    var span = document.createElement('span');
    span.className = 'helper-badge';
    span.textContent = text;
    if (color) {
      span.style.backgroundColor = color;
    } else {
      span.style.backgroundColor = '#4a90d9';
    }
    span.style.color = '#fff';
    span.style.padding = '4px 10px';
    span.style.borderRadius = '12px';
    span.style.fontSize = '0.85em';
    span.style.margin = '4px';
    span.style.display = 'inline-block';
    return span;
  }

  // 创建提示卡片 DOM 节点
  function createTipCard(cardData) {
    var card = document.createElement('div');
    card.className = 'helper-tip-card';
    card.id = cardData.id;
    card.style.border = '1px solid #e0e0e0';
    card.style.borderRadius = '8px';
    card.style.padding = '12px 16px';
    card.style.margin = '10px 0';
    card.style.backgroundColor = '#f9f9f9';
    card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

    // 头部：图标+标题
    var header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.marginBottom = '8px';

    var iconSpan = document.createElement('span');
    iconSpan.textContent = cardData.icon || '💡';
    iconSpan.style.fontSize = '1.4em';
    iconSpan.style.marginRight = '8px';

    var titleSpan = document.createElement('strong');
    titleSpan.textContent = cardData.title;

    header.appendChild(iconSpan);
    header.appendChild(titleSpan);

    // 内容
    var content = document.createElement('p');
    content.textContent = cardData.content;
    content.style.margin = '0';
    content.style.lineHeight = '1.5';
    content.style.color = '#333';

    card.appendChild(header);
    card.appendChild(content);
    return card;
  }

  // 生成关键词徽章区域
  function createKeywordBadgeArea(keywords) {
    var container = document.createElement('div');
    container.className = 'helper-keyword-area';
    container.style.margin = '15px 0';
    container.style.padding = '10px';
    container.style.backgroundColor = '#f0f4ff';
    container.style.borderRadius = '8px';

    var label = document.createElement('span');
    label.textContent = '推荐关键词：';
    label.style.fontWeight = 'bold';
    label.style.marginRight = '8px';
    label.style.color = '#2c3e50';
    container.appendChild(label);

    keywords.forEach(function(kw) {
      var badge = createBadge(kw);
      container.appendChild(badge);
    });

    return container;
  }

  // 将组件挂载到页面指定容器，若无则创建
  function mountHelperUI() {
    var target = document.getElementById('helper-container');
    if (!target) {
      target = document.createElement('div');
      target.id = 'helper-container';
      target.style.maxWidth = '800px';
      target.style.margin = '20px auto';
      target.style.padding = '10px 20px';
      target.style.fontFamily = 'Arial, sans-serif';
      var body = document.body;
      if (body) {
        body.appendChild(target);
      } else {
        // 若 body 尚未加载，等待 DOMContentLoaded
        document.addEventListener('DOMContentLoaded', function() {
          document.body.appendChild(target);
          renderAll(target);
        });
        return;
      }
    }
    renderAll(target);
  }

  function renderAll(container) {
    // 清空
    container.innerHTML = '';

    // 添加提示卡片
    tipCards.forEach(function(card) {
      container.appendChild(createTipCard(card));
    });

    // 添加关键词徽章
    var badgeArea = createKeywordBadgeArea(SITE_CONFIG.keywords);
    container.appendChild(badgeArea);

    // 添加访问链接说明
    var linkNote = document.createElement('div');
    linkNote.style.marginTop = '15px';
    linkNote.style.padding = '10px';
    linkNote.style.border = '1px dashed #bbb';
    linkNote.style.borderRadius = '8px';
    linkNote.style.backgroundColor = '#fffbe6';
    var linkLabel = document.createElement('span');
    linkLabel.textContent = '🔗 访问地址：';
    linkLabel.style.fontWeight = 'bold';
    var linkEl = document.createElement('a');
    linkEl.href = SITE_CONFIG.url;
    linkEl.textContent = SITE_CONFIG.url;
    linkEl.style.color = '#1a73e8';
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
    linkNote.appendChild(linkLabel);
    linkNote.appendChild(linkEl);
    container.appendChild(linkNote);

    // 添加版本脚注
    var footer = document.createElement('div');
    footer.style.marginTop = '20px';
    footer.style.fontSize = '0.75em';
    footer.style.color = '#999';
    footer.textContent = 'site-helper.js · 辅助组件';
    container.appendChild(footer);
  }

  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountHelperUI);
  } else {
    mountHelperUI();
  }

})();