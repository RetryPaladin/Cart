document.body.onload = nameDisplayCheck;

const cart = document.querySelector('.cart')
const cartInnerItems = document.querySelector('.cart__items')

//Переносим товар в корзину по клику на кнопку
window.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-cart')) {
    const product = event.target.closest('.product__item')
    const productInfo = {
      id: product.dataset.id,
      img: product.querySelector('.product__item-img').getAttribute('src'),
      title: product.querySelector('.item-text__title').innerText,
      items: 1,
      price: product.querySelector('.cost-summ').innerText,
    }

    //Проверяем, есть ли товар уже в корзине, если да, то у величеваем счетчик количества товаров
    const itemInCart = cartInnerItems.querySelector(`[data-id="${productInfo.id}"]`)
    if (itemInCart) {
      const counterElement = itemInCart.querySelector('.counter')
      counterElement.innerText = parseInt(counterElement.innerText) + 1
    } else {
      const cartItem = `<div data-id="${productInfo.id}" class="cart__item">
                <div class="cart__item-text">
                  <p class="cart__item-title">
                 ${productInfo.title}
                  </p>
                  <p class="cart__item-counter">
                    <span data-counter class="counter">${productInfo.items}</span> шт.
                  </p>
                  <p class="cost-item">
                    <span class="cost-item-summ">${productInfo.price}</span>
                    руб.
                  </p>
                </div>

                <button data-action="delete" class="cross-button">
                  <img data-action="delete" src="images/cross.svg" alt="">
                </button>
              </div>`
      cartInnerItems.insertAdjacentHTML('beforeend', cartItem)
    }
  }

  //Кнопа удаления
  if (event.target.dataset.action === 'delete') {
    event.target.closest('.cart__item').remove()
    toggleCart()
  }
  toggleCart()
  calcPrice()
  localStorage.setItem('name1', cartInnerItems.innerHTML);
})

//Хранение состояния на клиенте
function nameDisplayCheck() {
  if (localStorage.getItem('name')) {
    let name = localStorage.getItem('name');
    summ.innerText = name
  }

  if (localStorage.getItem('name1')) {
    let name1 = localStorage.getItem('name1');
    cartInnerItems.innerHTML = name1
    toggleCart()
    calcPrice()
  }

  //Обновляение изначальной суммы путем сбрасывания клиента
  const stopClient = document.querySelector('#stop-client')
  stopClient.addEventListener('click', () => {
    localStorage.removeItem('name');
  })

}

//Скрытие или появление корзины
const buyBook = document.querySelector('.cart__buy')
const cartEmpty = document.querySelector('.inner__aout-text')
function toggleCart() {

  if (cartInnerItems.children.length > 0) {
    cartEmpty.classList.add('active')
    buyBook.classList.add('active')
  } else {
    cartEmpty.classList.remove('active')
    buyBook.classList.remove('active')
  }

}

//Высчитывание стоимости товара
function calcPrice() {
  const cattItems = document.querySelectorAll('.cart__item')
  const costCartSumm = document.querySelector('.cost-cart-summ')
  let totalPrice = 0

  cattItems.forEach(function (item) {
    const itemsAll = item.querySelector('.counter')
    const priceAll = item.querySelector('.cost-item-summ')
    const currentPrice = parseInt(itemsAll.innerText) * parseInt(priceAll.innerText)
    totalPrice += currentPrice
  })

  costCartSumm.innerText = totalPrice

  localStorage.setItem('summ', costCartSumm.innerText);
}

//Кнопка покупки
let summ = document.querySelector('.summ')
const buy = document.querySelector('.buy')
buy.addEventListener('click', () => {

  let cartSumm = document.querySelector('.cost-cart-summ')

  if (parseInt(summ.innerText) > parseInt(cartSumm.innerText)) {
    summ.innerText = parseInt(summ.innerText) - parseInt(cartSumm.innerText)
    let cartItems = document.querySelectorAll('.cart__item')
    cartItems.forEach(function (cartItems) {
      cartItems.remove()
    });
    msRight.classList.toggle('active')
  } else {
    msWrong.classList.toggle('active')
  }

  localStorage.setItem('name', summ.innerText);


})


//Бургер для адаптива
const burger = document.querySelector('.toggle-sidebar')
const sidebarToggleBtn = document.querySelector('.menu-icon-wrapper');
const menuIcon = document.querySelector('.menu-icon');


burger.addEventListener('click', () => {
  cart.classList.toggle('active')
  menuIcon.classList.toggle('menu-icon-active')
})

//поисковая строка
const nope = document.querySelector('#noBooks')
document.querySelector('#search').oninput = function () {
  nope.classList.remove('active')
  let val = this.value.trim()
  let items = document.querySelectorAll('.item-text__title')

  if (val != '') {

    items.forEach((elem) => {
      if (elem.innerText.search(val) == -1) {
        elem.closest('.product__item').classList.add('hide')
      } else {
        elem.closest('.product__item').classList.remove('hide')
      }
    });
  }
  else {
    items.forEach((elem) => {
      elem.closest('.product__item').classList.remove('hide')
    });
  }

  let productInner = document.querySelector('.product__inner')

  //Вывод сообщения о том, что поисковая строка не может найти написанный товар
  let j = 0
  for (let i = 0; i < productInner.children.length; i++) {
    if (productInner.children[i].classList.contains('hide')) {

      j += 1
      console.log(j)
      if (j == 12) {
        nope.classList.add('active')
      }
    }
  }
}

//Сортировка по категориям и цене
const categoryClick = document.querySelector('.option__click')
const sortClick = document.querySelector('.option__item')

categoryClick.addEventListener('click', () => {
  let arrow = document.querySelector('.arrow')
  arrow.classList.toggle('active')
  let optionCategory = document.querySelector('.category-sort')
  optionCategory.classList.toggle('active')
})

sortClick.addEventListener('click', () => {
  const optionSort = document.querySelector('.summ-sort')
  optionSort.classList.toggle('active')
})



//сортировка по категориям
$('.category-sort .category__item').on('click', function () {
  let cat = $(this).attr('data-filter'); // определяем категорию
  if (cat == 'all') { // если all
    $('.product__inner .product__item').show(); // отображаем все позиции
  } else { // если не all
    $('.product__inner .product__item').hide(); // скрываем все позиции
    $('.product__inner .product__item[data-filter="' + cat + '"]').show(); // и отображаем 
  }
});

//Выводим и прячем сообщения о покупке
const msRight = document.querySelector('.massege__right')
const buttonRight = document.querySelector('#right')
buttonRight.addEventListener('click', () => {

  msRight.classList.toggle('active')
})

const msWrong = document.querySelector('.massege__wrong')
const buttonWrong = document.querySelector('#wrong')
buttonWrong.addEventListener('click', () => {

  msWrong.classList.toggle('active')
})




