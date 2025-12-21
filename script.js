// Основной JavaScript файл для сайта "Проблема адаптации"

// Функции для модальных окон
function openModal(caseNumber) {
    const modal = document.getElementById('modal' + caseNumber);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Добавляем класс анимации
        modal.querySelector('.modal-content').classList.add('animated');
    }
}

function closeModal(caseNumber) {
    const modal = document.getElementById('modal' + caseNumber);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Функция для инициализации Intersection Observer
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Добавляем класс animated для карточек кейсов и статистики
                if (entry.target.classList.contains('case-button')) {
                    entry.target.classList.add('animated');
                }
                
                if (entry.target.classList.contains('stat-card')) {
                    entry.target.classList.add('animated');
                    // Анимация для чисел статистики
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber) {
                        statNumber.classList.add('animated');
                    }
                }
                
                // После анимации можно прекратить наблюдение
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами
    document.querySelectorAll('.introduction, .content-section, footer, .case-button, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// Функция для плавной прокрутки
function initSmoothScroll() {
    document.querySelectorAll('nav a, .cta-button').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Обновляем активную ссылку в навигации
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
}

// Функция для управления шапкой при скролле
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.classList.remove('scrolled');
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        }
    });
}

// Функция для отслеживания активного раздела
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Если вверху страницы - делаем активной первую ссылку
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('nav a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });
}

// Функция для обработки кликов по кейсам
function initCaseButtons() {
    document.querySelectorAll('.case-button').forEach(button => {
        button.addEventListener('click', function() {
            const caseNumber = this.getAttribute('data-case');
            openModal(caseNumber);
        });
    });
}

// Функция для обработки закрытия модальных окон
function initModalClose() {
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const caseNumber = this.getAttribute('data-close');
            closeModal(caseNumber);
        });
    });
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Закрытие модального окна при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

// Функция для добавления эффекта пульсации к CTA кнопке
function initCTAPulse() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        // Добавляем пульсацию через 3 секунды после загрузки
        setTimeout(() => {
            ctaButton.classList.add('pulse');
        }, 3000);
        
        // Убираем пульсацию при наведении
        ctaButton.addEventListener('mouseenter', function() {
            this.classList.remove('pulse');
        });
        
        // Возвращаем пульсацию через 5 секунд после ухода мыши
        ctaButton.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.classList.add('pulse');
            }, 5000);
        });
    }
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("Сайт 'Проблема адаптации' загружен. Удачи в первом семестре!");
    
    // Инициализация всех модулей
    initIntersectionObserver();
    initSmoothScroll();
    initHeaderScroll();
    initActiveSection();
    initCaseButtons();
    initModalClose();
    initCTAPulse();
    
    // Добавляем анимацию для логотипа
    const logo = document.querySelector('.logo');
    if (logo) {
        setTimeout(() => {
            logo.style.animation = 'float 3s ease-in-out infinite';
        }, 1000);
    }
});

// Функция для проверки поддержки Intersection Observer
if (!('IntersectionObserver' in window)) {
    // Полифилл для старых браузеров
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('fade-in');
    });
}