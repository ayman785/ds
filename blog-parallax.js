// تأثير Parallax للخلفية في صفحة النصائح الطبية
document.addEventListener('DOMContentLoaded', function() {
    console.log("Blog Parallax Script Loaded");
    
    const parallaxContainer = document.querySelector('.blog-parallax-container');
    const parallaxItems = document.querySelectorAll('.blog-parallax-item');
    
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
    
    // تأثير التفاعل مع عناصر المدونة
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            // تحريك العناصر القريبة من المنشور الذي تم التحويم عليه
            const postRect = post.getBoundingClientRect();
            const postCenterX = postRect.left + postRect.width / 2;
            const postCenterY = postRect.top + postRect.height / 2;
            
            parallaxItems.forEach(parallaxItem => {
                const parallaxRect = parallaxItem.getBoundingClientRect();
                const parallaxCenterX = parallaxRect.left + parallaxRect.width / 2;
                const parallaxCenterY = parallaxRect.top + parallaxRect.height / 2;
                
                // حساب المسافة بين المنشور وعنصر الخلفية
                const distance = Math.sqrt(
                    Math.pow(postCenterX - parallaxCenterX, 2) + 
                    Math.pow(postCenterY - parallaxCenterY, 2)
                );
                
                // تطبيق تأثير التفاعل إذا كانت المسافة قريبة
                if (distance < 500) {
                    const moveAwayX = (parallaxCenterX - postCenterX) / 20;
                    const moveAwayY = (parallaxCenterY - postCenterY) / 20;
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
    
    // تأثير الظهور التدريجي عند التمرير
    const fadeElements = document.querySelectorAll('.blog-post, .sidebar-widget');
    
    // تحقق مما إذا كان العنصر مرئيًا في نافذة العرض
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // تطبيق تأثير الظهور التدريجي على العناصر المرئية
    function handleScrollAnimation() {
        fadeElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('fade-in');
            }
        });
        
        // تأثير التمويج على عناصر الخلفية
        parallaxItems.forEach((item, index) => {
            const scrollY = window.scrollY;
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
    }
    
    // تطبيق التأثير عند التمرير
    window.addEventListener('scroll', handleScrollAnimation);
    
    // تطبيق التأثير عند تحميل الصفحة
    handleScrollAnimation();
});
