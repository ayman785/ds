// JSON-LD Schema for SEO
document.addEventListener('DOMContentLoaded', function() {
    // Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "مركز الأمل للعلاج الطبيعي وإعادة التأهيل",
        "alternateName": "Al-Amal Center for Physical Therapy and Rehabilitation",
        "url": "https://www.alamalcenter.com/",
        "logo": "https://www.alamalcenter.com/324232484_874075607240339_2051289815059088702_n.jpg",
        "image": "https://www.alamalcenter.com/324232484_874075607240339_2051289815059088702_n.jpg",
        "description": "مركز الأمل للعلاج الطبيعي وإعادة التأهيل - د. إبراهيم مقبل الضبيبي في عمران، اليمن. نقدم خدمات علاج طبيعي متميزة بأحدث التقنيات.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "عمران",
            "addressRegion": "عمران",
            "addressCountry": "YE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "15.6594",
            "longitude": "43.9431"
        },
        "telephone": "+967772890773",
        "email": "alamil.center.vip@gmail.com",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
                "opens": "08:00",
                "closes": "17:00"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/share/1EpNPyGMDH/",
            "https://t.me/"
        ],
        "founder": {
            "@type": "Person",
            "name": "د. إبراهيم مقبل الضبيبي",
            "jobTitle": "أخصائي العلاج الطبيعي",
            "image": "https://www.alamalcenter.com/324232484_874075607240339_2051289815059088702_n.jpg"
        },
        "medicalSpecialty": [
            "العلاج الطبيعي",
            "إعادة التأهيل"
        ],
        "availableService": [
            {
                "@type": "MedicalProcedure",
                "name": "علاج إصابات العظام والمفاصل",
                "description": "علاج متخصص لمختلف إصابات العظام والمفاصل، بما في ذلك إصابات الرياضة وآلام المفاصل المزمنة وتأهيل ما بعد الكسور والجراحات العظمية."
            },
            {
                "@type": "MedicalProcedure",
                "name": "إعادة التأهيل الحركي",
                "description": "برامج متخصصة لإعادة التأهيل الحركي للمرضى بعد الإصابات أو العمليات الجراحية، بهدف استعادة القدرة الحركية والوظيفية بشكل كامل."
            },
            {
                "@type": "MedicalProcedure",
                "name": "العلاج الطبيعي للقلب والرئة",
                "description": "برامج إعادة تأهيل لمرضى القلب والرئة، بما في ذلك مرضى ما بعد الأزمات القلبية والعمليات الجراحية وأمراض الجهاز التنفسي المزمنة."
            },
            {
                "@type": "MedicalProcedure",
                "name": "العلاج الطبيعي العصبي",
                "description": "خدمات علاج وتأهيل متخصصة لحالات الإصابات العصبية والسكتات الدماغية وأمراض الجهاز العصبي المختلفة."
            },
            {
                "@type": "MedicalProcedure",
                "name": "العلاج الطبيعي للأطفال",
                "description": "خدمات علاج طبيعي متخصصة للأطفال، بما في ذلك تأخر النمو الحركي واضطرابات النمو والإعاقات الحركية المختلفة."
            },
            {
                "@type": "MedicalProcedure",
                "name": "العلاج اليدوي والتدليك العلاجي",
                "description": "خدمات العلاج اليدوي والتدليك العلاجي لتخفيف الألم وتحسين الحركة وعلاج مشاكل العضلات والمفاصل المختلفة."
            }
        ]
    };

    // Create script element for Organization Schema
    const organizationScriptTag = document.createElement('script');
    organizationScriptTag.type = 'application/ld+json';
    organizationScriptTag.text = JSON.stringify(organizationSchema);
    document.head.appendChild(organizationScriptTag);

    // Local Business Schema
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "مركز الأمل للعلاج الطبيعي وإعادة التأهيل",
        "image": "https://www.alamalcenter.com/324232484_874075607240339_2051289815059088702_n.jpg",
        "@id": "https://www.alamalcenter.com/",
        "url": "https://www.alamalcenter.com/",
        "telephone": "+967772890773",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "عمران",
            "addressLocality": "عمران",
            "addressRegion": "عمران",
            "postalCode": "00000",
            "addressCountry": "YE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 15.6594,
            "longitude": 43.9431
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "08:00",
                "closes": "17:00"
            }
        ],
        "priceRange": "$$"
    };

    // Create script element for Local Business Schema
    const localBusinessScriptTag = document.createElement('script');
    localBusinessScriptTag.type = 'application/ld+json';
    localBusinessScriptTag.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(localBusinessScriptTag);

    // Add page-specific schema based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        // Home page schema
        const homePageSchema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "مركز الأمل للعلاج الطبيعي وإعادة التأهيل - د. إبراهيم مقبل الضبيبي",
            "description": "مركز الأمل للعلاج الطبيعي وإعادة التأهيل - د. إبراهيم مقبل الضبيبي في عمران، اليمن. نقدم خدمات علاج طبيعي متميزة بأحدث التقنيات.",
            "url": "https://www.alamalcenter.com/"
        };
        
        const homePageScriptTag = document.createElement('script');
        homePageScriptTag.type = 'application/ld+json';
        homePageScriptTag.text = JSON.stringify(homePageSchema);
        document.head.appendChild(homePageScriptTag);
    }
});
