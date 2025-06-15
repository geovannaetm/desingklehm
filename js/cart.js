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

    // Estrutura base do carrinho
    cartSidebar.innerHTML = `
      <div class="start-carrinho">
        <h2>CARRINHO</h2>
        <button class="close-btn" id="closeCart">X</button>
      </div>
      <hr>
      <div class="cart-items-container"></div>
      <div class="subtotal">
        <p>Subtotal</p>
        <h3>R$ 0,00</h3>
      </div>
      <button class="finalize-btn"><span>Finalizar</span></button>
    `;

    const container = cartSidebar.querySelector('.cart-items-container');
    let subtotal = 0;

    if (cartItems.length === 0) {
      container.innerHTML = '<p>Carrinho vazio.</p>';
      return;
    }

    // Adiciona cada item do carrinho
    cartItems.forEach(item => {
      const price = parseFloat(item.produtoUnidade?.preco) || 0;
      const itemTotal = price * item.quantidade;
      subtotal += itemTotal;

      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.dataset.unidadeId = item.produto_unidade_id;
      itemElement.innerHTML = `
        <img src="${item.produtoUnidade?.produto?.foto || 'img/bracelete-carrinho.png'}" 
             alt="${item.produtoUnidade?.produto?.nome_do_produto || 'Produto'}" 
             class="product-image">
        <div class="product-details">
          <h3>${item.produtoUnidade?.produto?.nome_do_produto || 'Produto'}</h3>
          <p>Tamanho: ${item.produtoUnidade?.tamanho || 'Único'}</p>
          <h3>R$ ${price.toFixed(2).replace('.', ',')}</h3>
          <div class="quantity-controls">
            <button class="remove-btn"><img src="img/icons8-lixeira-25.png" alt="Remover"></button>
            <span>${item.quantidade}</span>
            <button class="add-btn"><img src="img/icons8-add-25.png" alt="Adicionar"></button>
          </div>
        </div>
      `;
      container.appendChild(itemElement);
    });

    // Atualiza subtotal
    cartSidebar.querySelector('.subtotal h3').textContent = 
      `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    // Adiciona eventos aos botões
    container.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const unitId = btn.closest('.cart-item').dataset.unidadeId;
        await updateCartItem(unitId, 1, usuario.token);
      });
    });

    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const unitId = btn.closest('.cart-item').dataset.unidadeId;
        await deleteCartItem(unitId, usuario.token);
      });
    });

    // Evento para finalizar compra
    cartSidebar.querySelector('.finalize-btn').addEventListener('click', () => {
      alert('Compra finalizada com sucesso!');
      // Aqui você pode adicionar a lógica de finalização
    });

  } catch (err) {
    console.error(err);
    alert('Erro ao atualizar o carrinho');
  }
}

// Função auxiliar para atualizar quantidade
async function updateCartItem(unitId, delta, token) {
  try {
    const res = await fetch(`http://localhost:4000/carrinho/${unitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantidade: delta })
    });
    
    if (!res.ok) throw new Error('Falha ao atualizar item');
    await updateCartUI();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

// Função auxiliar para remover item
async function deleteCartItem(unitId, token) {
  try {
    const res = await fetch(`http://localhost:4000/carrinho/${unitId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!res.ok) throw new Error('Falha ao remover item');
    await updateCartUI();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

// Inicialização do carrinho
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cartSidebar')) {
    updateCartUI();
  }
});