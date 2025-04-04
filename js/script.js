// Отримуємо посилання на контейнер, у який будемо додавати картки
const board = document.getElementById('board');

// Масив для зберігання всіх створених карток
let cards = [];

// Масив для збереження двох відкритих карток, щоб їх порівняти
let flippedCards = [];

// Лічильник знайдених пар
let matchedPairs = 0;

// Загальна кількість пар у грі (8 пар, тобто 16 карток)
let totalPairs = 8;

function createBoard() {
    const numbers = [];
    
    // Заповнюємо масив парними числами (1,1, 2,2, ..., 8,8)
    for (let i = 1; i <= totalPairs; i++) {
        numbers.push(i, i);
    }

    // Перемішуємо масив випадковим чином
    numbers.sort(() => Math.random() - 0.5);
    
    // Створюємо картки на основі перемішаного масиву
    numbers.forEach(num => {
        const card = document.createElement('div'); // Створюємо елемент <div>
        card.classList.add('card'); // Додаємо клас "card"
        card.dataset.number = num; // Зберігаємо значення числа в атрибуті data-number
        card.textContent = ''; // Робимо картку порожньою (без числа)
        card.addEventListener('click', flipCard); // Додаємо подію кліку
        board.appendChild(card); // Додаємо картку до ігрового поля
        cards.push(card); // Зберігаємо картку в масиві
    });
}

function flipCard(event) {
    const clickedCard = event.target; // Отримуємо картку, на яку натиснули
    // Якщо вже відкрито дві картки або картка вже відкрита — виходимо з функції
    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped')) {
        return;
    }
    // Додаємо клас "flipped" (відкрита картка)
    clickedCard.classList.add('flipped');

    // Відображаємо число, яке приховано в dataset
    clickedCard.textContent = clickedCard.dataset.number;

    // Додаємо відкриту картку до масиву
    flippedCards.push(clickedCard);

    // Якщо відкрито дві картки, перевіряємо їхню відповідність
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards; // Беремо дві відкриті картки

    // Якщо значення карток однакові — це пара
    if (card1.dataset.number === card2.dataset.number) {
        matchedPairs++; // Збільшуємо лічильник знайдених пар
        
        // Якщо всі пари знайдені, виводимо повідомлення про перемогу
        if (matchedPairs === totalPairs) {
            setTimeout(() => alert('Вітаємо, ви виграли!'), 500);
        }

        flippedCards = []; // Очищаємо масив відкритих карток
    } else {
        // Якщо картки різні, закриваємо їх через секунду
        setTimeout(() => {
            card1.classList.remove('flipped'); // Прибираємо клас "flipped"
            card2.classList.remove('flipped');
            card1.textContent = ''; // Ховаємо число
            card2.textContent = '';
            flippedCards = []; // Очищаємо масив відкритих карток
        }, 1000);
    }
}

// Функція для перезапуску гри
function resetGame() {
    matchedPairs = 0; // Обнуляємо кількість знайдених пар
    flippedCards = []; // Очищаємо масив відкритих карток
    board.innerHTML = ''; // Очищаємо ігрове поле
    createBoard(); // Створюємо нову гру
}

// Запускаємо створення ігрового поля при завантаженні сторінки
createBoard(); 
let animalCount = 0;

document.querySelectorAll('.animal-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const animalType = event.target.dataset.animal;
        addAnimal(animalType);
    });
});


function addAnimal(animalType) {
    const grass = document.getElementById('grass');
    const animalDiv = document.createElement('div');
    animalDiv.classList.add('animal');
    
    const animalImg = document.createElement('img');
    animalImg.src = `/img/${animalType}.jpg`; // Замініть на реальний шлях до зображення
    animalDiv.appendChild(animalImg);
    
    grass.appendChild(animalDiv);
    
    animalDiv.style.top = `${Math.random() * (grass.clientHeight - 50)}px`;
    animalDiv.style.left = `${Math.random() * (grass.clientWidth - 50)}px`;

    animalCount++;
    updateAnimalCount();

    makeDraggable(animalDiv);
    makeMovable(animalDiv);
}

function makeDraggable(animalDiv) {
    let isDragging = false;
    let offsetX, offsetY;

    animalDiv.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - animalDiv.offsetLeft;
        offsetY = event.clientY - animalDiv.offsetTop;
        animalDiv.classList.add('dragging');
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            animalDiv.style.left = `${event.clientX - offsetX}px`;
            animalDiv.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        animalDiv.classList.remove('dragging');
    });
}

function makeMovable(animalDiv) {
    // Задаємо тваринам рух по екрану
    setInterval(() => {
        let randomDirection = Math.floor(Math.random() * 4); // 0 - вниз, 1 - вгору, 2 - вліво, 3 - вправо
        let randomDistance = Math.floor(Math.random() * 10) + 1;

        switch (randomDirection) {
            case 0:
                animalDiv.style.top = `${parseInt(animalDiv.style.top) + randomDistance}px`;
                break;
            case 1:
                animalDiv.style.top = `${parseInt(animalDiv.style.top) - randomDistance}px`;
                break;
            case 2:
                animalDiv.style.left = `${parseInt(animalDiv.style.left) - randomDistance}px`;
                break;
            case 3:
                animalDiv.style.left = `${parseInt(animalDiv.style.left) + randomDistance}px`;
                break;
        }
    }, 100);
}

function updateAnimalCount() {
    document.getElementById('animal-count').innerText = animalCount;
}


