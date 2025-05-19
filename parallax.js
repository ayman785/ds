// تأثير Parallax للخلفية
document.addEventListener('DOMContentLoaded', function() {
    const parallaxContainer = document.querySelector('.parallax-container');
    const parallaxItems = document.querySelectorAll('.parallax-item');
    
    // تحديث موضع العناصر عند تحريك الماوس
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (mouseX - centerX) / 50;
        const moveY = (mouseY - centerY) / 50;
        
        // تحريك العناصر بسرعات مختلفة لتحقيق تأثير العمق
        parallaxItems.forEach((item, index) => {
            const speed = parseFloat(item.getAttribute('data-speed'));
            const depth = parseFloat(item.getAttribute('data-depth'));
            
            const itemX = moveX * speed;
            const itemY = moveY * speed;
            
            // تطبيق التحويل مع تأثير العمق
            item.style.transform = `translate(${itemX}px, ${itemY}px) scale(${depth})`;
        });
    });
    
    // تحريك الخلفية عند التمرير
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        parallaxItems.forEach((item, index) => {
            const scrollSpeed = parseFloat(item.getAttribute('data-scroll-speed') || 0.1);
            const currentTransform = item.style.transform;
            
            // إضافة تأثير التمرير إلى التحويل الحالي
            if (currentTransform.includes('translate')) {
                const translatePart = currentTransform.split('translate')[1].split(')')[0];
                const scalePart = currentTransform.split('scale')[1];
                
                const translateValues = translatePart.replace('(', '').split(',');
                const translateX = parseFloat(translateValues[0]);
                const translateY = parseFloat(translateValues[1]);
                
                item.style.transform = `translate(${translateX}px, ${translateY + scrollY * scrollSpeed}px) scale${scalePart}`;
            } else {
                item.style.transform = `translateY(${scrollY * scrollSpeed}px) ${currentTransform}`;
            }
        });
    });
});
