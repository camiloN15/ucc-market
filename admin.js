// admin.js - manejo CRUD para la interfaz de administración

// Clave en localStorage para la base de datos editable
const STORAGE_KEY = 'productosDB_v1';

// Inicializar DB en localStorage a partir de `productos` si no existe
function initDatabase() {
    const current = localStorage.getItem(STORAGE_KEY);
    if (!current) {
        // productos viene de productos.js
        try {
            // Convertir el objeto `productos` (map) a un array con ids
            const arr = Object.entries(productos).map(([id, p]) => ({ id, ...p }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
        } catch (e) {
            console.error('No fue posible inicializar la DB desde productos.js:', e);
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        }
    }
}

function getProducts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveProducts(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function generateId() {
    // ID simple: prefijo + timestamp
    return 'p' + Date.now();
}

// Renderizado de la tabla
function renderTable(filterText = '') {
    const tbody = document.querySelector('#productsTable tbody');
    const products = getProducts();
    tbody.innerHTML = '';

    const filtered = products.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));

    filtered.forEach((p, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${escapeHtml(p.name)}</td>
            <td>${p.quantity ?? 0}</td>
            <td>$ ${Number(p.price).toLocaleString('es-CO')}</td>
            <td>${p.category ?? ''}</td>
            <td>
                <button class="btn-edit" data-id="${p.id}">Editar</button>
                <button class="btn-delete" data-id="${p.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // agregar listeners
    document.querySelectorAll('.btn-edit').forEach(btn => btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        startEdit(id);
    }));
    document.querySelectorAll('.btn-delete').forEach(btn => btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        removeProduct(id);
    }));

    renderStats(products);
}

function renderStats(products) {
    const totalProducts = products.length;
    const totalInventory = products.reduce((s, p) => s + (Number(p.quantity) || 0), 0);
    const categories = new Set(products.map(p => p.category));

    document.getElementById('statTotalProducts').textContent = totalProducts;
    document.getElementById('statTotalInventory').textContent = totalInventory;
    document.getElementById('statCategories').textContent = categories.size;
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Manejo del formulario
function resetForm() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = 0;
    document.getElementById('productPrice').value = 0;
    document.getElementById('productCategory').value = 'laptops';
    document.getElementById('productImage').value = '';
    document.getElementById('productDescription').value = '';
}

function startEdit(id) {
    const products = getProducts();
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    document.getElementById('productId').value = prod.id;
    document.getElementById('productName').value = prod.name;
    document.getElementById('productQuantity').value = prod.quantity ?? 0;
    document.getElementById('productPrice').value = prod.price ?? 0;
    document.getElementById('productCategory').value = prod.category ?? 'laptops';
    document.getElementById('productImage').value = (prod.images && prod.images[0]) ? prod.images[0] : '';
    document.getElementById('productDescription').value = prod.description ?? '';
}

function removeProduct(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    renderTable(document.getElementById('searchInput').value);
}

// Guardar nuevo o editar existente
function handleFormSubmit(ev) {
    ev.preventDefault();
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const quantity = Number(document.getElementById('productQuantity').value) || 0;
    const price = Number(document.getElementById('productPrice').value) || 0;
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value.trim();
    const description = document.getElementById('productDescription').value.trim();

    if (!name) { alert('El nombre es requerido'); return; }

    let products = getProducts();

    if (id) {
        // editar
        const idx = products.findIndex(p => p.id === id);
        if (idx >= 0) {
            products[idx].name = name;
            products[idx].quantity = quantity;
            products[idx].price = price;
            products[idx].category = category;
            products[idx].description = description;
            products[idx].images = image ? [image] : (products[idx].images || []);
        }
    } else {
        // nuevo
        const newProd = {
            id: generateId(),
            name,
            quantity,
            price,
            category,
            description,
            images: image ? [image] : []
        };
        products.unshift(newProd);
    }

    saveProducts(products);
    resetForm();
    renderTable(document.getElementById('searchInput').value);
}

// Buscador
function initSearch() {
    const input = document.getElementById('searchInput');
    input.addEventListener('input', () => renderTable(input.value));
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    try {
        // detectar modo demo desde query string
        const urlParams = new URLSearchParams(window.location.search);
        const isDemo = urlParams.get('demo') === '1';

        // mostrar banner de demo si aplica
        if (isDemo) {
            const banner = document.querySelector('.demo-banner');
            if (banner) banner.style.display = 'block';
            // en modo demo podemos desactivar confirmaciones de borrado si se desea
            window.__ADMIN_DEMO_MODE = true;
            console.log('Admin demo mode: enabled');
        } else {
            // ocultar banner si no es demo
            const banner = document.querySelector('.demo-banner');
            if (banner) banner.style.display = 'none';
            window.__ADMIN_DEMO_MODE = false;
        }

        initDatabase();
        renderTable();
        initSearch();

        document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
        document.getElementById('cancelEdit').addEventListener('click', () => {
            resetForm();
        });

        // Exportar/Importar rápido (opcional) - atajos de utilidad
        // Ctrl+E para exportar JSON
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'e') {
                const data = JSON.stringify(getProducts(), null, 2);
                prompt('Copia el JSON del inventario:', data);
            }
        });
    } catch (err) {
        console.error('Error inicializando admin:', err);
        // mostrar un error amigable en la interfaz para que no 'desaparezca'
        const main = document.querySelector('.admin-panel') || document.querySelector('main') || document.body;
        const errDiv = document.createElement('div');
        errDiv.style.background = '#ffecec';
        errDiv.style.border = '1px solid #f5c6cb';
        errDiv.style.color = '#721c24';
        errDiv.style.padding = '12px';
        errDiv.style.borderRadius = '6px';
        errDiv.style.margin = '12px 0';
        errDiv.textContent = 'Ocurrió un error al cargar la interfaz administrativa. Revisa la consola para más detalles.';
        main.prepend(errDiv);
    }
});
