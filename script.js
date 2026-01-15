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
// Функция для инициализации интерактивных симптомов стресса
function initStressSymptoms() {
    const symptomBtns = document.querySelectorAll('.symptom-btn');
    
    symptomBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const symptomCard = this.closest('.symptom-card');
            const content = symptomCard.querySelector('.symptom-content');
            
            // Закрываем все открытые симптомы
            document.querySelectorAll('.symptom-btn.active').forEach(activeBtn => {
                if (activeBtn !== this) {
                    activeBtn.classList.remove('active');
                    activeBtn.closest('.symptom-card').querySelector('.symptom-content').classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущий симптом
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                this.classList.remove('active');
                content.classList.remove('active');
            } else {
                this.classList.add('active');
                content.classList.add('active');
                
                // Плавная прокрутка к открытому элементу
                setTimeout(() => {
                    symptomCard.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 300);
            }
        });
    });
// Функция для инициализации чек-листа (упрощенная)
function initChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    
    // Загружаем сохраненный прогресс из localStorage
    loadChecklistProgress();
    
    // Обработчик для каждого чекбокса
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function() {
            saveChecklistProgress();
        });
    });
    
    // Сохранение прогресса в localStorage
    function saveChecklistProgress() {
        const progress = [];
        checkboxes.forEach((checkbox, index) => {
            progress[index] = checkbox.checked;
        });
        localStorage.setItem('checklistProgress', JSON.stringify(progress));
    }
    
    // Загрузка прогресса из localStorage
    function loadChecklistProgress() {
        const savedProgress = localStorage.getItem('checklistProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            checkboxes.forEach((checkbox, index) => {
                if (progress[index]) {
                    checkbox.checked = true;
                }
            });
        }
    }
}
// Функция для показа уведомлений
function showNotification(message, type) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `checklist-notification ${type}`;
    notification.innerHTML = `
        <span class="notification-text">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    // Анимация появления
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Добавляем уведомление на страницу
    document.body.appendChild(notification);
    
    // Кнопка закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Автоматическое закрытие через 3 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}
    // Закрытие по клику вне области
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.symptom-card')) {
            document.querySelectorAll('.symptom-btn.active, .symptom-content.active').forEach(el => {
                el.classList.remove('active');
            });
        }
    });
    
    // Открываем первый симптом по умолчанию
    const firstSymptomBtn = document.querySelector('.symptom-btn');
    if (firstSymptomBtn) {
        firstSymptomBtn.click();
    }
}
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
    initStressSymptoms();
    initChecklist();
    
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
