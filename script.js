// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加测试表单提交事件监听器
    const testForm = document.getElementById('petTestForm');
    if (testForm) {
        testForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleTestSubmission();
        });
    }
    
    // 添加话题表单提交事件监听器
    const topicForm = document.getElementById('topicForm');
    if (topicForm) {
        topicForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleTopicSubmission();
        });
    }
    
    // 初始化进度条
    updateProgress(1);
    
    // 初始化社区
    initializeCommunity();
    
    // 初始化轮播
    initializeCarousel();
    
    // 添加图片预览功能
    const imageInput = document.getElementById('topicImage');
    if (imageInput) {
        imageInput.addEventListener('change', handleImagePreview);
    }
});

// ==================== 页面交互功能 ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==================== 登录注册功能 ====================
function showAuthModal(type) {
    const modal = document.getElementById('authModal');
    modal.classList.add('active');
    
    if (type === 'login') {
        switchAuthTab('login');
    } else if (type === 'register') {
        switchAuthTab('register');
    }
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAuthModal();
        }
    });
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
}

function switchAuthTab(type) {
    // 更新标签页状态
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.remove('active'));
    
    if (type === 'login') {
        tabs[0].classList.add('active');
        forms[0].classList.add('active');
    } else {
        tabs[1].classList.add('active');
        forms[1].classList.add('active');
    }
}

function sendCode(type) {
    const phoneInput = type === 'login' ? 'loginPhone' : 'registerPhone';
    const phone = document.getElementById(phoneInput).value;
    
    if (!phone) {
        alert('请先输入手机号');
        return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        alert('请输入正确的手机号');
        return;
    }
    
    // 模拟发送验证码
    const button = event.target;
    let countdown = 60;
    button.disabled = true;
    button.textContent = `${countdown}秒后重试`;
    
    const timer = setInterval(() => {
        countdown--;
        button.textContent = `${countdown}秒后重试`;
        
        if (countdown <= 0) {
            clearInterval(timer);
            button.disabled = false;
            button.textContent = '获取验证码';
        }
    }, 1000);
    
    alert(`验证码已发送到 ${phone}，请注意查收`);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加测试表单提交事件监听器
    const testForm = document.getElementById('petTestForm');
    if (testForm) {
        testForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleTestSubmission();
        });
    }
    
    // 添加话题表单提交事件监听器
    const topicForm = document.getElementById('topicForm');
    if (topicForm) {
        testForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleTopicSubmission();
        });
    }
    
    // 添加登录表单提交事件监听器
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleLogin();
        });
    }
    
    // 添加注册表单提交事件监听器
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleRegister();
        });
    }
    
    // 初始化进度条
    updateProgress(1);
    
    // 初始化社区
    initializeCommunity();
    
    // 初始化轮播
    initializeCarousel();
    
    // 添加图片预览功能
    const imageInput = document.getElementById('topicImage');
    if (imageInput) {
        imageInput.addEventListener('change', handleImagePreview);
    }
});

function handleLogin() {
    const phone = document.getElementById('loginPhone').value;
    const code = document.getElementById('loginCode').value;
    
    if (!phone || !code) {
        alert('请填写完整信息');
        return;
    }
    
    // 模拟登录验证
    if (code === '1234') { // 测试验证码
        alert('登录成功！');
        closeAuthModal();
        // 更新导航栏显示用户信息
        updateUserStatus(phone);
    } else {
        alert('验证码错误，请重新输入');
    }
}

function handleRegister() {
    const phone = document.getElementById('registerPhone').value;
    const code = document.getElementById('registerCode').value;
    const password = document.getElementById('registerPassword').value;
    
    if (!phone || !code || !password) {
        alert('请填写完整信息');
        return;
    }
    
    if (password.length < 6 || password.length > 20) {
        alert('密码长度应为6-20位');
        return;
    }
    
    // 模拟注册验证
    if (code === '1234') { // 测试验证码
        alert('注册成功！');
        closeAuthModal();
        // 自动登录
        updateUserStatus(phone);
    } else {
        alert('验证码错误，请重新输入');
    }
}

function updateUserStatus(phone) {
    const navActions = document.querySelector('.nav-actions');
    navActions.innerHTML = `
        <span class="user-info">👤 ${phone}</span>
        <button class="btn-outline" onclick="logout()">退出登录</button>
    `;
}

function logout() {
    const navActions = document.querySelector('.nav-actions');
    navActions.innerHTML = `
        <button class="btn-secondary" onclick="showAuthModal('login')">登录</button>
        <button class="btn-primary" onclick="showAuthModal('register')">注册</button>
    `;
    alert('已退出登录');
}

// ==================== 轮播功能 ====================
let currentSlide = 0;
let carouselInterval;

