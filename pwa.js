// تسجيل Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('تم تسجيل Service Worker بنجاح:', registration.scope);
            })
            .catch(error => {
                console.log('فشل تسجيل Service Worker:', error);
            });
    });
}

// متغيرات لإدارة تثبيت التطبيق
let deferredPrompt;
const installButton = document.getElementById('install-button');
const installContainer = document.getElementById('install-container');

// إخفاء زر التثبيت في البداية
if (installContainer) {
    installContainer.style.display = 'none';
}

// الاستماع لحدث beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    // منع ظهور مربع الحوار التلقائي
    e.preventDefault();
    // تخزين الحدث للاستخدام لاحقًا
    deferredPrompt = e;
    // إظهار زر التثبيت
    if (installContainer) {
        installContainer.style.display = 'flex';
    }

    // إضافة مستمع حدث لزر التثبيت
    if (installButton) {
        installButton.addEventListener('click', () => {
            // إخفاء زر التثبيت
            installContainer.style.display = 'none';
            // إظهار مربع حوار التثبيت
            deferredPrompt.prompt();
            // انتظار اختيار المستخدم
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('تم قبول تثبيت التطبيق');
                } else {
                    console.log('تم رفض تثبيت التطبيق');
                }
                // تفريغ المتغير
                deferredPrompt = null;
            });
        });
    }
});

// الاستماع لحدث appinstalled
window.addEventListener('appinstalled', (evt) => {
    console.log('تم تثبيت التطبيق بنجاح');
});

// إنشاء زر التثبيت ديناميكيًا إذا لم يكن موجودًا
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('install-container')) {
        const installContainerDiv = document.createElement('div');
        installContainerDiv.id = 'install-container';
        installContainerDiv.className = 'install-container';
        installContainerDiv.style.display = 'none';
        installContainerDiv.style.position = 'fixed';
        installContainerDiv.style.bottom = '70px';
        installContainerDiv.style.left = '20px';
        installContainerDiv.style.zIndex = '1000';
        installContainerDiv.style.backgroundColor = 'rgba(0, 119, 182, 0.9)';
        installContainerDiv.style.color = 'white';
        installContainerDiv.style.padding = '10px 15px';
        installContainerDiv.style.borderRadius = '50px';
        installContainerDiv.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        installContainerDiv.style.display = 'flex';
        installContainerDiv.style.alignItems = 'center';
        installContainerDiv.style.cursor = 'pointer';
        installContainerDiv.style.transition = 'all 0.3s ease';
        installContainerDiv.style.fontFamily = "'Tajawal', sans-serif";
        installContainerDiv.style.fontSize = '14px';
        installContainerDiv.style.fontWeight = 'bold';
        
        const installIcon = document.createElement('i');
        installIcon.className = 'fas fa-download';
        installIcon.style.marginLeft = '8px';
        
        const installText = document.createElement('span');
        installText.textContent = 'تثبيت التطبيق';
        
        installContainerDiv.appendChild(installIcon);
        installContainerDiv.appendChild(installText);
        
        installContainerDiv.id = 'install-button';
        
        document.body.appendChild(installContainerDiv);
    }
});

// التحقق من حالة الاتصال
function updateOnlineStatus() {
    const statusElement = document.getElementById('online-status');
    if (statusElement) {
        if (navigator.onLine) {
            statusElement.textContent = 'متصل';
            statusElement.style.color = '#4CAF50';
        } else {
            statusElement.textContent = 'غير متصل';
            statusElement.style.color = '#F44336';
        }
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
document.addEventListener('DOMContentLoaded', updateOnlineStatus);
