const mercadoPagoPublicKey = document.getElementById("mercado-pago-public-key").value;
const mercadopago = new MercadoPago(mercadoPagoPublicKey);
let walletBrickController;

async function loadWalletBrick() {
    const unitPrice = document.getElementById('unit-price').innerText;
    const quantity = document.getElementById('quantity').value;

    const settings = {
        callbacks: {
            onReady: () => {
                console.log('brick ready')
            },
            onSubmit: async () => {
                const preferenceId = await getPreferenceId(unitPrice, quantity);
                return preferenceId
            }
        },
        locale: 'en',
    }

    const bricks = mercadopago.bricks();
    walletBrickController = await bricks.create('wallet', 'mercadopago-bricks-container__wallet', settings);
};

function loadBrandBrick() {
    const settings = {
        customization: { 
            text: {
                align: 'center'
            }
        }, 
        locale: 'en'
    }
    
    const bricks = mercadopago.bricks();
    bricks.create('brand', 'mercadopago-bricks-container__brand', settings);
};

const getPreferenceId = async (unitPrice, quantity) => {
    const response = await fetch(`/preference_id?unitPrice=${unitPrice}&quantity=${quantity}`);
    const { preferenceId } = await response.json();
    return preferenceId;
};

// Handle transitions
document.getElementById('checkout-btn').addEventListener('click', function () {
    $('.container__cart').fadeOut(500);
    setTimeout(() => {
        loadWalletBrick();
        $('.container__payment').show(500).fadeIn();
    }, 500);
});

document.getElementById('go-back').addEventListener('click', function () {
    $('.container__payment').fadeOut(500);
    walletBrickController.unmount();
    setTimeout(() => { $('.container__cart').show(500).fadeIn(); }, 500);
});

// Handle price update
function updatePrice() {
    let quantity = document.getElementById('quantity').value;
    let unitPrice = document.getElementById('unit-price').innerText;
    let amount = parseInt(unitPrice) * parseInt(quantity);

    document.getElementById('cart-total').innerText = '$ ' + amount;
    document.getElementById('summary-price').innerText = '$ ' + unitPrice;
    document.getElementById('summary-quantity').innerText = quantity;
    document.getElementById('summary-total').innerText = '$ ' + amount;
    document.getElementById('amount').value = amount;
};

loadBrandBrick();
document.getElementById('quantity').addEventListener('change', updatePrice);
updatePrice();