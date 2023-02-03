// const productContainer = document.querySelector('#products-container')
// const categorSort = document.querySelector('.category-sort')

// async function getBooks() {

//   const response = await fetch('http://myjson.dit.upm.es/api/bins/2uln')
  
//   const productsArray = await response.json()

// }

// getBooks()


// //рендер списка товаров
// function renderProducts(productArray) {
//   productContainer.innerHTML=''
//   productArray.forEach((item) => {
//     const productItem = `
//               <div class="product__item" data-filter="${item.type}" data-myorder="${item.id}" data-id="${item.id}">
//                 <img class="product__item-img" src="images/${item.img}" alt="">
//                 <div class="product__item-text">
//                   <p class="item-text__title">
//                     ${item.title}
//                   </p>
//                   <div class="item-text__inner">
//                     <p class="cost">
//                       <span class="cost-summ">${item.price} </span>
//                       руб.
//                     </p>

//                     <button data-cart class="button" type="button">
//                       В корзину
//                     </button>
//                   </div>
//                 </div>
//               </div>
//            `
//     productContainer.insertAdjacentHTML('beforeend', productItem)
//   });
// }



