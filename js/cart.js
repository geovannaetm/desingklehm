// ===== Função para exibir o carrinho no sidebar ===== //
async function updateCartUI() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuario?.token) return;

  try {
    const res = await fetch('http://localhost:4000/carrinho', {
      headers: { 'Authorization': `Bearer ${usuario.token}` }
    });
    if (!res.ok) throw new Error('Falha ao obter itens do carrinho');
    const cartItems = await res.json();

    cartSidebar.innerHTML = '<h3>Meu Carrinho</h3>';

    if (cartItems.length === 0) {
      cartSidebar.innerHTML += '<p>Carrinho vazio.</p>';
      return;
    }

    const ul = document.createElement('ul');

    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.dataset.unidadeId = item.produto_unidade_id;
      li.innerHTML = `
        <span>${item.nome} – Tamanho ${item.tamanho}</span>
        <div>
          <button class="qty-btn decrease">–</button>
          <span class="qty">${item.quantidade}</span>
          <button class="qty-btn increase">+</button>
          <button class="remove-btn">✕</button>
        </div>
      `;
      ul.appendChild(li);
    });

    cartSidebar.appendChild(ul);

    // Adiciona listeners nos botões
    cartSidebar.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const li = btn.closest('li');
        const unitId = li.dataset.unidadeId;
        const delta = btn.classList.contains('increase') ? 1 : -1;
        await fetch(`http://localhost:4000/carrinho/${unitId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`
          },
          body: JSON.stringify({ produto_unidade_id: unitId, delta })
        });
        await updateCartUI();
      });
    });

    cartSidebar.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const unitId = btn.closest('li').dataset.unidadeId;
        await fetch(`http://localhost:4000/carrinho/${unitId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${usuario.token}` }
        });
        await updateCartUI();
      });
    });

  } catch (err) {
    console.error(err);
    alert('Erro ao atualizar o carrinho');
  }
}