function initializeCarousel() {
    // 自动播放轮播
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 4000);
    
    // 鼠标悬停时暂停自动播放
    const carousel = document.querySelector('.pet-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(() => {
                moveCarousel(1);
            }, 4000);
        });
    }
}

function moveCarousel(direction) {
    const track = document.querySelector('.carousel-track');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = 5;
    
    if (direction === 1) {
        currentSlide = (currentSlide + 1) % totalSlides;
    } else {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // 更新指示器
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const track = document.querySelector('.carousel-track');
    const indicators = document.querySelectorAll('.indicator');
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// ==================== 测试功能 ====================
let currentQuestion = 1;
const totalQuestions = 8;

function updateProgress(questionNum) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill && progressText) {
        const percentage = (questionNum / totalQuestions) * 100;
        progressFill.style.width = percentage + '%';
        progressText.textContent = `问题 ${questionNum} / ${totalQuestions}`;
    }
}

function showQuestion(questionNum) {
    // 隐藏所有问题
    for (let i = 1; i <= totalQuestions; i++) {
        const question = document.getElementById(`question${i}`);
        if (question) {
            question.style.display = 'none';
        }
    }
    
    // 显示指定问题
    const currentQ = document.getElementById(`question${questionNum}`);
    if (currentQ) {
        currentQ.style.display = 'block';
        currentQ.style.animation = 'fadeInUp 0.5s ease-out';
    }
    
    // 更新进度条
    updateProgress(questionNum);
}

function nextQuestion(currentQ) {
    if (currentQ < totalQuestions) {
        showQuestion(currentQ + 1);
    }
}

function prevQuestion(currentQ) {
    if (currentQ > 1) {
        showQuestion(currentQ - 1);
    }
}

// 宠物数据库
const petDatabase = {
    dog: {
        name: '狗狗',
        description: '忠诚、活泼、需要较多陪伴和运动',
        breeds: ['金毛寻回犬', '拉布拉多', '哈士奇', '泰迪', '比熊'],
        image: '🐕',
        care: '需要定期运动、训练和社交',
        cost: '每月约300-800元',
        space: '需要较大活动空间'
    },
    cat: {
        name: '猫咪',
        description: '独立、优雅、适合忙碌的主人',
        breeds: ['英短', '美短', '波斯猫', '暹罗猫', '布偶猫'],
        image: '🐱',
        care: '需要猫砂、抓板、定期梳理',
        cost: '每月约200-500元',
        space: '适合小户型'
    },
    rabbit: {
        name: '兔子',
        description: '安静、可爱、适合安静的环境',
        breeds: ['荷兰垂耳兔', '安哥拉兔', '狮子兔', '垂耳兔'],
        image: '🐰',
        care: '需要草料、清洁环境、温度控制',
        cost: '每月约100-300元',
        space: '需要通风良好的空间'
    },
    bird: {
        name: '鸟类',
        description: '聪明、会唱歌、互动性强',
        breeds: ['鹦鹉', '金丝雀', '画眉', '八哥', '鸽子'],
        image: '🦜',
        care: '需要笼子清洁、营养均衡、定期放飞',
        cost: '每月约150-400元',
        space: '适合任何大小的空间'
    }
};

// 评分系统
const scoringSystem = {
    weeklyTime: { 1: 1, 2: 2, 3: 3, 4: 4 },
    companionshipTime: { 1: 1, 2: 2, 3: 3, 4: 4 },
    stressLevel: { 1: 4, 2: 3, 3: 2, 4: 1 },
    budget: { 1: 1, 2: 2, 3: 3, 4: 4 },
    cleanliness: { 1: 4, 2: 3, 3: 2, 4: 1 },
    livingSpace: { 1: 1, 2: 2, 3: 3, 4: 4 },
    familyMembers: { 1: 2, 2: 3, 3: 4, 4: 1 },
    petExperience: { 1: 1, 2: 2, 3: 3, 4: 4 }
};

function handleTestSubmission() {
    const formData = {
        weeklyTime: document.getElementById('weeklyTime').value,
        companionshipTime: document.getElementById('companionshipTime').value,
        stressLevel: document.getElementById('stressLevel').value,
        budget: document.getElementById('budget').value,
        cleanliness: document.getElementById('cleanliness').value,
        livingSpace: document.getElementById('livingSpace').value,
        familyMembers: document.getElementById('familyMembers').value,
        petExperience: document.getElementById('petExperience').value
    };
    
    // 检查是否所有问题都已回答
    for (let key in formData) {
        if (!formData[key]) {
            alert('请回答所有问题！');
            return;
        }
    }
    
    const score = calculateScore(formData);
    const recommendedPet = matchPet(score);
    showResults(recommendedPet, score);
}

