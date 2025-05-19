// تأثير Parallax للخلفية في صفحة المعرض
document.addEventListener('DOMContentLoaded', function() {
    console.log("Gallery Parallax Script Loaded");

    const parallaxContainer = document.querySelector('.gallery-parallax-container');
    const parallaxItems = document.querySelectorAll('.gallery-parallax-item');
    const galleryGrid = document.querySelector('.gallery-grid');

    console.log("Parallax Container:", parallaxContainer);
    console.log("Parallax Items:", parallaxItems.length);
    console.log("Gallery Grid:", galleryGrid);

    if (!parallaxContainer || !galleryGrid) {
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

            const itemX = moveX * speed;
            const itemY = moveY * speed;

            // تطبيق التحويل مع تأثير الدوران
            item.style.transform = `translate(${itemX}px, ${itemY}px) rotate(${rotation + moveX * 0.05}deg)`;
        });
    });

    // تأثير التفاعل مع عناصر المعرض
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // تحريك العناصر القريبة من العنصر الذي تم التحويم عليه
            const itemRect = item.getBoundingClientRect();
            const itemCenterX = itemRect.left + itemRect.width / 2;
            const itemCenterY = itemRect.top + itemRect.height / 2;

            parallaxItems.forEach(parallaxItem => {
                const parallaxRect = parallaxItem.getBoundingClientRect();
                const parallaxCenterX = parallaxRect.left + parallaxRect.width / 2;
                const parallaxCenterY = parallaxRect.top + parallaxRect.height / 2;

                // حساب المسافة بين العنصر وعنصر الخلفية
                const distance = Math.sqrt(
                    Math.pow(itemCenterX - parallaxCenterX, 2) +
                    Math.pow(itemCenterY - parallaxCenterY, 2)
                );

                // تطبيق تأثير التفاعل إذا كانت المسافة قريبة
                if (distance < 300) {
                    const moveAwayX = (parallaxCenterX - itemCenterX) / 10;
                    const moveAwayY = (parallaxCenterY - itemCenterY) / 10;

                    const currentTransform = parallaxItem.style.transform;
                    if (currentTransform.includes('translate')) {
                        const translatePart = currentTransform.split('translate')[1].split(')')[0];
                        const rotatePart = currentTransform.includes('rotate') ?
                            currentTransform.split('rotate')[1] : '(0deg)';

                        const translateValues = translatePart.replace('(', '').split(',');
                        const translateX = parseFloat(translateValues[0]);
                        const translateY = parseFloat(translateValues[1]);

                        parallaxItem.style.transform = `translate(${translateX + moveAwayX}px, ${translateY + moveAwayY}px) rotate${rotatePart}`;
                    }
                }
            });
        });
    });

    // تأثير التمويج عند التمرير
    let lastScrollY = window.scrollY;
    let scrollDirection = 0;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
        lastScrollY = currentScrollY;

        parallaxItems.forEach((item, index) => {
            const speed = parseFloat(item.getAttribute('data-scroll-speed') || 0.1);
            const waveSpeed = parseFloat(item.getAttribute('data-wave-speed') || 0.02);
            const currentTransform = item.style.transform;

            // إضافة تأثير التمويج إلى التحويل الحالي
            if (currentTransform.includes('translate')) {
                const translatePart = currentTransform.split('translate')[1].split(')')[0];
                const rotatePart = currentTransform.includes('rotate') ?
                    currentTransform.split('rotate')[1] : '(0deg)';

                const translateValues = translatePart.replace('(', '').split(',');
                const translateX = parseFloat(translateValues[0]);
                const translateY = parseFloat(translateValues[1]);

                // إضافة تأثير التمويج
                const waveOffset = Math.sin(currentScrollY * waveSpeed) * 10;

                item.style.transform = `translate(${translateX + waveOffset * scrollDirection}px, ${translateY + currentScrollY * speed}px) rotate${rotatePart}`;
            }
        });
    });
});
