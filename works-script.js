// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Фильтрация работ
  initWorksFilter();
  
  // Анимация статистики
  initStatsAnimation();
  
  // Мобильное меню (если используете тот же script.js)
  initMobileMenu();
});

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
          const target = parseInt(stat.textContent);
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                  current = target;
                  clearInterval(timer);
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

// Функция для мобильного меню (если нужно)
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
