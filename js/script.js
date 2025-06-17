///////////////////// SIDEBAR DO MENU /////////////////////

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


///////////////////// SIDEBAR DO CARRINHO /////////////////////

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



///////////////////// SIDEBAR DO login /////////////////////

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

///////////////////// SIDEBAR DO CADASTRO /////////////////////

document.addEventListener('DOMContentLoaded', function () {
  const cadastrarToggle = document.getElementById('cadastrarToggle');
  const cadastrarSidebar = document.getElementById('cadastrarSidebar');
  const closeCastrar = document.getElementById('closeCastrar');

  // Abrir o sidebar
  cadastrarToggle.addEventListener('click', function () {
    cadastrarSidebar.classList.add('active');
  });

  // Fechar o sidebar ao clicar no botão de fechar
  closeCastrar.addEventListener('click', function () {
    cadastrarSidebar.classList.remove('active');
  });

  // Fechar o sidebar ao clicar fora dele
  document.addEventListener('click', function (e) {
    if (!cadastrarSidebar.contains(e.target) && !cadastrarToggle.contains(e.target)) {
      cadastrarSidebar.classList.remove('active');
    }
  });
});









//////////    CARROSEL  //////////

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




/////////  BARRA DE PESQUISA  //////////

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