function calculateScore(formData) {
    let totalScore = 0;
    for (let key in formData) {
        totalScore += scoringSystem[key][formData[key]];
    }
    return totalScore;
}

function matchPet(score) {
    if (score <= 12) return 'rabbit';
    if (score <= 18) return 'cat';
    if (score <= 24) return 'bird';
    return 'dog';
}

function showResults(petType, score) {
    const pet = petDatabase[petType];
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');
    
    if (resultSection && resultContent) {
        resultContent.innerHTML = `
            <div class="result-card">
                <div class="pet-icon">${pet.image}</div>
                <h3>推荐宠物：${pet.name}</h3>
                <p class="pet-description">${pet.description}</p>
                <div class="pet-details">
                    <div class="detail-item">
                        <span class="detail-label">推荐品种：</span>
                        <span class="detail-value">${pet.breeds.join('、')}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">养护要点：</span>
                        <span class="detail-value">${pet.care}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">月均开销：</span>
                        <span class="detail-value">${pet.cost}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">空间要求：</span>
                        <span class="detail-value">${pet.space}</span>
                    </div>
                </div>
                <div class="score-info">
                    <p>你的匹配度评分：<span class="score">${score}</span> / 32</p>
                </div>
            </div>
        `;
        
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function restartTest() {
    // 重置所有选择
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.value = '';
    });
    
    // 显示第一个问题
    showQuestion(1);
    
    // 隐藏结果
    const resultSection = document.getElementById('resultSection');
    if (resultSection) {
        resultSection.style.display = 'none';
    }
}

// ==================== 宠物聊天社区功能 ====================
let communityTopics = [
    {
        id: 1,
        title: "我家金毛的日常训练心得",
        content: "分享一下训练金毛的经验，从基础指令到高级技能，希望对新手有帮助！",
        category: "training",
        author: "金毛爸爸",
        timestamp: "2024-01-15 14:30",
        likes: 45,
        comments: [
            { author: "新手铲屎官", text: "太有用了！请问训练时有什么注意事项吗？" },
            { author: "狗狗训练师", text: "训练方法很专业，建议加入一些游戏元素。" }
        ],
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        title: "猫咪绝育后的护理经验",
        content: "刚带我家小橘做了绝育手术，分享一下术后的护理要点和注意事项。",
        category: "health",
        author: "橘猫妈妈",
        timestamp: "2024-01-14 16:20",
        likes: 32,
        comments: [
            { author: "兽医助理", text: "护理方法很到位，记得按时吃药。" },
            { author: "猫咪爱好者", text: "感谢分享，正好我家猫也要做手术了。" }
        ],
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        title: "兔子的饮食搭配建议",
        content: "养兔子三年了，总结了一些饮食搭配的经验，让兔子更健康快乐！",
        category: "care",
        author: "兔兔专家",
        timestamp: "2024-01-13 10:15",
        likes: 28,
        comments: [
            { author: "新手兔妈", text: "请问兔子可以吃哪些蔬菜水果？" },
            { author: "资深兔友", text: "胡萝卜要适量，建议多给草料。" }
        ],
        image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4bde6?w=400&h=300&fit=crop"
    }
];

let filteredTopics = [...communityTopics];

function initializeCommunity() {
    displayTopics();
}

