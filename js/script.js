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






//campo login 


document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;
  

  try {
    const response = await fetch('http://localhost:4000/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Bem-vindo , ${data.nome}!`);
    } else {
      alert(data.error || 'Erro desconhecido');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Erro ao fazer login. Tente novamente.');
  }
});


///////////////////////////sidebar do usuario/////////////////////


       let usuarioLogado = null;

    document.addEventListener('DOMContentLoaded', () => {
      const loginToggle = document.getElementById('loginToggle');
      const loginSidebar = document.getElementById('loginSidebar');
      const closeLogin = document.getElementById('closeLogin');

      const userToggle = document.getElementById('userToggle');
      const userSidebar = document.getElementById('userSidebar');
      const closeUser = document.getElementById('closeUser');

      const dados = localStorage.getItem('usuarioLogado');
      if (dados) {
        usuarioLogado = JSON.parse(dados);
        loginToggle.style.display = 'none';
        userToggle.style.display = 'inline-block';
      }

      loginToggle.addEventListener('click', () => {
        loginSidebar.classList.add('active');
      });

      closeLogin.addEventListener('click', () => {
        loginSidebar.classList.remove('active');
      });

      userToggle.addEventListener('click', () => {
        userSidebar.classList.add('active');
      });

      closeUser.addEventListener('click', () => {
        userSidebar.classList.remove('active');
      });

      document.addEventListener('click', (e) => {
        if (!loginSidebar.contains(e.target) && !loginToggle.contains(e.target)) {
          loginSidebar.classList.remove('active');
        }
        if (!userSidebar.contains(e.target) && !userToggle.contains(e.target)) {
          userSidebar.classList.remove('active');
        }
      });
    });

    document.getElementById('loginForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('login-email').value;
      const senha = document.getElementById('login-senha').value;

      try {
        const response = await fetch('http://localhost:4000/usuario/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
          alert(`Bem-vindo, ${data.nome}!`);
          usuarioLogado = data;
          localStorage.setItem('usuarioLogado', JSON.stringify(data));

          document.getElementById('loginToggle').style.display = 'none';
          document.getElementById('userToggle').style.display = 'inline-block';
          document.getElementById('loginSidebar').classList.remove('active');
        } else {
          alert(data.error || 'Erro ao fazer login');
        }
      } catch (error) {
        alert('Erro na conexão');
      }
    });

    document.getElementById('updateForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      const novoNome = document.getElementById('novoNome').value;
      const novaSenha = document.getElementById('novaSenha').value;

      if (!usuarioLogado) {
        alert("Você precisa estar logado.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/usuario/${usuarioLogado.email}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: novoNome, senha: novaSenha })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Dados atualizados com sucesso!");
          usuarioLogado.nome = data.nome;
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        } else {
          alert(data.error || "Erro ao atualizar.");
        }
      } catch (error) {
        alert("Erro na atualização.");
      }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('usuarioLogado');
      usuarioLogado = null;

      document.getElementById('loginToggle').style.display = 'inline-block';
      document.getElementById('userToggle').style.display = 'none';
      document.getElementById('userSidebar').classList.remove('active');

      alert("Você saiu da conta.");
    });





// CAMPO CADASTRO


document.getElementById('register').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  
    const nome = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const senha = document.getElementById('register-password').value;

    const payload = {
      nome,
      email,
      senha
    };

    try {
      const response = await fetch('http://localhost:4000/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        document.getElementById('register').reset(); // Limpa o formulário
      } else {
        const errorData = await response.json();
        alert('Erro ao cadastrar: ' + (errorData.message || response.statusText));
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor: ' + error.message);
    }


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


//////   FUNCIONALIDADE CARINHO  /////
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
