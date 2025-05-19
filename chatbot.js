// بوت الدردشة للرد التلقائي على استفسارات المرضى

// قاعدة بيانات الردود
const botResponses = {
    greeting: [
        "مرحباً بك في مركز الأمل للعلاج الطبيعي والتأهيل! كيف يمكنني مساعدتك اليوم؟",
        "أهلاً بك! أنا المساعد الافتراضي لمركز الأمل للعلاج الطبيعي. كيف يمكنني خدمتك؟"
    ],
    services: [
        "نقدم مجموعة متنوعة من خدمات العلاج الطبيعي، بما في ذلك:\n- علاج إصابات العظام والمفاصل\n- إعادة التأهيل الحركي\n- العلاج الطبيعي للقلب والرئة\n- العلاج الطبيعي العصبي\n- العلاج الطبيعي للأطفال\n- العلاج اليدوي والتدليك العلاجي\n\nهل ترغب في معرفة المزيد عن أي من هذه الخدمات؟"
    ],
    workingHours: [
        "ساعات العمل في مركز الأمل للعلاج الطبيعي هي:\n- السبت إلى الخميس: الفترة الصباحية من 8:00 صباحاً حتى 1:00 ظهراً\n- السبت إلى الخميس: الفترة المسائية من 2:00 ظهراً حتى 6:00 مساءً\n- الجمعة: مغلق\n\nهل ترغب في حجز موعد؟"
    ],
    location: [
        "يقع مركز الأمل للعلاج الطبيعي في عمران، اليمن - MX62+RHF\nيمكنك الوصول إلينا بسهولة عبر خرائط جوجل."
    ],
    appointment: [
        "لحجز موعد، يمكنك:\n- الاتصال بنا على الرقم: 0772 890 773\n- التواصل عبر الواتساب: 0772 890 773\n- إرسال بريد إلكتروني: alamil.center.vip@gmail.com\n- أو استخدام نموذج الحجز في موقعنا\n\nهل ترغب في حجز موعد الآن؟"
    ],
    doctor: [
        "الدكتور إبراهيم مقبل الضبيبي هو أخصائي علاج طبيعي ذو خبرة تزيد عن 15 عاماً. حاصل على دكتوراه في العلاج الطبيعي من جامعة القاهرة، وعضو في الجمعية الأمريكية للعلاج الطبيعي."
    ],
    boneTherapy: [
        "نقدم علاجاً متخصصاً لمختلف إصابات العظام والمفاصل، بما في ذلك:\n- علاج آلام الظهر والرقبة\n- علاج التهاب المفاصل وخشونة الركبة\n- إعادة تأهيل إصابات الأربطة والأوتار\n- علاج الانزلاق الغضروفي\n- تأهيل ما بعد جراحات استبدال المفاصل"
    ],
    neuroTherapy: [
        "نقدم خدمات علاج وتأهيل متخصصة لحالات الإصابات العصبية، بما في ذلك:\n- إعادة تأهيل مرضى السكتة الدماغية\n- علاج إصابات الحبل الشوكي\n- تأهيل مرضى الشلل الدماغي\n- علاج مرضى التصلب المتعدد\n- تحسين التوازن والتناسق الحركي"
    ],
    childrenTherapy: [
        "نقدم خدمات علاج طبيعي متخصصة للأطفال، بما في ذلك:\n- تقييم وعلاج تأخر النمو الحركي\n- علاج اضطرابات المشي والتوازن\n- تأهيل الأطفال ذوي الاحتياجات الخاصة\n- علاج تشوهات القدم والعمود الفقري\n- تدريب الأهل على التمارين المنزلية"
    ],
    contact: [
        "يمكنك التواصل معنا عبر:\n- الهاتف: 0772 890 773\n- الواتساب: 0772 890 773\n- البريد الإلكتروني: alamil.center.vip@gmail.com\n- فيسبوك: https://www.facebook.com/share/1EpNPyGMDH/\n- تلغرام: متوفر عبر الرابط في موقعنا"
    ],
    thanks: [
        "شكراً لتواصلك معنا! نحن سعداء بخدمتك.",
        "أشكرك على اهتمامك بمركز الأمل للعلاج الطبيعي. نتطلع لرؤيتك قريباً!"
    ],
    default: [
        "آسف، لم أفهم استفسارك. هل يمكنك إعادة صياغته أو اختيار أحد الخيارات المتاحة؟",
        "عذراً، لم أتمكن من فهم طلبك. هل ترغب في معرفة المزيد عن خدماتنا، أوقات العمل، أو حجز موعد؟"
    ]
};

// الكلمات المفتاحية للتعرف على استفسارات المستخدم
const keywords = {
    greeting: ["مرحبا", "أهلا", "السلام", "صباح", "مساء", "هاي", "هلو"],
    services: ["خدمات", "علاج", "تقدمون", "تقدم", "خدمة"],
    workingHours: ["ساعات", "أوقات", "العمل", "الدوام", "متى", "مفتوح", "مغلق"],
    location: ["مكان", "عنوان", "أين", "موقع", "خريطة"],
    appointment: ["موعد", "حجز", "زيارة", "متوفر", "متاح"],
    doctor: ["دكتور", "طبيب", "إبراهيم", "الضبيبي", "مؤهلات", "خبرة"],
    boneTherapy: ["عظام", "مفاصل", "ظهر", "رقبة", "ركبة", "كسر", "التهاب", "خشونة"],
    neuroTherapy: ["عصبي", "أعصاب", "سكتة", "شلل", "دماغ", "توازن"],
    childrenTherapy: ["أطفال", "طفل", "نمو", "تأخر", "مشي"],
    contact: ["اتصال", "تواصل", "هاتف", "واتساب", "ايميل", "بريد", "فيسبوك"]
};

