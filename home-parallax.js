// تأثير Parallax متقدم للصفحة الرئيسية
document.addEventListener('DOMContentLoaded', function() {
    console.log("Home Parallax Script Loaded");
    
    const parallaxContainer = document.querySelector('.home-parallax-container');
    const parallaxItems = document.querySelectorAll('.home-parallax-item');
    const pulseElements = document.querySelectorAll('.pulse-element');
    
    console.log("Parallax Container:", parallaxContainer);
    console.log("Parallax Items:", parallaxItems.length);
    console.log("Pulse Elements:", pulseElements.length);
    
    if (!parallaxContainer) {
        console.log("Missing required elements");
        return;
    }
    
    // إضافة تأثير النبض للعناصر
    function setupPulseEffect() {
        pulseElements.forEach((element, index) => {
            // تعيين حجم وسرعة مختلفة لكل عنصر
            const scale = 1 + (index % 3) * 0.1;
            const duration = 2 + (index % 4) * 0.5;
            const delay = index * 0.3;
            
            // تطبيق تأثير النبض باستخدام CSS
            element.style.animation = `pulse ${duration}s ${delay}s infinite alternate ease-in-out`;
            element.style.transformOrigin = 'center';
        });
    }
    
    // تأثير تتبع الماوس المتقدم
    function setupMouseTracking() {
        let mouseX = 0;
        let mouseY = 0;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        
        // تحديث أبعاد النافذة عند تغيير الحجم
        window.addEventListener('resize', function() {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        });
        
        // تتبع موضع الماوس
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // تحديث موضع العناصر بناءً على موضع الماوس
        function updateElements() {
            // حساب موضع الماوس النسبي من مركز الشاشة
            const centerX = windowWidth / 2;
            const centerY = windowHeight / 2;
            
            const moveX = (mouseX - centerX) / 15;
            const moveY = (mouseY - centerY) / 15;
            
            // تحريك العناصر بسرعات مختلفة لتحقيق تأثير العمق
            parallaxItems.forEach((item, index) => {
                const speed = parseFloat(item.getAttribute('data-speed'));
                const rotation = parseFloat(item.getAttribute('data-rotation') || 0);
                const scale = parseFloat(item.getAttribute('data-scale') || 1);
                
                const itemX = moveX * speed;
                const itemY = moveY * speed;
                
                // تطبيق التحويل مع تأثير الدوران والحجم
                item.style.transform = `translate(${itemX}px, ${itemY}px) rotate(${rotation + moveX * 0.02}deg) scale(${scale})`;
            });
            
            // طلب الإطار التالي للتحريك
            requestAnimationFrame(updateElements);
        }
        
        // بدء حلقة التحريك
        updateElements();
    }
    
    // تأثير التمويج المتقدم عند التمرير
    function setupScrollWaveEffect() {
        let lastScrollY = window.scrollY;
        let scrollDirection = 0;
        let scrollSpeed = 0;
        let lastScrollTime = Date.now();
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            const currentTime = Date.now();
            
            // حساب اتجاه وسرعة التمرير
            scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
            scrollSpeed = Math.abs(currentScrollY - lastScrollY) / (currentTime - lastScrollTime) * 10;
            scrollSpeed = Math.min(scrollSpeed, 5); // تحديد السرعة القصوى
            
            lastScrollY = currentScrollY;
            lastScrollTime = currentTime;
            
            // تطبيق تأثير التمويج على العناصر
            parallaxItems.forEach((item, index) => {
                const waveSpeed = parseFloat(item.getAttribute('data-wave-speed') || 0.02);
                const scrollFactor = parseFloat(item.getAttribute('data-scroll-speed') || 0.05);
                
                const currentTransform = item.style.transform;
                if (currentTransform.includes('translate')) {
                    const translatePart = currentTransform.split('translate')[1].split(')')[0];
                    const restOfTransform = currentTransform.split(')')[1];
                    
                    const translateValues = translatePart.replace('(', '').split(',');
                    const translateX = parseFloat(translateValues[0]);
                    const translateY = parseFloat(translateValues[1]);
                    
                    // إضافة تأثير التمويج مع مراعاة سرعة التمرير
                    const waveOffset = Math.sin(currentScrollY * waveSpeed) * 15 * scrollSpeed;
                    
                    item.style.transform = `translate(${translateX + waveOffset * scrollDirection}px, ${translateY + currentScrollY * scrollFactor}px)${restOfTransform}`;
                }
            });
        });
    }
    
    // تأثير التفاعل مع العناصر المرئية
    function setupInteractionEffect() {
        const interactiveElements = document.querySelectorAll('.hero-content, .service-card, .about-grid, .testimonial-card, .contact-grid');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                // تحريك العناصر القريبة من العنصر الذي تم التحويم عليه
                const elementRect = element.getBoundingClientRect();
                const elementCenterX = elementRect.left + elementRect.width / 2;
                const elementCenterY = elementRect.top + elementRect.height / 2;
                
                parallaxItems.forEach(parallaxItem => {
                    const parallaxRect = parallaxItem.getBoundingClientRect();
                    const parallaxCenterX = parallaxRect.left + parallaxRect.width / 2;
                    const parallaxCenterY = parallaxRect.top + parallaxRect.height / 2;
                    
                    // حساب المسافة بين العنصر وعنصر الخلفية
                    const distance = Math.sqrt(
                        Math.pow(elementCenterX - parallaxCenterX, 2) + 
                        Math.pow(elementCenterY - parallaxCenterY, 2)
                    );
                    
                    // تطبيق تأثير التفاعل إذا كانت المسافة قريبة
                    if (distance < 500) {
                        const moveAwayX = (parallaxCenterX - elementCenterX) / 10;
                        const moveAwayY = (parallaxCenterY - elementCenterY) / 10;
                        const scale = 1 + (500 - distance) / 1000;
                        
                        const currentTransform = parallaxItem.style.transform;
                        if (currentTransform.includes('translate')) {
                            const translatePart = currentTransform.split('translate')[1].split(')')[0];
                            const rotatePart = currentTransform.includes('rotate') ? 
                                currentTransform.split('rotate')[1].split(')')[0] + 'deg' : '0deg';
                            
                            const translateValues = translatePart.replace('(', '').split(',');
                            const translateX = parseFloat(translateValues[0]);
                            const translateY = parseFloat(translateValues[1]);
                            
                            parallaxItem.style.transform = `translate(${translateX + moveAwayX}px, ${translateY + moveAwayY}px) rotate(${rotatePart}) scale(${scale})`;
                        }
                    }
                });
            });
        });
    }
    
    // تشغيل جميع التأثيرات
    setupPulseEffect();
    setupMouseTracking();
    setupScrollWaveEffect();
    setupInteractionEffect();
});
