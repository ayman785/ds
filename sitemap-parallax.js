document.addEventListener('DOMContentLoaded', function() {
    // إنشاء عناصر الخلفية المتحركة لقسم العنوان
    createHeroParallaxElements();
    
    // إنشاء عناصر الخلفية المتحركة لقسم المحتوى الرئيسي
    createMainParallaxElements();
    
    // إنشاء عناصر الخلفية المتحركة لقسم الهيكل التنظيمي
    createVisualParallaxElements();
    
    // تطبيق تأثير التحرك عند تحريك الماوس
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // تحريك عناصر قسم العنوان
        const heroItems = document.querySelectorAll('.sitemap-hero-parallax-item');
        moveElements(heroItems, mouseX, mouseY, windowWidth, windowHeight, 0.03);
        
        // تحريك عناصر قسم المحتوى الرئيسي
        const mainItems = document.querySelectorAll('.sitemap-parallax-item');
        moveElements(mainItems, mouseX, mouseY, windowWidth, windowHeight, 0.05);
        
        // تحريك عناصر قسم الهيكل التنظيمي
        const visualItems = document.querySelectorAll('.sitemap-visual-parallax-item');
        moveElements(visualItems, mouseX, mouseY, windowWidth, windowHeight, 0.02);
    });
});

// دالة مساعدة لتحريك العناصر
function moveElements(items, mouseX, mouseY, windowWidth, windowHeight, baseSpeed) {
    items.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-speed')) || baseSpeed;
        
        const moveX = (mouseX - windowWidth / 2) * speed;
        const moveY = (mouseY - windowHeight / 2) * speed;
        
        // الحفاظ على التأثير الحالي مع إضافة تأثير الحركة
        const currentTransform = item.style.transform || '';
        const newTransform = currentTransform.replace(/translate\([^)]*\)/, '');
        
        item.style.transform = `translate(${moveX}px, ${moveY}px) ${newTransform}`;
    });
}

// إنشاء عناصر الخلفية المتحركة لقسم العنوان
function createHeroParallaxElements() {
    const heroSection = document.querySelector('.about-hero');
    if (!heroSection) return;
    
    // إنشاء حاوية للعناصر المتحركة
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'sitemap-hero-parallax';
    heroSection.prepend(parallaxContainer);
    
    // إضافة عناصر متحركة تمثل رموز خريطة الموقع
    const icons = [
        { icon: 'fa-sitemap', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-link', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-map', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-home', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-hospital', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-stethoscope', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-images', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-envelope', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-calendar-check', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-star', color: 'rgba(255, 255, 255, 0.1)' }
    ];
    
    // إنشاء 10 عنصر متحرك بشكل عشوائي
    for (let i = 0; i < 10; i++) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const item = document.createElement('div');
        item.className = 'sitemap-hero-parallax-item';
        
        // تعيين خصائص عشوائية للحركة
        const speed = (Math.random() * 0.03) + 0.01;
        const delay = Math.random() * 5;
        
        item.setAttribute('data-speed', speed.toFixed(2));
        item.style.animationDelay = `${delay}s`;
        
        // تعيين موقع عشوائي
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        item.style.left = `${left}%`;
        item.style.top = `${top}%`;
        
        // إضافة الأيقونة
        const icon = document.createElement('i');
        icon.className = `fas ${randomIcon.icon}`;
        icon.style.color = randomIcon.color;
        icon.style.fontSize = `${Math.random() * 2 + 2}rem`;
        
        item.appendChild(icon);
        parallaxContainer.appendChild(item);
    }
}

