document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('closeSidebar');

  // Abrir o sidebar
  menuToggle.addEventListener('click', function () {
    sidebar.classList.add('active');
  });

  // Fechar o sidebar ao clicar no botão de fechar
  closeBtn.addEventListener('click', function () {
    sidebar.classList.remove('active');
  });

  // Fechar o sidebar ao clicar fora dele
  document.addEventListener('click', function (e) {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });
});




document.addEventListener('DOMContentLoaded', function () {
  const cartToggle = document.getElementById('cartToggle');
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCart = document.getElementById('closeCart');

  // Abrir o sidebar
  cartToggle.addEventListener('click', function () {
    cartSidebar.classList.add('active');
  });

  // Fechar o sidebar ao clicar no botão de fechar
  closeCart.addEventListener('click', function () {
    cartSidebar.classList.remove('active');
  });

  // Fechar o sidebar ao clicar fora dele
  document.addEventListener('click', function (e) {
    if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
      cartSidebar.classList.remove('active');
    }
  });
});





document.addEventListener('DOMContentLoaded', function () {
  const loginToggle = document.getElementById('loginToggle');
  const loginSidebar = document.getElementById('loginSidebar');
  const closeLogin = document.getElementById('closeLogin');

  // Abrir o sidebar
  loginToggle.addEventListener('click', function () {
    loginSidebar.classList.add('active');
  });

  // Fechar o sidebar ao clicar no botão de fechar
  closeLogin.addEventListener('click', function () {
    loginSidebar.classList.remove('active');
  });

  // Fechar o sidebar ao clicar fora dele
  document.addEventListener('click', function (e) {
    if (!loginSidebar.contains(e.target) && !loginToggle.contains(e.target)) {
      loginSidebar.classList.remove('active');
    }
  });
});


//CARROSEL

new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,

  // paginação
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      
    },

     768: {
      slidesPerView: 2,
      
    },

     1024: {
      slidesPerView: 3,
      
    },
    
  },


});


//FUNCIONALIDADE CARINHO
document.addEventListener('DOMContentLoaded', () => {
    const cartItem = document.querySelector('.cart-item');
    const finalizeBtn = document.querySelector('.finalize-btn');
    const quantitySpan = cartItem.querySelector('.quantity-controls span');
    const addButton = cartItem.querySelector('.quantity-controls button:nth-child(3)');
    const removeButton = cartItem.querySelector('.quantity-controls button:nth-child(1)');
    const subtotal = document.querySelector('.subtotal h3');
    const finalizeButton = document.querySelector('.finalize-btn');
  
    if (!cartItem || !quantitySpan || !addButton || !removeButton || !subtotal) {
      console.error('Um ou mais elementos não foram encontrados.');
      return;
    }
  
    let quantity = 1;
    const maxQuantity = 10;
    const price = 230;
  
    function updateCart() {
      quantitySpan.textContent = quantity;
      subtotal.textContent = `R$ ${(price * quantity).toFixed(2)}`;
  
      if (quantity === 0) {
        cartItem.style.display = 'none';
        finalizeBtn.style.display = 'none';
      } else {
        cartItem.style.display = 'flex';
        finalizeBtn.style.display = 'flex';
      }
    }
  
    addButton.addEventListener('click', () => {
      if (quantity < maxQuantity) {
        quantity++;
        updateCart();
      }
    });
  
    removeButton.addEventListener('click', () => {
      if (quantity > 0) {
        quantity--;
        updateCart();
      }
    });
  
    finalizeButton.addEventListener('click', () => {
      alert('Compra finalizada!');
    });
  
    updateCart();
  });
  

//BARRA DE PESQUISA

const searchInput = document.getElementById('search');

const itemsContainer = document.querySelector('.items');

const items = document.querySelectorAll('.items .item-pesquisar');

const noResults = document.getElementById('no_results');


searchInput.addEventListener('input', (event) => {

  const value = formatString(event.target.value);

  let hasResults = false;

  items.forEach(item => {
    if (formatString(item.textContent).includes(value)) {
      item.style.display = 'flex';

      hasResults = true;
    } else {
      item.style.display = 'none';
    }
  });

  noResults.style.display = hasResults ? 'none' : 'block';
});

searchInput.addEventListener('focus', () => {
  itemsContainer.style.display = 'flex';
});

function formatString(value) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