function handleTopicSubmission() {
    const title = document.getElementById('topicTitle').value.trim();
    const content = document.getElementById('topicContent').value.trim();
    const category = document.getElementById('topicCategory').value;
    const imageFile = document.getElementById('topicImage').files[0];
    
    if (!title || !content || !category) {
        alert('请填写完整信息！');
        return;
    }
    
    const newTopic = {
        id: Date.now(),
        title: title,
        content: content,
        category: category,
        author: `用户${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toLocaleString('zh-CN'),
        likes: 0,
        comments: [],
        image: null
    };
    
    // 处理图片上传
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newTopic.image = e.target.result;
            addTopic(newTopic);
        };
        reader.readAsDataURL(imageFile);
    } else {
        addTopic(newTopic);
    }
}

function addTopic(topic) {
    communityTopics.unshift(topic);
    filteredTopics = [...communityTopics];
    displayTopics();
    
    // 重置表单
    document.getElementById('topicForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
    
    alert('话题发布成功！');
}

function displayTopics() {
    const container = document.getElementById('topicsContainer');
    if (!container) return;
    
    container.innerHTML = filteredTopics.map(topic => createTopicCard(topic)).join('');
}

function createTopicCard(topic) {
    const imageHtml = topic.image ? `<img src="${topic.image}" alt="话题图片" class="topic-image">` : '';
    
    return `
        <div class="topic-card" data-id="${topic.id}">
            <div class="topic-header">
                <h4 class="topic-title">${topic.title}</h4>
                <span class="topic-category">${getCategoryText(topic.category)}</span>
            </div>
            <div class="topic-content">${topic.content}</div>
            ${imageHtml}
            <div class="topic-footer">
                <div class="topic-meta">
                    <div class="topic-author">
                        <div class="author-avatar">${topic.author.charAt(0)}</div>
                        <span>${topic.author}</span>
                    </div>
                    <span>${topic.timestamp}</span>
                    <span>❤️ ${topic.likes}</span>
                    <span>💬 ${topic.comments.length}</span>
                </div>
                <div class="topic-actions">
                    <button class="action-btn" onclick="toggleLike(${topic.id})">
                        ❤️ 点赞
                    </button>
                    <button class="action-btn" onclick="toggleComments(${topic.id})">
                        💬 评论 (${topic.comments.length})
                    </button>
                </div>
            </div>
            <div class="comments-section" id="comments-${topic.id}" style="display: none;">
                <div class="comment-form">
                    <input type="text" class="comment-input" id="comment-input-${topic.id}" placeholder="写下你的评论...">
                    <button class="comment-btn" onclick="addComment(${topic.id})">发送</button>
                </div>
                <div class="comments-list" id="comments-list-${topic.id}">
                    ${topic.comments.map(comment => `
                        <div class="comment-item">
                            <div class="comment-author">${comment.author}</div>
                            <div class="comment-text">${comment.text}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function getCategoryText(category) {
    const categories = {
        'daily': '日常分享',
        'care': '养护经验',
        'training': '训练技巧',
        'health': '健康医疗',
        'funny': '趣事分享'
    };
    return categories[category] || category;
}

function toggleLike(topicId) {
    const topic = communityTopics.find(t => t.id === topicId);
    if (topic) {
        topic.likes++;
        filteredTopics = [...communityTopics];
        displayTopics();
    }
}

function toggleComments(topicId) {
    const commentsSection = document.getElementById(`comments-${topicId}`);
    if (commentsSection) {
        const isVisible = commentsSection.style.display !== 'none';
        commentsSection.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            // 聚焦到评论输入框
            const commentInput = document.getElementById(`comment-input-${topicId}`);
            if (commentInput) {
                commentInput.focus();
            }
        }
    }
}

function addComment(topicId) {
    const commentInput = document.getElementById(`comment-input-${topicId}`);
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('请输入评论内容！');
        return;
    }
    
    const topic = communityTopics.find(t => t.id === topicId);
    if (topic) {
        topic.comments.push({
            author: `用户${Math.floor(Math.random() * 1000)}`,
            text: commentText
        });
        
        filteredTopics = [...communityTopics];
        displayTopics();
        
        // 清空输入框
        commentInput.value = '';
        
        // 确保评论区域可见
        const commentsSection = document.getElementById(`comments-${topicId}`);
        if (commentsSection) {
            commentsSection.style.display = 'block';
        }
    }
}

function handleImagePreview(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="预览图片" style="max-width: 200px; max-height: 150px; border-radius: 10px;">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

// ==================== 话题筛选和排序功能 ====================
function filterTopics() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    if (categoryFilter === 'all') {
        filteredTopics = [...communityTopics];
    } else {
        filteredTopics = communityTopics.filter(topic => topic.category === categoryFilter);
    }
    
    // 应用当前排序
    sortTopics();
}

function sortTopics() {
    const sortOrder = document.getElementById('sortOrder').value;
    
    switch (sortOrder) {
        case 'hot':
            // 热度排序：点赞数 + 评论数 + 时间权重
            filteredTopics.sort((a, b) => {
                const aScore = a.likes * 2 + a.comments.length * 3 + getTimeWeight(a.timestamp);
                const bScore = b.likes * 2 + b.comments.length * 3 + getTimeWeight(b.timestamp);
                return bScore - aScore;
            });
            break;
        case 'latest':
            // 最新发布
            filteredTopics.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            break;
        case 'mostLiked':
            // 点赞最多
            filteredTopics.sort((a, b) => b.likes - a.likes);
            break;
        case 'mostCommented':
            // 评论最多
            filteredTopics.sort((a, b) => b.comments.length - a.comments.length);
            break;
    }
    
    displayTopics();
}

function getTimeWeight(timestamp) {
    const now = new Date();
    const postTime = new Date(timestamp);
    const hoursDiff = (now - postTime) / (1000 * 60 * 60);
    
    // 24小时内权重最高，随时间递减
    if (hoursDiff <= 24) return 100;
    if (hoursDiff <= 72) return 50;
    if (hoursDiff <= 168) return 25;
    return 10;
}