// إنشاء عناصر الخلفية المتحركة لقسم المحتوى الرئيسي
function createMainParallaxElements() {
    const mainSection = document.querySelector('.sitemap-section-main');
    if (!mainSection) return;
    
    // إنشاء حاوية للعناصر المتحركة
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'sitemap-parallax-container';
    mainSection.prepend(parallaxContainer);
    
    // إضافة عناصر متحركة تمثل رموز خريطة الموقع
    const icons = [
        { icon: 'fa-sitemap', color: 'rgba(0, 119, 182, 0.1)' },
        { icon: 'fa-link', color: 'rgba(0, 180, 216, 0.1)' },
        { icon: 'fa-map', color: 'rgba(72, 202, 228, 0.1)' },
        { icon: 'fa-home', color: 'rgba(0, 119, 182, 0.1)' },
        { icon: 'fa-hospital', color: 'rgba(0, 180, 216, 0.1)' },
        { icon: 'fa-stethoscope', color: 'rgba(72, 202, 228, 0.1)' },
        { icon: 'fa-images', color: 'rgba(0, 119, 182, 0.1)' },
        { icon: 'fa-envelope', color: 'rgba(0, 180, 216, 0.1)' },
        { icon: 'fa-calendar-check', color: 'rgba(72, 202, 228, 0.1)' },
        { icon: 'fa-star', color: 'rgba(0, 119, 182, 0.1)' }
    ];
    
    // إنشاء 15 عنصر متحرك بشكل عشوائي
    for (let i = 0; i < 15; i++) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const item = document.createElement('div');
        item.className = 'sitemap-parallax-item';
        
        // تعيين خصائص عشوائية للحركة
        const speed = (Math.random() * 0.05) + 0.01;
        const delay = Math.random() * 5;
        
        item.setAttribute('data-speed', speed.toFixed(2));
        item.style.animationDelay = `${delay}s`;
        
        // تعيين موقع عشوائي
        const left = Math.random() * 100;
        const top = Math.random() * 300;
        
        item.style.left = `${left}%`;
        item.style.top = `${top}px`;
        
        // إضافة الأيقونة
        const icon = document.createElement('i');
        icon.className = `fas ${randomIcon.icon}`;
        icon.style.color = randomIcon.color;
        icon.style.fontSize = `${Math.random() * 3 + 2}rem`;
        
        item.appendChild(icon);
        parallaxContainer.appendChild(item);
    }
}

// إنشاء عناصر الخلفية المتحركة لقسم الهيكل التنظيمي
function createVisualParallaxElements() {
    const visualSection = document.querySelector('.sitemap-visual');
    if (!visualSection) return;
    
    // إنشاء حاوية للعناصر المتحركة
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'sitemap-visual-parallax';
    visualSection.prepend(parallaxContainer);
    
    // إضافة عناصر متحركة تمثل رموز خريطة الموقع
    const icons = [
        { icon: 'fa-sitemap', color: 'rgba(0, 119, 182, 0.1)' },
        { icon: 'fa-link', color: 'rgba(0, 180, 216, 0.1)' },
        { icon: 'fa-map', color: 'rgba(72, 202, 228, 0.1)' },
        { icon: 'fa-home', color: 'rgba(0, 119, 182, 0.1)' },
        { icon: 'fa-hospital', color: 'rgba(0, 180, 216, 0.1)' }
    ];
    
    // إنشاء 8 عنصر متحرك بشكل عشوائي
    for (let i = 0; i < 8; i++) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const item = document.createElement('div');
        item.className = 'sitemap-visual-parallax-item';
        
        // تعيين خصائص عشوائية للحركة
        const speed = (Math.random() * 0.02) + 0.01;
        const delay = Math.random() * 5;
        
        item.setAttribute('data-speed', speed.toFixed(2));
        item.style.animationDelay = `${delay}s`;
        
        // تعيين موقع عشوائي
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        item.style.left = `${left}%`;
        item.style.top = `${top}%`;
        
        // إضافة الأيقونة
        const icon = document.createElement('i');
        icon.className = `fas ${randomIcon.icon}`;
        icon.style.color = randomIcon.color;
        icon.style.fontSize = `${Math.random() * 2 + 2}rem`;
        
        item.appendChild(icon);
        parallaxContainer.appendChild(item);
    }
}
