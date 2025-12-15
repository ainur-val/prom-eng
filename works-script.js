// works-script.js - Фильтрация работ и дополнительные функции для страницы "Наши работы"

document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация работ
    initWorksFilter();
    
    // Анимация статистики
    initStatsAnimation();
    
    // Активная навигация для страницы работ
    setActiveNavForWorks();
});

// Установка активной навигации для страницы работ
function setActiveNavForWorks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'works.html' || 
            link.textContent.includes('работ')) {
            link.classList.add('active');
        }
    });
}

// Фильтрация работ по категориям
function initWorksFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Фильтруем карточки
            workCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Анимация статистики
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.works-stats');
    
    function animateStats() {
        stats.forEach(stat => {
            // Получаем оригинальный текст
            const originalText = stat.textContent;
            
            // Проверяем, есть ли в тексте % или /
            if (originalText.includes('%') || originalText.includes('/')) {
                // Оставляем текст как есть
                return;
            }
            
            // Для обычных чисел делаем анимацию
            const target = parseInt(stat.textContent);
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    // Восстанавливаем оригинальный текст
                    stat.textContent = originalText;
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            }, 30);
        });
    }
    
    // Запускаем анимацию при прокрутке до секции
    function checkStatsVisibility() {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            animateStats();
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    }
    
    if (statsSection) {
        window.addEventListener('scroll', checkStatsVisibility);
        checkStatsVisibility(); // Проверяем сразу, если секция уже видна
    }
}