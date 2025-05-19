// بوت الدردشة المحسن للرد التلقائي على استفسارات المرضى

// ذاكرة المحادثة
let conversationHistory = [];
let userContext = {
    name: null,
    lastQuery: null,
    lastCategory: null,
    visitCount: 0,
    preferredTreatment: null,
    appointmentInfo: null
};

// قاعدة بيانات الردود المحسنة
const botResponses = {
    greeting: [
        "مرحباً بك في مركز الأمل للعلاج الطبيعي والتأهيل! أنا مساعدك الشخصي، كيف يمكنني مساعدتك اليوم؟",
        "أهلاً بك! يسعدني التحدث معك. أنا المساعد الافتراضي لمركز الأمل للعلاج الطبيعي. هل تبحث عن معلومات محددة أو ترغب في حجز موعد؟",
        "مرحباً! أنا هنا لمساعدتك في أي استفسار عن خدمات العلاج الطبيعي لدينا. كيف يمكنني خدمتك اليوم؟"
    ],
    returning_user: [
        "مرحباً بك مجدداً! يسعدني رؤيتك مرة أخرى. هل لديك أي استفسارات جديدة؟",
        "أهلاً بك مرة أخرى في مركز الأمل للعلاج الطبيعي! كيف يمكنني مساعدتك اليوم؟"
    ],
    services: [
        "في مركز الأمل للعلاج الطبيعي، نفخر بتقديم مجموعة شاملة من خدمات العلاج الطبيعي المتخصصة:\n\n• علاج إصابات العظام والمفاصل\n• إعادة التأهيل الحركي بعد الإصابات والعمليات\n• العلاج الطبيعي للقلب والرئة\n• العلاج الطبيعي العصبي\n• العلاج الطبيعي للأطفال\n• العلاج اليدوي والتدليك العلاجي\n\nهل ترغب في معرفة المزيد عن أي من هذه الخدمات؟ أو هل لديك حالة محددة تحتاج إلى استشارة بشأنها؟"
    ],
    workingHours: [
        "مركز الأمل للعلاج الطبيعي يفتح أبوابه لخدمتكم وفق المواعيد التالية:\n\n• السبت إلى الخميس: الفترة الصباحية من 8:00 صباحاً حتى 1:00 ظهراً\n• السبت إلى الخميس: الفترة المسائية من 2:00 ظهراً حتى 6:00 مساءً\n• الجمعة: مغلق للراحة الأسبوعية\n\nنحرص على الالتزام بالمواعيد المحددة لضمان تقديم أفضل خدمة لجميع المرضى. هل ترغب في حجز موعد في أحد هذه الأيام؟"
    ],
    location: [
        "يقع مركز الأمل للعلاج الطبيعي في موقع مميز وسهل الوصول في عمران، اليمن - MX62+RHF\n\nيمكنك الوصول إلينا بسهولة عبر خرائط جوجل من خلال النقر على رابط الموقع في صفحة 'اتصل بنا'.\n\nهل تحتاج إلى مساعدة في الوصول إلينا أو هل لديك استفسارات أخرى؟"
    ],
    appointment: [
        "يسعدنا حجز موعد مناسب لك في مركز الأمل للعلاج الطبيعي. لحجز موعد، يمكنك اختيار إحدى الطرق التالية:\n\n• الاتصال المباشر: 0772 890 773\n• التواصل عبر الواتساب: 0772 890 773\n• إرسال بريد إلكتروني: alamil.center.vip@gmail.com\n• استخدام نموذج الحجز في موقعنا\n\nهل ترغب في حجز موعد الآن؟ يمكنني مساعدتك في معرفة الأوقات المتاحة."
    ],
    appointment_followup: [
        "لحجز موعد، أحتاج إلى بعض المعلومات البسيطة:\n\n• اسمك الكريم\n• رقم هاتفك للتواصل\n• نوع العلاج الذي تحتاجه\n• اليوم والوقت المفضل لديك\n\nهل يمكنك تزويدي بهذه المعلومات؟"
    ],
    doctor: [
        "الدكتور إبراهيم مقبل الضبيبي هو أخصائي علاج طبيعي متميز بخبرة تزيد عن 15 عاماً في مجال العلاج الطبيعي والتأهيل.\n\nمؤهلاته العلمية:\n• دكتوراه في العلاج الطبيعي من جامعة القاهرة\n• عضو في الجمعية الأمريكية للعلاج الطبيعي\n• حاصل على العديد من الشهادات المتخصصة في تقنيات العلاج الحديثة\n\nيتميز الدكتور إبراهيم بنهجه الشامل في العلاج، حيث يركز على علاج السبب الجذري للمشكلة وليس فقط الأعراض الظاهرة.\n\nهل ترغب في معرفة المزيد عن تخصصات الدكتور أو حجز موعد معه؟"
    ],
    boneTherapy: [
        "في مركز الأمل، نقدم علاجاً متخصصاً لمختلف إصابات العظام والمفاصل باستخدام أحدث التقنيات العلاجية:\n\n• علاج آلام الظهر والرقبة المزمنة والحادة\n• علاج التهاب المفاصل وخشونة الركبة بطرق غير جراحية\n• إعادة تأهيل إصابات الأربطة والأوتار الرياضية\n• علاج الانزلاق الغضروفي وآلام العمود الفقري\n• تأهيل ما بعد جراحات استبدال المفاصل والكسور\n• علاج متلازمة النفق الرسغي وآلام الأطراف\n\nنستخدم مزيجاً من التمارين العلاجية، العلاج اليدوي، والعلاج الطبيعي بالأجهزة الحديثة.\n\nهل تعاني من إحدى هذه الحالات؟ أو هل لديك استفسار محدد عن إصابة معينة؟"
    ],
    neuroTherapy: [
        "يقدم مركز الأمل خدمات علاج وتأهيل متخصصة لحالات الإصابات العصبية، تشمل:\n\n• إعادة تأهيل مرضى السكتة الدماغية واستعادة الوظائف الحركية\n• علاج إصابات الحبل الشوكي وتحسين الاستقلالية الحركية\n• تأهيل مرضى الشلل الدماغي وتحسين جودة الحياة\n• علاج مرضى التصلب المتعدد والأمراض العصبية التنكسية\n• تحسين التوازن والتناسق الحركي لمختلف الحالات العصبية\n• علاج حالات الضعف العضلي الناتج عن أمراض الأعصاب\n\nنستخدم برامج علاجية متكاملة تجمع بين التمارين العلاجية المتخصصة، تقنيات إعادة التعلم الحركي، والأجهزة الحديثة.\n\nهل لديك استفسار محدد عن إحدى هذه الحالات؟"
    ],
    childrenTherapy: [
        "يقدم مركز الأمل خدمات علاج طبيعي متخصصة للأطفال، مصممة خصيصاً لتلبية احتياجاتهم الفريدة:\n\n• تقييم وعلاج تأخر النمو الحركي عند الأطفال\n• علاج اضطرابات المشي والتوازن وتصحيح أنماط الحركة\n• تأهيل الأطفال ذوي الاحتياجات الخاصة وتحسين قدراتهم الوظيفية\n• علاج تشوهات القدم والعمود الفقري مثل الجنف والحداب\n• تدريب الأهل على التمارين المنزلية لضمان استمرارية العلاج\n• برامج تحفيز النمو الحركي للرضع والأطفال\n\nيتميز فريقنا بالخبرة في التعامل مع الأطفال بأسلوب مرح ومحفز يجعل جلسات العلاج ممتعة وفعالة.\n\nهل لديك طفل يحتاج إلى تقييم أو علاج؟ أو هل لديك استفسارات محددة؟"
    ],
    contact: [
        "يسعدنا تواصلك مع مركز الأمل للعلاج الطبيعي عبر أي من قنوات الاتصال التالية:\n\n• الهاتف: 0772 890 773 (متاح خلال ساعات العمل)\n• الواتساب: 0772 890 773 (للاستفسارات وحجز المواعيد)\n• البريد الإلكتروني: alamil.center.vip@gmail.com\n• فيسبوك: https://www.facebook.com/share/1EpNPyGMDH/\n• تلغرام: متوفر عبر الرابط في موقعنا\n\nفريقنا جاهز للرد على استفساراتك وتقديم المساعدة اللازمة. هل هناك طريقة تفضلها للتواصل معنا؟"
    ],
    pain: [
        "أتفهم تماماً شعورك بالألم، وأود مساعدتك في التخفيف منه. في مركز الأمل، نتعامل مع مختلف أنواع الآلام بنهج شامل ومتخصص.\n\nلتقديم المساعدة المناسبة، هل يمكنك إخباري بمزيد من التفاصيل عن:\n• موقع الألم بالتحديد\n• متى بدأ الألم وكيف تطور\n• هل هناك حركات معينة تزيد من الألم\n• هل سبق أن تلقيت علاجاً لهذه المشكلة\n\nهذه المعلومات ستساعدنا في تقديم توصيات أولية مناسبة لحالتك."
    ],
    thanks: [
        "شكراً لتواصلك معنا! يسعدنا دائماً تقديم المساعدة والإجابة على استفساراتك. نتطلع لرؤيتك قريباً في مركز الأمل للعلاج الطبيعي.",
        "أشكرك على اهتمامك بمركز الأمل للعلاج الطبيعي. صحتك وعافيتك هي أولويتنا، ونحن هنا لمساعدتك في كل خطوة من رحلة علاجك. نتطلع لخدمتك قريباً!"
    ],
    goodbye: [
        "شكراً لتواصلك معنا اليوم. إذا كانت لديك أي استفسارات أخرى، فلا تتردد في العودة للتحدث معي. أتمنى لك يوماً سعيداً ودمت بصحة وعافية!",
        "سعدت بالتحدث معك! نحن في مركز الأمل للعلاج الطبيعي نقدر ثقتك بنا ونتطلع لمساعدتك. إلى اللقاء وأتمنى لك الصحة والعافية."
    ],
    default: [
        "أعتذر، لم أتمكن من فهم استفسارك بشكل كامل. هل يمكنك توضيح ما تبحث عنه بطريقة أخرى؟ أنا هنا للمساعدة في أي معلومات عن خدمات العلاج الطبيعي، المواعيد، أو حجز الجلسات.",
        "عذراً، يبدو أن هناك بعض الغموض في طلبك. هل ترغب في معرفة المزيد عن خدماتنا، أوقات العمل، أو حجز موعد؟ يمكنك أيضاً طرح سؤال محدد عن حالتك الصحية."
    ],
    confused: [
        "أعتذر، يبدو أنني لم أفهم استفسارك بشكل صحيح. دعنا نحاول بطريقة أخرى. هل تبحث عن معلومات حول خدماتنا، أو ترغب في حجز موعد، أو لديك استفسار طبي محدد؟",
        "أنا آسف لعدم فهمي لاستفسارك. هل يمكنك طرح سؤالك بطريقة مختلفة؟ أنا هنا لمساعدتك في أي معلومات تحتاجها عن مركز الأمل للعلاج الطبيعي."
    ]
};

