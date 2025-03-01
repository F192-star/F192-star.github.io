// 随机飘落小爱心
function createFallingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}%;
            font-size: ${20 + Math.random() * 20}px;
            animation: fall ${5 + Math.random() * 5}s linear infinite;
            opacity: ${0.5 + Math.random() * 0.5};
        `;
        document.body.appendChild(heart);
        
        // 移除动画结束的元素
        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

// 定义飘落动画
const style = document.createElement('style');
style.textContent = `
@keyframes fall {
    to { transform: translateY(100vh) rotate(360deg); }
}`;
document.head.appendChild(style);

// 启动特效
createFallingHearts();

// 按钮悬浮弹性效果
document.querySelectorAll('.cute-button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'rotate(2deg) scale(1.05)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'none';
    });
});
