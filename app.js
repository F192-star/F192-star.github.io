// Firebase 配置（替换成你的配置）
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 初始化
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// 飘落爱心特效
function createHearts() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}%;
        font-size: ${20 + Math.random() * 30}px;
        opacity: ${0.3 + Math.random() * 0.7};
        animation: fall ${4 + Math.random() * 6}s linear infinite;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHearts, 300);

// 提交留言
document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim() || '神秘小可爱';
    const content = document.getElementById('content').value.trim();

    if (!content) {
        alert('留言内容不能为空哦～');
        return;
    }

    try {
        // 提交到数据库
        await db.collection('comments').add({
            username: username,
            content: content,
            likes: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // 显示成功提示
        const toast = document.getElementById('toast');
        toast.style.display = 'flex';
        toast.classList.remove('toast-hidden');
        setTimeout(() => toast.classList.add('toast-hidden'), 2000);

        // 清空表单
        document.getElementById('content').value = '';
    } catch (error) {
        console.error('提交失败:', error);
        alert('哎呀，发送失败啦～再试一次吧！');
    }
});

// 加载留言
db.collection('comments')
  .orderBy('timestamp', 'desc')
  .onSnapshot(snapshot => {
      const container = document.getElementById('comments');
      container.innerHTML = '';
      
      snapshot.forEach(doc => {
          const data = doc.data();
          const comment = document.createElement('div');
          comment.className = 'comment';
          comment.innerHTML = `
              <h3>${data.username}</h3>
              <p>${data.content}</p>
              <div class="meta">
                  ${data.timestamp?.toDate().toLocaleString()}
                  <span class="likes">❤️ ${data.likes || 0}</span>
              </div>
          `;
          container.appendChild(comment);
      });
  });
