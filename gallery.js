// gallery.js - Галерея для страницы "Наши работы"

// Данные галерей для каждого проекта
const projectsGallery = {
    'reservoir': {
        title: 'Резервуар для нефтепродуктов',
        location: 'г. Москва',
        description: 'Строительство вертикального стального резервуара для хранения нефтепродуктов. Полный цикл работ от проектирования до пуско-наладки.',
        images: [
            { src: './images/works/reservoir1.jpeg', alt: 'Общий вид резервуара' },
            { src: './images/works/reservoir2.jpeg', alt: 'Монтаж конструкции' },
            { src: './images/works/reservoir3.jpeg', alt: 'Сварные работы' },
            { src: './images/works/reservoir4.jpeg', alt: 'Завершенный проект' },
            { src: './images/works/reservoir5.jpeg', alt: 'Завершенный проект' },
            { src: './images/works/reservoir6.jpeg', alt: 'Завершенный проект' },
            { src: './images/works/reservoir7.jpeg', alt: 'Завершенный проект' },
            { src: './images/works/reservoir8.jpeg', alt: 'Завершенный проект' },
        ]
    },
    'bknp': {
        title: 'Блочная кустовая насосная станция',
        description: 'Проектирование и строительство БКНС для поддержания пластового давления и закачки воды в нефтяные скважины.',
        images: [
            { src: './images/works/bknp1.jpeg', alt: 'Готовая БКНС' },
            { src: './images/works/bknp2.jpeg', alt: 'Насосное оборудование' },
            { src: './images/works/bknp3.jpeg', alt: 'Монтажные работы' }
        ]
    },
    'pipeline': {
        title: 'Строительство трубопровода',
        location: 'Ханты-Мансийский АО',
        description: 'Прокладка трубопровода для транспортировки нефтепродуктов.',
        images: [
            { src: './images/works/pipeline1.jpeg', alt: 'Монтаж труб' },
            { src: './images/works/pipeline2.jpeg', alt: 'Монтаж труб' },
            { src: './images/works/pipeline3.jpeg', alt: 'Монтаж отвода' },
        ]
    },
    'bdr': {
        title: 'Блок дозирования реагентов',
        description: 'Изготовление и монтаж блока дозирования реагентов для автоматического приготовления и подачи химических реагентов.',
        images: [
            { src: './images/works/bdr1.jpeg', alt: 'Готовый блок дозирования' },
            { src: './images/works/bdr2.jpeg', alt: 'Емкости для реагентов' },
            { src: './images/works/bdr3.jpeg', alt: 'Система дозирования' },
            { src: './images/works/bdr4.jpeg', alt: 'Панель управления' }
        ]
    },
    'evaporator': {
        title: 'Блок испарителя',
        location: 'Оренбургская область',
        description: 'Производство и установка блока испарителя для технологических процессов нефтяной и химической промышленности.',
        images: [
            { src: './images/works/evaporator1.jpeg', alt: 'Блок испарителя' },
            { src: './images/works/evaporator2.jpeg', alt: 'Теплообменное оборудование' },
            { src: './images/works/evaporator3.jpeg', alt: 'Монтаж на объекте' },
            { src: './images/works/evaporator4.jpeg', alt: 'Подключение коммуникаций' }
        ]
    },
    'fire': {
        title: 'Блок пожарного инвентаря и оборудования',
        description: 'Изготовление модульного блока для размещения пожарного инвентаря и средств пожаротушения на промышленном объекте.',
        images: [
            { src: './images/works/fire1.jpeg', alt: 'Готовый блок пожарного оборудования' },
            { src: './images/works/fire2.jpeg', alt: 'Внутреннее оснащение' },
            { src: './images/works/fire3.jpg', alt: 'Размещение на площадке' },
            { src: './images/works/fire4.jpg', alt: 'Системы хранения инвентаря' }
        ]
    },
    'apparatus': {
        title: 'Аппаратурные блоки технологические',
        description: 'Производство и монтаж комплектных технологических модулей заводской готовности для нефтедобывающего предприятия.',
        images: [
            { src: './images/works/apparatus1.jpeg', alt: 'Аппаратурный блок' },
            { src: './images/works/apparatus2.jpeg', alt: 'Монтаж оборудования' },
            { src: './images/works/apparatus3.jpeg', alt: 'Доставка' },
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
    if (!project) {
        console.error(`Проект ${projectId} не найден`);
        return;
    }
    
    currentProject = project;
    currentImageIndex = 0;
    
    // Обновляем данные в модальном окне
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectLocation').textContent = project.location;
    document.getElementById('modalProjectLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${project.location}`;
    document.getElementById('modalProjectDescription').textContent = project.description;
    
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
    
    // Всегда активны для циклической навигации
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