// تحديد نوع الاستفسار بناءً على الكلمات المفتاحية
function identifyQuery(message) {
    message = message.trim().toLowerCase();

    // التحقق من الشكر
    if (message.includes("شكر") || message.includes("شكرا")) {
        return "thanks";
    }

    // البحث عن الكلمات المفتاحية
    for (const [category, words] of Object.entries(keywords)) {
        for (const word of words) {
            if (message.includes(word)) {
                return category;
            }
        }
    }

    return "default";
}

// إنشاء عنصر رسالة في المحادثة
function createChatMessage(message, sender) {
    const chatMessage = document.createElement('div');
    chatMessage.className = `chat-message ${sender}`;

    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble';
    chatBubble.innerHTML = message.replace(/\n/g, '<br>');

    const chatTime = document.createElement('div');
    chatTime.className = 'chat-time';

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    chatTime.textContent = `${hours}:${minutes}`;

    chatMessage.appendChild(chatBubble);
    chatMessage.appendChild(chatTime);

    return chatMessage;
}

// إضافة خيارات سريعة
function addQuickOptions() {
    const options = [
        { text: "الخدمات", category: "services" },
        { text: "أوقات العمل", category: "workingHours" },
        { text: "حجز موعد", category: "appointment" },
        { text: "موقع المركز", category: "location" },
        { text: "التواصل معنا", category: "contact" }
    ];

    const chatOptions = document.createElement('div');
    chatOptions.className = 'chat-options';

    options.forEach(option => {
        const optionBtn = document.createElement('div');
        optionBtn.className = 'chat-option';
        optionBtn.textContent = option.text;
        optionBtn.onclick = function() {
            const userMessage = createChatMessage(option.text, 'user');
            document.querySelector('.chat-body').appendChild(userMessage);

            setTimeout(() => {
                const botResponse = getRandomResponse(option.category);
                const botMessage = createChatMessage(botResponse, 'bot');
                document.querySelector('.chat-body').appendChild(botMessage);

                // التمرير إلى أسفل
                const chatBody = document.querySelector('.chat-body');
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 500);
        };

        chatOptions.appendChild(optionBtn);
    });

    return chatOptions;
}

// الحصول على رد عشوائي من قاعدة البيانات
function getRandomResponse(category) {
    const responses = botResponses[category] || botResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
}

// تهيئة البوت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء عناصر البوت
    const chatBotContainer = document.createElement('div');
    chatBotContainer.className = 'chat-bot-container';

    // زر البوت
    const chatBotButton = document.createElement('div');
    chatBotButton.className = 'chat-bot-button';

    const chatBotPulse = document.createElement('div');
    chatBotPulse.className = 'chat-bot-pulse';

    const chatBotIcon = document.createElement('div');
    chatBotIcon.className = 'chat-bot-icon';
    chatBotIcon.innerHTML = '<i class="fas fa-robot"></i>';

    chatBotButton.appendChild(chatBotPulse);
    chatBotButton.appendChild(chatBotIcon);

    // نافذة الدردشة
    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';

    // رأس نافذة الدردشة
    const chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';

    const chatTitle = document.createElement('h3');
    chatTitle.textContent = 'مساعد مركز الأمل للعلاج الطبيعي';

    const chatClose = document.createElement('div');
    chatClose.className = 'chat-close';
    chatClose.innerHTML = '<i class="fas fa-times"></i>';

    chatHeader.appendChild(chatTitle);
    chatHeader.appendChild(chatClose);

    // جسم نافذة الدردشة
    const chatBody = document.createElement('div');
    chatBody.className = 'chat-body';

    // تذييل نافذة الدردشة
    const chatFooter = document.createElement('div');
    chatFooter.className = 'chat-footer';

    const chatInput = document.createElement('input');
    chatInput.type = 'text';
    chatInput.className = 'chat-input';
    chatInput.placeholder = 'اكتب رسالتك هنا...';

    const chatSend = document.createElement('button');
    chatSend.className = 'chat-send';
    chatSend.innerHTML = '<i class="fas fa-paper-plane"></i>';

    chatFooter.appendChild(chatInput);
    chatFooter.appendChild(chatSend);

    // تجميع نافذة الدردشة
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(chatBody);
    chatWindow.appendChild(chatFooter);

    // تجميع حاوية البوت
    chatBotContainer.appendChild(chatWindow);
    chatBotContainer.appendChild(chatBotButton);

    // إضافة البوت إلى الصفحة
    document.body.appendChild(chatBotContainer);

    // إضافة رسالة ترحيب
    setTimeout(() => {
        const welcomeMessage = createChatMessage(getRandomResponse('greeting'), 'bot');
        chatBody.appendChild(welcomeMessage);

        // إضافة الخيارات السريعة
        const quickOptions = addQuickOptions();
        chatBody.appendChild(quickOptions);
    }, 1000);

    // فتح/إغلاق نافذة الدردشة
    chatBotButton.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
    });

    chatClose.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });

    // إرسال رسالة
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // إضافة رسالة المستخدم
        const userMessage = createChatMessage(message, 'user');
        chatBody.appendChild(userMessage);

        // مسح حقل الإدخال
        chatInput.value = '';

        // التمرير إلى أسفل
        chatBody.scrollTop = chatBody.scrollHeight;

        // إرسال رد البوت بعد تأخير قصير
        setTimeout(() => {
            const category = identifyQuery(message);
            const botResponse = getRandomResponse(category);

            const botMessage = createChatMessage(botResponse, 'bot');
            chatBody.appendChild(botMessage);

            // التمرير إلى أسفل
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 500);
    }

    // إرسال الرسالة عند النقر على زر الإرسال
    chatSend.addEventListener('click', sendMessage);

    // إرسال الرسالة عند الضغط على Enter
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
