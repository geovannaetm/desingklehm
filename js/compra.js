// ========== CONFIGURAÇÃO INICIAL ========== //
const addBtn = document.getElementById('addToCartBtn');
const sizeRadios = document.querySelectorAll('input[name="ringSize"]');
const cartSidebar = document.getElementById('cartSidebar');
const ringForm = document.getElementById('ringForm');

// ========== CONTROLE DO BOTÃO ========== //
function checkSizeSelection() {
  const anySizeSelected = Array.from(sizeRadios).some(radio => radio.checked);
  if (addBtn) {
    addBtn.disabled = !anySizeSelected;
    console.log('Estado do botão:', addBtn.disabled ? 'desabilitado' : 'habilitado');
  }
}

// Adiciona eventos aos radios
sizeRadios.forEach(radio => {
  radio.addEventListener('change', checkSizeSelection);
});

// ========== ADICIONAR AO CARRINHO ========== //
addBtn?.addEventListener('click', async (e) => {
  e.preventDefault();
  
  // Verificação do usuário logado
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuario?.token) {
    alert('Faça login para adicionar itens ao carrinho');
    document.getElementById('loginToggle')?.click();
    return;
  }

  // Validação do tamanho selecionado
  const selectedSize = document.querySelector('input[name="ringSize"]:checked')?.value;
  if (!selectedSize) {
    alert('Selecione um tamanho');
    return;
  }

  try {
    // Validação do ID do produto
    if (!window.currentProductId) {
      throw new Error('ID do produto não definido');
    }

    // Busca o produto e suas variações
    const produtoRes = await fetch(`http://localhost:4000/produtos/${window.currentProductId}`, {
      headers: { 'Authorization': `Bearer ${usuario.token}` }
    });
    
    if (!produtoRes.ok) throw new Error('Produto não encontrado');
    
    const { unidades = [] } = await produtoRes.json();
    const unidade = unidades.find(u => u.tamanho === String(selectedSize));
    
    if (!unidade) throw new Error(`Tamanho ${selectedSize} indisponível`);

    // Adiciona ao carrinho
    const res = await fetch('http://localhost:4000/carrinho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuario.token}`
      },
      body: JSON.stringify({ 
        produto_unidade_id: unidade.id, 
        quantidade: 1 
      })
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || 'Erro ao adicionar ao carrinho');
    }

    // Feedback visual
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.textContent = '✔ Item adicionado!';
    addBtn.parentNode.appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 2000);
    
    // Atualização do carrinho
    if (typeof updateCartUI === 'function') {
      await updateCartUI();
    }

  } catch (error) {
    console.error('Erro:', error);
    alert(error.message);
  }
});