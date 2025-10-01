document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { id: 'hamburguer', name: '🍔Hambúrguer', price: 10.00 },
        { id: 'fries', name: '🍟Batata Frita', price: 5.00 },
        { id: 'soda', name: '🥤Refrigerante', price: 3.00 },
        { id: 'pizza', name: '🍕Pizza', price: 15.00 },
        { id: 'hotdog', name: '🌭Cachorro-Quente', price: 7.00 },
        { id: 'icecream', name: '🍦Sorvete', price: 4.00 }
    ];
    const itemList = document.getElementById('item-list');
    const totalElement = document.getElementById('total');
    const paidAmountInput = document.getElementById('paid-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    const changeDueElement = document.getElementById('change-due');

    function renderMenu() {
        menuItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
        <span class="item-name">${item.name} -
        R$ ${item.price.toFixed(2)}</span>
            <div class="item-quantity">
        <input type="number" id="${item.id}" min="0" value="0"
        data-price="${item.price}">
        </div>
        `;
        itemList.appendChild(itemDiv);
        });
    }
    function updateTotal() {
        let total = 0;
        const quantityInputs =
        itemList.querySelectorAll('input[type="number"]');
        quantityInputs.forEach(input => {
            const quantity = parseInt(input.value) || 0;
            const price = parseFloat(input.dataset.price) || 0;
            total += quantity * price;
        });
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
        changeDueElement.textContent = 'R$ 0.00';
        changeDueElement.classList.remove('error');
    }

    function handleCheckout() {
        const totalText = totalElement.textContent.replace('R$ ', '');
        const total = parseFloat(totalText) || 0;
        const paidAmount = parseFloat(paidAmountInput.value) || 0;
        if (paidAmount < total) {
            changeDueElement.textContent ='Valor pago insuficiente!';
            changeDueElement.classList.add('error');
            return;
        }
        const change = paidAmount - total;
        changeDueElement.textContent = `R$ ${change.toFixed(2)}`;
        changeDueElement.classList.remove('error');
    }

    renderMenu();

    itemList.addEventListener('input', updateTotal);
    checkoutBtn.addEventListener('click', handleCheckout);
});