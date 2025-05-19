// تأثيرات متحركة للفوتر
document.addEventListener('DOMContentLoaded', function() {
    console.log("Footer Parallax Script Loaded");
    
    const footerParallaxItems = document.querySelectorAll('.footer-parallax-item');
    
    // تأثير تتبع الماوس للعناصر في الفوتر
    function setupFooterMouseTracking() {
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
        function updateFooterElements() {
            // حساب موضع الماوس النسبي من مركز الشاشة
            const centerX = windowWidth / 2;
            const centerY = windowHeight / 2;
            
            const moveX = (mouseX - centerX) / 25;
            const moveY = (mouseY - centerY) / 25;
            
            // تحريك العناصر بسرعات مختلفة لتحقيق تأثير العمق
            footerParallaxItems.forEach((item, index) => {
                const speed = parseFloat(item.getAttribute('data-speed') || 0.5);
                const rotation = parseFloat(item.getAttribute('data-rotation') || 0);
                const scale = parseFloat(item.getAttribute('data-scale') || 1);
                
                const itemX = moveX * speed;
                const itemY = moveY * speed;
                
                // تطبيق التحويل مع تأثير الدوران والحجم
                item.style.transform = `translate(${itemX}px, ${itemY}px) rotate(${rotation + moveX * 0.02}deg) scale(${scale})`;
            });
            
            // طلب الإطار التالي للتحريك
            requestAnimationFrame(updateFooterElements);
        }
        
        // بدء حلقة التحريك
        updateFooterElements();
    }
    
    // تأثير التمويج عند التمرير
    function setupFooterScrollEffect() {
        let lastScrollY = window.scrollY;
        let scrollDirection = 0;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            // حساب اتجاه التمرير
            scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
            
            lastScrollY = currentScrollY;
            
            // تطبيق تأثير التمويج على العناصر
            footerParallaxItems.forEach((item, index) => {
                const waveSpeed = 0.02;
                const scrollFactor = 0.05;
                
                const currentTransform = item.style.transform;
                if (currentTransform && currentTransform.includes('translate')) {
                    const translatePart = currentTransform.split('translate')[1].split(')')[0];
                    const restOfTransform = currentTransform.split(')')[1] || '';
                    
                    const translateValues = translatePart.replace('(', '').split(',');
                    const translateX = parseFloat(translateValues[0]);
                    const translateY = parseFloat(translateValues[1]);
                    
                    // إضافة تأثير التمويج مع مراعاة اتجاه التمرير
                    const waveOffset = Math.sin(currentScrollY * waveSpeed) * 5;
                    
                    item.style.transform = `translate(${translateX + waveOffset * scrollDirection}px, ${translateY}px)${restOfTransform}`;
                }
            });
        });
    }
    
    // تشغيل التأثيرات إذا كانت العناصر موجودة
    if (footerParallaxItems.length > 0) {
        setupFooterMouseTracking();
        setupFooterScrollEffect();
    }
});
