// Данные галерей для каждого проекта
const projectsGallery = {
  'reservoir-1': {
      title: 'Резервуар для нефтепродуктов',
      location: 'г.Москва',
      description: 'Строительство вертикального стального резервуара объемом 5000 м³ для хранения нефтепродуктов.',
      images: [
          { src: './images/works/rvs1.jpeg', alt: 'Подготовка основания под резервуар' },
          { src: './images/works/rvs2.jpeg', alt: 'Монтаж днища резервуара' },
          { src: './images/works/rvs3.jpeg', alt: 'Установка стеновых листов' },
          { src: './images/works/rvs4.jpeg', alt: 'Монтаж крыши' },
          { src: './images/works/rvs5.jpeg', alt: 'Установка технологического оборудования' },
          { src: './images/works/rvs6.jpeg', alt: 'Покрасочные работы' },
          { src: './images/works/rvs7.jpeg', alt: 'Гидравлические испытания' },
          { src: './images/works/rvs8.jpeg', alt: 'Готовый резервуар' }
      ],
      specs: [
          { icon: 'fas fa-ruler-combined', text: 'Объем: 5000 м³' },
          { icon: 'fas fa-ruler', text: 'Диаметр: 22 м' },
          { icon: 'fas fa-arrows-alt-v', text: 'Высота: 15 м' },
          { icon: 'fas fa-calendar-alt', text: 'Срок строительства: 3 месяца' },
          { icon: 'fas fa-hard-hat', text: 'Количество рабочих: 25 человек' },
          { icon: 'fas fa-industry', text: 'Материал: сталь 09Г2С' }
      ]
  },
  'boiler-1': {
      title: 'Блочно-модульная котельная',
      location: 'Московская область',
      description: 'Проектирование и строительство модульной котельной мощностью 5 МВт для отопления жилого комплекса из 10 домов.',
      images: [
          { src: 'images/works/boiler-1-1.jpg', alt: 'Доставка модулей' },
          { src: 'images/works/boiler-1-2.jpg', alt: 'Монтаж модулей' },
          { src: 'images/works/boiler-1-3.jpg', alt: 'Установка котлов' },
          { src: 'images/works/boiler-1-4.jpg', alt: 'Монтаж трубопроводов' },
          { src: 'images/works/boiler-1-5.jpg', alt: 'Электромонтажные работы' },
          { src: 'images/works/boiler-1-6.jpg', alt: 'Автоматика и КИП' },
          { src: 'images/works/boiler-1-7.jpg', alt: 'Пуско-наладка' }
      ],
      specs: [
          { icon: 'fas fa-bolt', text: 'Мощность: 5 МВт' },
          { icon: 'fas fa-fire', text: 'Топливо: природный газ' },
          { icon: 'fas fa-home', text: 'Обслуживает: 10 домов' },
          { icon: 'fas fa-calendar-alt', text: 'Срок: 2 месяца' },
          { icon: 'fas fa-thermometer-half', text: 'КПД: 92%' },
          { icon: 'fas fa-cogs', text: 'Автоматизация: полная' }
      ]
  },
  'cleaning-1': {
      title: 'Очистные сооружения для предприятия',
      location: 'Свердловская область',
      description: 'Строительство комплекса очистных сооружений для промышленного предприятия.',
      images: [
          { src: 'images/works/cleaning-1-1.jpg', alt: 'Земляные работы' },
          { src: 'images/works/cleaning-1-2.jpg', alt: 'Монтаж резервуаров' },
          { src: 'images/works/cleaning-1-3.jpg', alt: 'Установка насосов' },
          { src: 'images/works/cleaning-1-4.jpg', alt: 'Монтаж фильтров' }
      ],
      specs: [
          { icon: 'fas fa-tint', text: 'Производительность: 100 м³/сут' },
          { icon: 'fas fa-recycle', text: 'Степень очистки: 98%' },
          { icon: 'fas fa-calendar-alt', text: 'Срок: 4 месяца' },
          { icon: 'fas fa-microscope', text: 'Контроль: лабораторный' }
      ]
  },
  'energy-1': {
      title: 'Автономный энергомодуль',
      location: 'Республика Коми',
      description: 'Поставка и монтаж автономного энергомодуля для удаленного поселка.',
      images: [
          { src: 'images/works/energy-1-1.jpg', alt: 'Доставка модуля' },
          { src: 'images/works/energy-1-2.jpg', alt: 'Установка на фундамент' },
          { src: 'images/works/energy-1-3.jpg', alt: 'Подключение коммуникаций' },
          { src: 'images/works/energy-1-4.jpg', alt: 'Запуск системы' }
      ],
      specs: [
          { icon: 'fas fa-bolt', text: 'Мощность: 1 МВт' },
          { icon: 'fas fa-gas-pump', text: 'Топливо: дизель' },
          { icon: 'fas fa-calendar-alt', text: 'Срок: 1.5 месяца' },
          { icon: 'fas fa-home', text: 'Обслуживает: 50 домов' }
      ]
  }
};

