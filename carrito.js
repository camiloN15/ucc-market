// Manejo simple y consistente del carrito usando localStorage.
const CART_KEY = 'cart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Añade un producto al carrito; si ya existe incrementa la cantidad.
function addToCart(id, name, price, image, quantity = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity = (existing.quantity || 0) + Number(quantity);
    } else {
        cart.push({ id, name, price, image, quantity: Number(quantity) });
    }
    saveCart(cart);
    updateCartCounter();
    // Mensaje leve; opcional para UX
    try { window.alert('Producto agregado al carrito'); } catch (e) {}
}

function updateCartCounter() {
    const cart = getCart();
    const totalItems = cart.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon) return;
    // Preferir atributo data-count (CSS usa ::after attr(data-count))
    cartIcon.setAttribute('data-count', totalItems);
    // También mantener una etiqueta visual si existe código previo que la use
    const span = cartIcon.querySelector('.cart-counter');
    if (span) span.textContent = totalItems || '';
}

function updateQuantity(id, newQuantity) {
    let cart = getCart();
    if (newQuantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    } else {
        const item = cart.find(i => i.id === id);
        if (item) item.quantity = Number(newQuantity);
    }
    saveCart(cart);
    updateCartCounter();
    if (document.getElementById('cart-content') && typeof renderCart === 'function') {
        renderCart();
    }
}

function removeFromCart(id) {
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    updateCartCounter();
    if (document.getElementById('cart-content') && typeof renderCart === 'function') {
        renderCart();
    }
}

// Formatea precio en COP
function formatPrice(price) {
    return '$ ' + Number(price).toLocaleString('es-CO');
}

// Inicializar contador al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            const cart = getCart();
            const total = cart.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
            if (!cart.length) { alert('Tu carrito está vacío'); return; }
            let user = null; try { user = JSON.parse(localStorage.getItem('currentUser')||'null'); } catch(e){}
            const lines = [];
            lines.push('Nuevo pedido UCCMARKET');
            if (user) lines.push('Cliente: ' + (user.name || user.email));
            cart.forEach(it => {
                lines.push('- ' + (it.name||'') + ' x' + (Number(it.quantity)||1) + ' = $ ' + Number((Number(it.price)||0) * (Number(it.quantity)||1)).toLocaleString('es-CO'));
            });
            lines.push('Total: $ ' + Number(total).toLocaleString('es-CO'));
            const msg = encodeURIComponent(lines.join('\n'));
            const url = 'https://wa.me/573007845042?text=' + msg;
            window.open(url, '_blank');
        });
    }
    if (document.querySelector('.cart-items')) {
        renderCart();
    }
    initSearchBar();
});

// Renderiza la vista del carrito en la página `carrito.html`
function renderCart() {
    const container = document.querySelector('.cart-items');
    if (!container) return;
    const cart = getCart();
    container.innerHTML = '';

    if (cart.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'cart-empty';
        empty.textContent = 'Tu carrito está vacío.';
        container.appendChild(empty);
    }

    let subtotal = 0;

    cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item';

        const img = document.createElement('img');
        img.src = item.image || '';
        img.alt = item.name || '';
        img.style.width = '100px';
        img.style.height = 'auto';

        const details = document.createElement('div');
        details.className = 'item-details';
        details.innerHTML = `
            <div class="item-name">${item.name || ''}</div>
            <div class="item-price">${formatPrice(item.price)}</div>
        `;

        const qty = document.createElement('div');
        qty.className = 'item-quantity';

        const dec = document.createElement('button');
        dec.textContent = '-';
        dec.addEventListener('click', () => {
            const newQty = (Number(item.quantity) || 1) - 1;
            updateQuantity(item.id, newQty);
            renderCart();
        });

        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.value = item.quantity || 1;
        qtyInput.min = 1;
        qtyInput.addEventListener('change', () => {
            const v = Number(qtyInput.value) || 1;
            updateQuantity(item.id, v);
            renderCart();
        });

        const inc = document.createElement('button');
        inc.textContent = '+';
        inc.addEventListener('click', () => {
            const newQty = (Number(item.quantity) || 1) + 1;
            updateQuantity(item.id, newQty);
            renderCart();
        });

        qty.appendChild(dec);
        qty.appendChild(qtyInput);
        qty.appendChild(inc);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-item';
        removeBtn.textContent = '✖';
        removeBtn.addEventListener('click', () => {
            removeFromCart(item.id);
            renderCart();
        });

        row.appendChild(img);
        row.appendChild(details);
        row.appendChild(qty);
        row.appendChild(removeBtn);

        container.appendChild(row);

        subtotal += (Number(item.price) || 0) * (Number(item.quantity) || 1);
    });

    // Actualizar resumen
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (totalEl) totalEl.textContent = formatPrice(subtotal); // sin envío
}

function getProductsDB(){
    var db=[];try{db=JSON.parse(localStorage.getItem('productosDB_v1')||'[]');}catch(e){}
    if(!db.length&&typeof productos==='object'){try{db=Object.entries(productos).map(function(pair){var id=pair[0],p=pair[1];return Object.assign({id:id},p);});localStorage.setItem('productosDB_v1',JSON.stringify(db));}catch(e){}}
    return db;
}

function initSearchBar(){
    var sb=document.querySelector('.search-bar');if(!sb)return;var input=sb.querySelector('input');if(!input)return;var btn=sb.querySelector('button');
    sb.style.position='relative';
    var dd=document.createElement('div');dd.className='search-dropdown';dd.style.position='absolute';dd.style.top='100%';dd.style.left='0';dd.style.right='0';dd.style.background='#fff';dd.style.border='1px solid #ddd';dd.style.zIndex='1000';dd.style.maxHeight='240px';dd.style.overflowY='auto';dd.style.display='none';
    sb.appendChild(dd);
    function render(q){var list=getProductsDB().filter(function(p){return (p.name||'').toLowerCase().includes(q.toLowerCase());});dd.innerHTML='';if(!q||!list.length){dd.style.display='none';return;}list.slice(0,8).forEach(function(p){var item=document.createElement('div');item.style.padding='8px 10px';item.style.cursor='pointer';item.innerHTML='<strong>'+(p.name||'')+'</strong><br><small>$ '+Number(p.price||0).toLocaleString('es-CO')+'</small>';item.addEventListener('click',function(){window.location.href='producto.html?id='+p.id;});dd.appendChild(item);});dd.style.display='block';}
    input.addEventListener('input',function(){render(input.value.trim());});
    document.addEventListener('click',function(ev){if(!sb.contains(ev.target))dd.style.display='none';});
    input.addEventListener('keydown',function(ev){if(ev.key==='Escape')dd.style.display='none';});
    if(btn){btn.addEventListener('click',function(){var q=input.value.trim();if(!q)return;var list=getProductsDB().filter(function(p){return (p.name||'').toLowerCase().includes(q.toLowerCase());});if(list.length)window.location.href='producto.html?id='+list[0].id;});}
}