// الكلمات المفتاحية المحسنة للتعرف على استفسارات المستخدم
const keywords = {
    greeting: ["مرحبا", "أهلا", "السلام", "صباح", "مساء", "هاي", "هلو", "مرحبًا", "أهلًا", "صباح الخير", "مساء الخير"],
    services: ["خدمات", "علاج", "تقدمون", "تقدم", "خدمة", "العلاجات", "تعالجون", "تعالج", "خدماتكم", "علاجات", "تخصصات"],
    workingHours: ["ساعات", "أوقات", "العمل", "الدوام", "متى", "مفتوح", "مغلق", "تفتحون", "تغلقون", "تشتغلون", "تعملون", "دوام"],
    location: ["مكان", "عنوان", "أين", "موقع", "خريطة", "وين", "فين", "العنوان", "تقعون", "تتواجدون", "المكان"],
    appointment: ["موعد", "حجز", "زيارة", "متوفر", "متاح", "أحجز", "أريد موعد", "محجوز", "الحجز", "المواعيد", "أوقات الحجز"],
    doctor: ["دكتور", "طبيب", "إبراهيم", "الضبيبي", "مؤهلات", "خبرة", "الدكتور", "أخصائي", "مختص", "خبير", "شهادات"],
    boneTherapy: ["عظام", "مفاصل", "ظهر", "رقبة", "ركبة", "كسر", "التهاب", "خشونة", "مفصل", "كتف", "ورك", "كوع", "رسغ", "قدم"],
    neuroTherapy: ["عصبي", "أعصاب", "سكتة", "شلل", "دماغ", "توازن", "تنميل", "خدر", "ضعف عضلي", "صرع", "تشنج", "ارتعاش"],
    childrenTherapy: ["أطفال", "طفل", "نمو", "تأخر", "مشي", "رضيع", "طفلي", "ابني", "ابنتي", "صغير", "تأخر النطق", "تأخر الحركة"],
    contact: ["اتصال", "تواصل", "هاتف", "واتساب", "ايميل", "بريد", "فيسبوك", "تلفون", "جوال", "رقم", "تليفون", "تلغرام"],
    pain: ["ألم", "وجع", "أوجاع", "يؤلمني", "موجوع", "يوجعني", "مؤلم", "آلام", "أتألم", "وجع", "مؤلم", "يعورني"],
    thanks: ["شكر", "شكرا", "شكراً", "ممنون", "متشكر", "أشكرك", "جزاك الله خير", "بارك الله فيك", "ممتن"],
    goodbye: ["وداعا", "مع السلامة", "إلى اللقاء", "باي", "سلام", "أستودعك الله", "في أمان الله", "تصبح على خير"]
};

