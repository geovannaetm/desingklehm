

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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogado.token}`
      },
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
    console.error("Erro:", error);
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
