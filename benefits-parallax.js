document.addEventListener('DOMContentLoaded', function() {
    // إنشاء عناصر الخلفية المتحركة لقسم المحتوى
    createParallaxElements();

    // إنشاء عناصر الخلفية المتحركة لقسم العنوان
    createHeroParallaxElements();

    // تطبيق تأثير التحرك عند تحريك الماوس
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // تحريك عناصر قسم المحتوى
        const contentItems = document.querySelectorAll('.benefits-parallax-item');
        contentItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed')) || 0.05;

            const moveX = (mouseX - windowWidth / 2) * speed;
            const moveY = (mouseY - windowHeight / 2) * speed;

            item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        // تحريك عناصر قسم العنوان
        const heroItems = document.querySelectorAll('.benefits-hero-parallax-item');
        heroItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed')) || 0.03;

            const moveX = (mouseX - windowWidth / 2) * speed;
            const moveY = (mouseY - windowHeight / 2) * speed;

            // الحفاظ على التأثير الحالي مع إضافة تأثير الحركة
            const currentTransform = item.style.transform || '';
            const newTransform = currentTransform.replace(/translate\([^)]*\)/, '');

            item.style.transform = `translate(${moveX}px, ${moveY}px) ${newTransform}`;
        });
    });
});

// إنشاء عناصر الخلفية المتحركة
function createParallaxElements() {
    const container = document.querySelector('.benefits-container');
    if (!container) return;

    // إنشاء حاوية للعناصر المتحركة
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'benefits-parallax-container';
    container.prepend(parallaxContainer);

    // إضافة عناصر متحركة تمثل رموز الفوائد
    const icons = [
        { icon: 'fa-bone', color: 'rgba(0, 119, 182, 0.1)' },
        { icon: 'fa-walking', color: 'rgba(0, 180, 216, 0.1)' },
        { icon: 'fa-brain', color: 'rgba(72, 202, 228, 0.1)' },
        { icon: 'fa-child', color: 'rgba(0, 119, 182, 0.1)' },
        { icon: 'fa-hands', color: 'rgba(0, 180, 216, 0.1)' },
        { icon: 'fa-pump-medical', color: 'rgba(72, 202, 228, 0.1)' },
        { icon: 'fa-syringe', color: 'rgba(0, 119, 182, 0.1)' },
        { icon: 'fa-thumbtack', color: 'rgba(0, 180, 216, 0.1)' },
        { icon: 'fa-users', color: 'rgba(72, 202, 228, 0.1)' },
        { icon: 'fa-star', color: 'rgba(0, 180, 216, 0.1)' },
        { icon: 'fa-check', color: 'rgba(72, 202, 228, 0.1)' },
        { icon: 'fa-heartbeat', color: 'rgba(0, 119, 182, 0.1)' }
    ];

    // إنشاء 20 عنصر متحرك بشكل عشوائي
    for (let i = 0; i < 20; i++) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const item = document.createElement('div');
        item.className = 'benefits-parallax-item';

        // تعيين خصائص عشوائية للحركة
        const speed = (Math.random() * 0.05) + 0.01;

        item.setAttribute('data-speed', speed.toFixed(2));

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

// إنشاء عناصر الخلفية المتحركة لقسم العنوان
function createHeroParallaxElements() {
    const heroSection = document.querySelector('.benefits-hero');
    if (!heroSection) return;

    // إنشاء حاوية للعناصر المتحركة
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'benefits-hero-parallax';
    heroSection.prepend(parallaxContainer);

    // إضافة عناصر متحركة تمثل رموز الفوائد
    const icons = [
        { icon: 'fa-bone', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-walking', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-brain', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-child', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-hands', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-pump-medical', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-syringe', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-thumbtack', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-users', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-star', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-check', color: 'rgba(255, 255, 255, 0.1)' },
        { icon: 'fa-heartbeat', color: 'rgba(255, 255, 255, 0.1)' }
    ];

    // إنشاء 12 عنصر متحرك بشكل عشوائي
    for (let i = 0; i < 12; i++) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const item = document.createElement('div');
        item.className = 'benefits-hero-parallax-item';

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
