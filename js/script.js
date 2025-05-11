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



