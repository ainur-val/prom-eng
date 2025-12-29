// Основной JavaScript для всего сайта

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    initMobileMenu();
    
    // Плавная прокрутка
    initSmoothScroll();
    
    // Активная навигация - ОБНОВЛЕННАЯ!
    initActiveNavigation();
    
    // Обработка изображений
    initImageHandling();
    
    // Инициализация анимаций
    initAnimations();
});

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Плавная прокрутка к якорям
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Не прерываем переход на другие страницы
            if (this.getAttribute('href').startsWith('#') && window.location.pathname === new URL(this.href).pathname) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Если это переход на другую страницу, даем ему выполниться
        });
    });
}

// Активная навигация - ОБНОВЛЕННАЯ ВЕРСИЯ
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Функция для определения активной ссылки
    function setActiveLink() {
        // Сначала снимаем активный класс со всех ссылок
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Если мы на главной странице - используем скролл по секциям
        if (currentPage === 'index.html' || currentPage === '') {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 150;
            let foundActive = false;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                            foundActive = true;
                        }
                    });
                }
            });
            
            // Если вверху страницы, делаем активной первую ссылку
            if (!foundActive && scrollPosition < 300) {
                const firstLink = document.querySelector('.nav-link[href="#main"], .nav-link[href="index.html"]');
                if (firstLink) firstLink.classList.add('active');
            }
        }  else if (currentPage === 'docs.html') {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'docs.html' || 
                link.textContent.includes('Документация') ||
                link.textContent.includes('Документация')) {
                link.classList.add('active');
            }
        });
    } else {
            // Если мы на других страницах, подсвечиваем соответствующую ссылку
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPage) {
                    link.classList.add('active');
                } else if (currentPage === 'news.html' && linkHref.includes('news')) {
                    link.classList.add('active');
                } else if (currentPage === 'works.html' && linkHref.includes('works')) {
                    link.classList.add('active');
                } else if (currentPage === 'reviews.html') {
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === 'reviews.html' || 
                            link.textContent.includes('Отзывы')) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    }
    
    // Проверяем при загрузке и скролле
    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
    
    // Также обновляем при клике на ссылки на той же странице
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Если это ссылка на текущую страницу (якорь)
            const href = this.getAttribute('href');
            if (href.startsWith('#') || href === currentPage) {
                setTimeout(setActiveLink, 100); // Небольшая задержка для плавности
            }
        });
    });
    
}

// Обработка изображений (заглушки)
function initImageHandling() {
    const images = document.querySelectorAll('img');
    
}

// Инициализация анимаций
function initAnimations() {
    // Анимация появления элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.activity-card, .product-card, .work-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Установка начальных стилей для анимации
    const cards = document.querySelectorAll('.activity-card, .product-card, .work-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Запуск анимации
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Инициализация при загрузке
}

// Отправка формы (заглушка)
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Имитация отправки
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    setTimeout(function() {
        alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
    
    return false;
}

// Для использования в других формах на сайте
window.submitContactForm = submitContactForm;