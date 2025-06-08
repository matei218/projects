function startTracker() {
  let displayBox;
  const existingBox = document.getElementById('top-products');
  if (existingBox) {
    existingBox.remove();
  }

  const style = document.createElement('style');
  style.textContent = `
    #top-products {
      position: fixed;
      bottom: 20px;
      right: 10px;
      background-color: #fff;
      padding: 15px;
      z-index: 9999;
      width: 100%;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    #top-products .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .product-item {
      padding: 8px;
      margin: 5px 0;
      border-radius: 4px;
      background: #f8f9fa;
      transition: all 0.2s ease;
    }
    .product-item:hover {
      background: #e9ecef;
      transform: translateX(5px);
    }
    .product-item a {
      color: #333;
      text-decoration: none;
      display: block;
    }
    .product-item a:hover {
      color: #007bff;
    }
  `;
  document.head.appendChild(style);

  displayBox = document.createElement('div');
  displayBox.id = 'top-products';
  document.body.appendChild(displayBox);

  function getHoverStats() {
    return JSON.parse(localStorage.getItem('hoverStats') || '{}');
  }

  function saveHoverStats(stats) {
    localStorage.setItem('hoverStats', JSON.stringify(stats));
  }

  const hoverStartTimes = new Map();

  function productCardCheck(event) {
    const el = event.target;
    if (el.hasAttribute('data-product-id')) {
      hoverStartTimes.set(el, Date.now());
    }
  }

  function mostViewedElement(event) {
    const el = event.target;
    if (el.hasAttribute('data-product-id') && hoverStartTimes.has(el)) {
      const productId = el.getAttribute('data-product-id');
      const productName = el.getAttribute('data-name') || 'Unnamed';
      const productUrl = el.getAttribute('data-url') || '#';
      const startTime = hoverStartTimes.get(el);
      const timeSpent = Date.now() - startTime;
      hoverStartTimes.delete(el);

      const stats = getHoverStats();
      if (!stats[productId]) {
        stats[productId] = { time: 0, name: productName, url: productUrl };
      }
      stats[productId].time += timeSpent;
      saveHoverStats(stats);
      updateDisplay(stats);
    }
  }

  function updateDisplay(stats) {
    const sorted = Object.entries(stats).sort((a, b) => b[1].time - a[1].time).slice(0, 5);

    let html = '<div class="title">Top Products</div>';
    sorted.forEach(([id, data], i) => {
      const prodName = data.name;
      html += `<div class="product-item"><a href="${data.url}" target="_blank">${i + 1}. ${prodName} (${(data.time / 1000).toFixed(1)}s)</a></div>`;
    });

    displayBox.innerHTML = html;
  }

  function cleanup() {
    document.querySelectorAll('[data-product-id]').forEach(el => {
      el.removeEventListener("mouseenter", productCardCheck);
      el.removeEventListener("mouseleave", mostViewedElement);
    });
    if (displayBox && displayBox.parentNode) {
      displayBox.remove();
    }
    const styleElement = document.querySelector('style');
    if (styleElement) {
      styleElement.remove();
    }
  }

  document.querySelectorAll('[data-product-id]').forEach(el => {
    el.addEventListener("mouseenter", productCardCheck);
    el.addEventListener("mouseleave", mostViewedElement);
  });

  updateDisplay(getHoverStats());

  return {
    cleanup,
    resetStats: () => {
      localStorage.removeItem('hoverStats');
      updateDisplay({});
    }
  };
}

let tracker = startTracker(); 