
  // ESCOLHER TAMNHO DO PRODUTO
  
  
  document.addEventListener('DOMContentLoaded', () => {
      const radios = document.querySelectorAll('input[name="ringSize"]');
      const addToCartBtn = document.getElementById('addToCartBtn');

      radios.forEach(radio => {
        radio.addEventListener('change', () => {
          console.log('clicou em', radio.id);
          const anyChecked = Array.from(radios).some(r => r.checked);
          addToCartBtn.disabled = !anyChecked;
        });
      });


    });