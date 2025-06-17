

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

// Login
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
      showTooltip(`Bem-vindo, ${data.nome}!`, 'success');
      usuarioLogado = data;
      localStorage.setItem('usuarioLogado', JSON.stringify(data));

      document.getElementById('loginToggle').style.display = 'none';
      document.getElementById('userToggle').style.display = 'inline-block';
      document.getElementById('loginSidebar').classList.remove('active');
    } else {
      showTooltip(data.error || 'Erro ao fazer login', 'error');
    }
  } catch (error) {
    showTooltip('Erro na conexão', 'error');
  }
});

// Atualizar dados do usuário
document.getElementById('updateForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const novoNome = document.getElementById('novoNome').value;
  const novaSenha = document.getElementById('novaSenha').value;

  if (!usuarioLogado) {
    showTooltip("Você precisa estar logado." , 'error');
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/usuario/${usuarioLogado.email}`, { // aqui id no lugar de email
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogado.token}`
      },
      body: JSON.stringify({ nome: novoNome, senha: novaSenha })
    });

    const data = await response.json();

    if (response.ok) {
      showTooltip("Dados atualizados com sucesso!" , 'success');
      usuarioLogado.nome = data.nome;
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    } else {
      showTooltip(data.error || "Erro ao atualizar.", 'error');
    }
  } catch (error) {
    showTooltip("Erro na atualização.", 'error');
    console.error("Erro:", error);
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  usuarioLogado = null;

  document.getElementById('loginToggle').style.display = 'inline-block';
  document.getElementById('userToggle').style.display = 'none';
  document.getElementById('userSidebar').classList.remove('active');

  showTooltip("Você saiu da conta." , 'success');
});

// Excluir conta
document.getElementById('deleteAccountBtn').addEventListener('click', async () => {
  if (!usuarioLogado || !usuarioLogado.id) {
    showTooltip("Você precisa estar logado." , 'error');
    return;
  }


  try {
    const response = await fetch(`http://localhost:4000/usuario/${usuarioLogado.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${usuarioLogado.token}`
      }
    });

    if (response.ok) {
      showTooltip("Conta excluída com sucesso!" , 'success');
      localStorage.removeItem('usuarioLogado');
      usuarioLogado = null;

      document.getElementById('loginToggle').style.display = 'inline-block';
      document.getElementById('userToggle').style.display = 'none';
      document.getElementById('userSidebar').classList.remove('active');
    } else {
      const data = await response.json();
      showTooltip(data.error || "Erro ao excluir conta." , 'error');
    }
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    showTooltip("Erro na conexão ao tentar excluir." , 'error');
  }
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
        showTooltip('Cadastro realizado com sucesso!' , 'success');
        document.getElementById('register').reset(); // Limpa o formulário
      } else {
        const errorData = await response.json();
        showTooltip('Erro ao cadastrar: ' + (errorData.message || response.statusText), 'error');
      }
    } catch (error) {
      showTooltip('Erro ao conectar com o servidor: ' + error.message , 'error');
    }


});


//tolltip
function showTooltip(message, type = 'success', duration = 3000) {
    const tooltip = document.getElementById('custom-tooltip');
    const overlay = document.getElementById('tooltip-overlay');

    tooltip.textContent = message;
    tooltip.className = ''; 
    tooltip.classList.add(type);

   
    overlay.classList.add('show');
    tooltip.classList.add('show');

    // Animação
    tooltip.style.transform = 'translateX(-50%) translateY(-20px)';
    requestAnimationFrame(() => {
      tooltip.style.transform = 'translateX(-50%) translateY(0)';
      tooltip.style.opacity = '1';
    });

   
    setTimeout(() => {
      tooltip.classList.remove('show');
      overlay.classList.remove('show');
      tooltip.style.transform = 'translateX(-50%) translateY(-20px)';
      tooltip.style.opacity = '0';
    }, duration);
  }

  