// تحسين نظام التعرف على النوايا
function identifyIntent(message) {
    if (!message || message.trim() === '') return 'default';

    message = message.trim().toLowerCase();

    // حفظ الرسالة في سجل المحادثة
    conversationHistory.push({
        sender: 'user',
        message: message,
        timestamp: new Date()
    });

    // التحقق من السياق السابق للمحادثة
    if (userContext.lastCategory === 'appointment' &&
        !message.includes('لا') &&
        (message.includes('نعم') || message.includes('أريد') || message.includes('أرغب') || message.length < 10)) {
        return 'appointment_followup';
    }

    // التحقق من الوداع
    if (keywords.goodbye.some(word => message.includes(word))) {
        return 'goodbye';
    }

    // التحقق من الشكر
    if (keywords.thanks.some(word => message.includes(word))) {
        return 'thanks';
    }

    // البحث عن الكلمات المفتاحية بطريقة أكثر تعقيداً
    let matchedCategories = [];

    for (const [category, words] of Object.entries(keywords)) {
        for (const word of words) {
            if (message.includes(word)) {
                // إضافة الفئة مع عدد مرات تكرار الكلمات المفتاحية
                const existingCategory = matchedCategories.find(c => c.category === category);
                if (existingCategory) {
                    existingCategory.count++;
                } else {
                    matchedCategories.push({ category, count: 1 });
                }
            }
        }
    }

    // ترتيب الفئات حسب عدد مرات التكرار
    matchedCategories.sort((a, b) => b.count - a.count);

    // إذا وجدنا تطابقات، نعيد الفئة الأكثر تكراراً
    if (matchedCategories.length > 0) {
        userContext.lastCategory = matchedCategories[0].category;
        return matchedCategories[0].category;
    }

    // إذا لم نجد تطابقات، نتحقق من السياق
    if (userContext.lastCategory && Math.random() > 0.3) {
        return userContext.lastCategory; // استمرار في نفس الموضوع بنسبة 70%
    }

    return 'default';
}