// Текущее состояние галереи
let currentProject = null;
let currentImageIndex = 0;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  initGallery();
});

// Инициализация галереи
function initGallery() {
  // Кнопки открытия галереи
  const galleryButtons = document.querySelectorAll('.gallery-btn');
  
  galleryButtons.forEach(button => {
      button.addEventListener('click', function() {
          const projectId = this.getAttribute('data-project');
          openGallery(projectId);
      });
  });
  
  // Кнопка закрытия модального окна
  const closeButton = document.getElementById('closeModal');
  if (closeButton) {
      closeButton.addEventListener('click', closeGallery);
  }
  
  // Закрытие по клику на overlay
  const overlay = document.getElementById('galleryModal');
  if (overlay) {
      overlay.addEventListener('click', function(e) {
          if (e.target === this) {
              closeGallery();
          }
      });
  }
  
  // Закрытие по клавише ESC
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
          closeGallery();
      }
  });
  
  // Кнопки навигации
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn) {
      prevBtn.addEventListener('click', showPrevImage);
  }
  
  if (nextBtn) {
      nextBtn.addEventListener('click', showNextImage);
  }
}

// Открытие галереи
function openGallery(projectId) {
  const project = projectsGallery[projectId];
  if (!project) return;
  
  currentProject = project;
  currentImageIndex = 0;
  
  // Обновляем данные в модальном окне
  document.getElementById('modalProjectTitle').textContent = project.title;
  document.getElementById('modalProjectLocation').textContent = project.location;
  document.getElementById('modalProjectLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${project.location}`;
  document.getElementById('modalProjectDescription').textContent = project.description;
  
  // Обновляем спецификации
  updateSpecs(project.specs);
  
  // Обновляем изображения
  updateGalleryImages();
  
  // Показываем модальное окно
  document.getElementById('galleryModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Закрытие галереи
function closeGallery() {
  document.getElementById('galleryModal').classList.remove('active');
  document.body.style.overflow = '';
  currentProject = null;
  currentImageIndex = 0;
}

// Обновление спецификаций
function updateSpecs(specs) {
  const specsContainer = document.getElementById('modalSpecs');
  specsContainer.innerHTML = '';
  
  specs.forEach(spec => {
      const specElement = document.createElement('div');
      specElement.className = 'spec-item-modal';
      specElement.innerHTML = `
          <i class="${spec.icon}"></i>
          <span>${spec.text}</span>
      `;
      specsContainer.appendChild(specElement);
  });
}

// Обновление изображений в галерее
function updateGalleryImages() {
  if (!currentProject) return;
  
  const mainImage = document.getElementById('modalMainImage');
  const thumbnailsContainer = document.getElementById('modalThumbnails');
  
  // Устанавливаем основное изображение
  mainImage.src = currentProject.images[currentImageIndex].src;
  mainImage.alt = currentProject.images[currentImageIndex].alt;
  
  // Обновляем миниатюры
  thumbnailsContainer.innerHTML = '';
  
  currentProject.images.forEach((image, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = `thumbnail ${index === currentImageIndex ? 'active' : ''}`;
      thumbnail.innerHTML = `
          <img src="${image.src}" alt="${image.alt}">
          <div class="thumbnail-overlay">${index + 1}</div>
      `;
      
      thumbnail.addEventListener('click', () => {
          currentImageIndex = index;
          updateGalleryImages();
      });
      
      thumbnailsContainer.appendChild(thumbnail);
  });
  
  // Обновляем состояние кнопок навигации
  updateNavigationButtons();
}

// Показать предыдущее изображение
function showPrevImage() {
  if (!currentProject) return;
  
  currentImageIndex--;
  if (currentImageIndex < 0) {
      currentImageIndex = currentProject.images.length - 1;
  }
  
  updateGalleryImages();
}

// Показать следующее изображение
function showNextImage() {
  if (!currentProject) return;
  
  currentImageIndex++;
  if (currentImageIndex >= currentProject.images.length) {
      currentImageIndex = 0;
  }
  
  updateGalleryImages();
}

// Обновление состояния кнопок навигации
function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!currentProject) return;
  
  // Для красоты - кнопки всегда активны, но можно добавить логику если нужно
}

// Поддержка свайпов на мобильных устройствах
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
  if (currentProject) {
      touchStartX = e.changedTouches[0].screenX;
  }
});

document.addEventListener('touchend', function(e) {
  if (!currentProject) return;
  
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
          // Свайп влево - следующее фото
          showNextImage();
      } else {
          // Свайп вправо - предыдущее фото
          showPrevImage();
      }
  }
}