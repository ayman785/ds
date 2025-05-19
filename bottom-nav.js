// إضافة شريط التنقل السفلي للتطبيق المثبت
document.addEventListener('DOMContentLoaded', () => {
    // التحقق مما إذا كان التطبيق مثبتًا أو على جهاز محمول
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // تحقق مما إذا كانت الصفحة الحالية هي الصفحة الرئيسية
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPage === 'index.html' || currentPage === '';

    // إضافة شريط التنقل السفلي فقط إذا لم تكن الصفحة الرئيسية أو إذا كان التطبيق مثبتًا
    if ((isStandalone || (isMobile && !isHomePage))) {
        // إنشاء شريط التنقل السفلي
        const bottomNav = document.createElement('nav');
        bottomNav.className = 'bottom-nav';

        const bottomNavContainer = document.createElement('div');
        bottomNavContainer.className = 'bottom-nav-container';

        // إنشاء عناصر التنقل
        const navItems = [
            { href: 'index.html', icon: 'fa-home', text: 'الرئيسية' },
            { href: 'services.html', icon: 'fa-stethoscope', text: 'خدماتنا' },
            { href: 'appointments.html', icon: 'fa-calendar-check', text: 'حجز موعد' },
            { href: 'contact.html', icon: 'fa-envelope', text: 'اتصل بنا' },
            { href: 'about.html', icon: 'fa-user-md', text: 'عن الدكتور' }
        ];

        // إضافة عناصر التنقل إلى الشريط
        navItems.forEach(item => {
            const navItem = document.createElement('a');
            navItem.href = item.href;
            navItem.className = 'bottom-nav-item';

            // إضافة الفئة النشطة للصفحة الحالية
            if (currentPage === item.href) {
                navItem.classList.add('active');
            }

            const icon = document.createElement('i');
            icon.className = `fas ${item.icon}`;

            const text = document.createElement('span');
            text.textContent = item.text;

            navItem.appendChild(icon);
            navItem.appendChild(text);

            bottomNavContainer.appendChild(navItem);
        });

        bottomNav.appendChild(bottomNavContainer);
        document.body.appendChild(bottomNav);
    }

    // إضافة شريط حالة الاتصال
    const connectionStatus = document.createElement('div');
    connectionStatus.className = 'connection-status';
    connectionStatus.style.display = 'none'; // إخفاء في البداية

    const statusIcon = document.createElement('i');
    statusIcon.className = 'fas';

    const statusText = document.createElement('span');
    statusText.id = 'online-status';

    connectionStatus.appendChild(statusIcon);
    connectionStatus.appendChild(statusText);

    document.body.insertBefore(connectionStatus, document.body.firstChild);

    // تحديث حالة الاتصال
    function updateConnectionStatus() {
        if (navigator.onLine) {
            statusIcon.className = 'fas fa-wifi';
            statusText.textContent = 'متصل بالإنترنت';
            connectionStatus.className = 'connection-status online';

            // إخفاء شريط الحالة بعد 3 ثوانٍ
            setTimeout(() => {
                connectionStatus.style.display = 'none';
            }, 3000);
        } else {
            statusIcon.className = 'fas fa-wifi-slash';
            statusText.textContent = 'غير متصل بالإنترنت';
            connectionStatus.className = 'connection-status offline';
            connectionStatus.style.display = 'flex';
        }
    }

    // الاستماع لأحداث الاتصال
    window.addEventListener('online', () => {
        connectionStatus.style.display = 'flex';
        updateConnectionStatus();
    });

    window.addEventListener('offline', () => {
        connectionStatus.style.display = 'flex';
        updateConnectionStatus();
    });

    // تحديث الحالة عند تحميل الصفحة
    updateConnectionStatus();
});