// إضافة تأخير طباعة واقعي
function simulateTyping(message, callback) {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';

    const chatBody = document.querySelector('.chat-body');
    chatBody.appendChild(typingIndicator);

    // حساب وقت الطباعة بناءً على طول الرسالة (بين 1 و 3 ثوانٍ)
    const typingTime = Math.min(3000, Math.max(1000, message.length * 30));

    // التمرير إلى أسفل
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        chatBody.removeChild(typingIndicator);
        callback();
    }, typingTime);
}

// إنشاء عنصر رسالة في المحادثة مع تحسينات
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

    // حفظ الرسالة في سجل المحادثة
    conversationHistory.push({
        sender: sender,
        message: message,
        timestamp: now
    });

    return chatMessage;
}

// إضافة خيارات سريعة محسنة
function addQuickOptions() {
    const options = [
        { text: "الخدمات العلاجية", category: "services" },
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

            userContext.lastCategory = option.category;

            // محاكاة الطباعة
            simulateTyping(botResponses[option.category][0], () => {
                const botResponse = getResponse(option.category);
                const botMessage = createChatMessage(botResponse, 'bot');
                document.querySelector('.chat-body').appendChild(botMessage);

                // التمرير إلى أسفل
                const chatBody = document.querySelector('.chat-body');
                chatBody.scrollTop = chatBody.scrollHeight;

                // إضافة خيارات متابعة مناسبة
                addFollowUpOptions(option.category);
            });
        };

        chatOptions.appendChild(optionBtn);
    });

    return chatOptions;
}

