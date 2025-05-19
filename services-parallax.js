// تأثير Parallax للخلفية في صفحة الخدمات
document.addEventListener('DOMContentLoaded', function() {
    console.log("Services Parallax Script Loaded");
    
    const parallaxContainer = document.querySelector('.services-parallax-container');
    const parallaxItems = document.querySelectorAll('.services-parallax-item');
    
    console.log("Parallax Container:", parallaxContainer);
    console.log("Parallax Items:", parallaxItems.length);
    
    if (!parallaxContainer) {
        console.log("Missing required elements");
        return;
    }
    
    // تحديث موضع العناصر عند تحريك الماوس
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
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
    });
    
    // تأثير التفاعل مع عناصر الخدمات
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(service => {
        service.addEventListener('mouseenter', function() {
            // تحريك العناصر القريبة من الخدمة التي تم التحويم عليها
            const serviceRect = service.getBoundingClientRect();
            const serviceCenterX = serviceRect.left + serviceRect.width / 2;
            const serviceCenterY = serviceRect.top + serviceRect.height / 2;
            
            parallaxItems.forEach(parallaxItem => {
                const parallaxRect = parallaxItem.getBoundingClientRect();
                const parallaxCenterX = parallaxRect.left + parallaxRect.width / 2;
                const parallaxCenterY = parallaxRect.top + parallaxRect.height / 2;
                
                // حساب المسافة بين الخدمة وعنصر الخلفية
                const distance = Math.sqrt(
                    Math.pow(serviceCenterX - parallaxCenterX, 2) + 
                    Math.pow(serviceCenterY - parallaxCenterY, 2)
                );
                
                // تطبيق تأثير التفاعل إذا كانت المسافة قريبة
                if (distance < 500) {
                    const moveAwayX = (parallaxCenterX - serviceCenterX) / 20;
                    const moveAwayY = (parallaxCenterY - serviceCenterY) / 20;
                    const scale = 1 + (500 - distance) / 2000;
                    
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
    
    // تأثير التمويج عند التمرير
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // تأثير التمويج على عناصر الخلفية
        parallaxItems.forEach((item, index) => {
            const waveSpeed = parseFloat(item.getAttribute('data-wave-speed') || 0.02);
            const scrollSpeed = parseFloat(item.getAttribute('data-scroll-speed') || 0.05);
            
            const currentTransform = item.style.transform;
            if (currentTransform.includes('translate')) {
                const translatePart = currentTransform.split('translate')[1].split(')')[0];
                const restOfTransform = currentTransform.split(')')[1];
                
                const translateValues = translatePart.replace('(', '').split(',');
                const translateX = parseFloat(translateValues[0]);
                const translateY = parseFloat(translateValues[1]);
                
                // إضافة تأثير التمويج
                const waveOffset = Math.sin(scrollY * waveSpeed) * 15;
                
                item.style.transform = `translate(${translateX + waveOffset}px, ${translateY + scrollY * scrollSpeed}px)${restOfTransform}`;
            }
        });
        
        // تأثير الظهور التدريجي للخدمات عند التمرير
        serviceItems.forEach(service => {
            const serviceRect = service.getBoundingClientRect();
            const serviceTop = serviceRect.top;
            const windowHeight = window.innerHeight;
            
            if (serviceTop < windowHeight * 0.8) {
                service.classList.add('visible');
            }
        });
    });
    
    // تطبيق التأثير عند تحميل الصفحة
    setTimeout(function() {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});