// إضافة خيارات متابعة بناءً على سياق المحادثة
function addFollowUpOptions(category) {
    let followUpOptions = [];

    switch(category) {
        case 'services':
            followUpOptions = [
                { text: "علاج العظام والمفاصل", category: "boneTherapy" },
                { text: "العلاج العصبي", category: "neuroTherapy" },
                { text: "علاج الأطفال", category: "childrenTherapy" },
                { text: "حجز موعد", category: "appointment" }
            ];
            break;
        case 'appointment':
            followUpOptions = [
                { text: "أوقات العمل", category: "workingHours" },
                { text: "موقع المركز", category: "location" },
                { text: "معلومات عن الدكتور", category: "doctor" }
            ];
            break;
        case 'boneTherapy':
        case 'neuroTherapy':
        case 'childrenTherapy':
            followUpOptions = [
                { text: "حجز موعد", category: "appointment" },
                { text: "خدمات أخرى", category: "services" }
            ];
            break;
        default:
            return; // لا نضيف خيارات متابعة
    }

    if (followUpOptions.length > 0) {
        const chatOptions = document.createElement('div');
        chatOptions.className = 'chat-options';

        followUpOptions.forEach(option => {
            const optionBtn = document.createElement('div');
            optionBtn.className = 'chat-option';
            optionBtn.textContent = option.text;
            optionBtn.onclick = function() {
                const userMessage = createChatMessage(option.text, 'user');
                document.querySelector('.chat-body').appendChild(userMessage);

                userContext.lastCategory = option.category;

                // محاكاة الطباعة
                simulateTyping(botResponses[option.category][0], () => {
                    const botResponse = getResponse(option.category);
                    const botMessage = createChatMessage(botResponse, 'bot');
                    document.querySelector('.chat-body').appendChild(botMessage);

                    // التمرير إلى أسفل
                    const chatBody = document.querySelector('.chat-body');
                    chatBody.scrollTop = chatBody.scrollHeight;
                });
            };

            chatOptions.appendChild(optionBtn);
        });

        document.querySelector('.chat-body').appendChild(chatOptions);
    }
}

// الحصول على رد مناسب من قاعدة البيانات
function getResponse(category) {
    // التحقق من المستخدم العائد
    if (category === 'greeting' && userContext.visitCount > 0) {
        category = 'returning_user';
    }

    const responses = botResponses[category] || botResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
}

// تهيئة البوت المحسن عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // زيادة عداد الزيارات
    const visitCountKey = 'alamil_chatbot_visit_count';
    userContext.visitCount = parseInt(localStorage.getItem(visitCountKey) || '0');
    localStorage.setItem(visitCountKey, (userContext.visitCount + 1).toString());

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

    // إضافة رسالة ترحيب بعد تأخير قصير
    setTimeout(() => {
        // اختيار رسالة ترحيب مناسبة
        const category = userContext.visitCount > 0 ? 'returning_user' : 'greeting';
        const welcomeMessage = getResponse(category);

        // محاكاة الطباعة
        simulateTyping(welcomeMessage, () => {
            const botMessage = createChatMessage(welcomeMessage, 'bot');
            chatBody.appendChild(botMessage);

            // إضافة الخيارات السريعة
            const quickOptions = addQuickOptions();
            chatBody.appendChild(quickOptions);
        });
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

        // حفظ الرسالة الأخيرة
        userContext.lastQuery = message;

        // مسح حقل الإدخال
        chatInput.value = '';

        // التمرير إلى أسفل
        chatBody.scrollTop = chatBody.scrollHeight;

        // تحديد نية المستخدم
        const intent = identifyIntent(message);
        userContext.lastCategory = intent;

        // محاكاة الطباعة ثم إرسال الرد
        simulateTyping(botResponses[intent][0], () => {
            const botResponse = getResponse(intent);
            const botMessage = createChatMessage(botResponse, 'bot');
            chatBody.appendChild(botMessage);

            // التمرير إلى أسفل
            chatBody.scrollTop = chatBody.scrollHeight;

            // إضافة خيارات متابعة إذا كان مناسباً
            if (['services', 'appointment', 'boneTherapy', 'neuroTherapy', 'childrenTherapy'].includes(intent)) {
                addFollowUpOptions(intent);
            }
        });
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
