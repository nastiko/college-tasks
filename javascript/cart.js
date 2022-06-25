class MiniCart {
    initialize() {
        this.addItemClick();
        this.addNewItemClick();
        this.removeItemClick();
        this.cart = new Cart();
        this.renderCartItems();
    }

    addNewItemClick() {
        let miniCartSelf = this;
        $('div.container-fluid.pattern').on('click', '.add-to-cart', function () {
            let product  = miniCartSelf.getCartItemObject(this);
            let cartItem = miniCartSelf.getCartItemData(product);

            cartItem.qty += 1;
            miniCartSelf.cart.addCartItem(cartItem);
            miniCartSelf.renderCartItem(cartItem);
        });
    }

    addItemClick() {
        let miniCartSelf = this;
        $('#miniCart ul.sidenav-menu').on('click', '.cart-plus', function () {
            let product  = miniCartSelf.getCartItemObject(this);
            let cartItem = miniCartSelf.getCartItemData(product);

            let amountEl   = $(this).siblings('.amount-items');
            let productQty = cartItem !== false ? cartItem.qty : 0;

            productQty = productQty + 1;
            amountEl.html(`${productQty}`);

            miniCartSelf.cart.addCartItem(cartItem);
        });
    }

    removeItemClick() {
        let miniCartSelf = this;
        $('#miniCart ul.sidenav-menu').on('click', '.cart-minus', function () {
            let product  = miniCartSelf.getCartItemObject(this);
            let cartItem = miniCartSelf.getCartItemData(product);

            let amountEl   = $(this).siblings('.amount-items');
            let productQty = cartItem !== false ? cartItem.qty : 0;

            productQty = productQty - 1;
            if (productQty <= 0) {
                $(this).parents('.position-item').next('.cart-item-divider').fadeOut(500);
                $(this).parents('.position-item').slideUp(500, function () {
                    $(this).next('li').remove();
                    $(this).remove();
                });
            } else {
                amountEl.html(`${productQty}`);
            }

            miniCartSelf.cart.decreaseQty(cartItem);

            // getAllCartItems -> if cart items > 0 -> then hide empty basket -> else show empty basket
        });
    }

    getCartItemObject(element) {
        let productEl = $(element).parents('li.position-item').first();
        if (productEl.length === 0) {
            productEl = $(element).parents('div.menu-item').first();
        }

        return {
            id: productEl.data('id'),
            title: productEl.data('title'),
            price: productEl.data('price'),
            image: productEl.data('image'),
            qty: 0
        };
    }

    getCartItemData(product, fillEmpty = true) {
        let cartItem = this.cart.getCartItem(product.id);
        if (cartItem === false && fillEmpty) {
            cartItem = product;
        } else if (cartItem === false && !fillEmpty) {
            return false;
        }

        return cartItem;
    }

    renderCartItem(product) {
        // if cart items > 0 -> then hide empty basket -> else show empty basket
        if (this.getCartItemData(product, false)) {
            let cartItem = $("#miniCart ul.sidenav-menu").find(`[data-id='${product.id}']`);
            if (cartItem.length > 0) {
                $(cartItem).find('.amount-items').html(product.qty);
            } else {
                let html = this.getMiniCartItemHtml(product.id, product.price, product.title, product.image, product.qty);
                $('#miniCart ul.sidenav-menu').append(html);
            }
        } else {
            let html = this.getMiniCartItemHtml(product.id, product.price, product.title, product.image, product.qty);
            $('#miniCart ul.sidenav-menu').append(html);
        }
    }


    renderCartItems() {
        let items = this.cart.getCartItems();
        Object.keys(items).forEach(index => {
            this.renderCartItem(items[index]);
        });
        this.checkEmptyCart();
        // if cart items > 0 -> then hide empty basket -> else show empty basket
    }

    getMiniCartItemHtml(id, price, title, image, qty) {
        return `<li class="position-item" data-id="${id}" data-price="${price}" data-title="${title}" data-image="${image}">\n` +
               '    <span class="collect-flex">\n' +
               `        <img class="item-img" src="${image}" alt="${title}">\n` +
               '        <span class="item-info">\n' +
               `            <em class="item-title">${title}</em>\n` +
               `            <em class="item-cost">£${price}</em>\n` +
               '        </span>\n' +
               '    </span>\n' +
               '    <span class="svg-item">\n' +
               '        <span class="cart-minus"></span>\n' +
               `        <strong class="m-0 item-cost amount-items">${qty}</strong>\n` +
               '        <span class="cart-plus"></span>\n' +
               '    </span>\n' +
               '</li>' +
               '<li>\n' +
               '    <hr class="sidenav-hr">\n' +
               '</li>';
    }
}

class Cart {
    removeCartItem(itemId) {
        let items = this.getCartItems();
        delete items[itemId];
        this.setCartItems(items);
    }

    decreaseQty(cartItem) {
        let items = this.getCartItems();

        items[cartItem.id].qty--;
        if (items[cartItem.id].qty === 0) {
            this.removeCartItem(cartItem.id);
        } else {
            this.setCartItems(items);
        }
    }

    addCartItem(cartItem) {
        let items = this.getCartItems();

        if (items.hasOwnProperty(cartItem.id)) {
            items[cartItem.id].qty++;
        } else {
            items[cartItem.id] = cartItem;
        }

        this.setCartItems(items);
    }

    getCartItems() {
        let cartData = localStorage.getItem('cart');
        if (typeof cartData === 'string' || cartData instanceof String) {
            try {
                cartData = JSON.parse(cartData);
            } catch (err) {
                cartData = {};
                console.log(err);
            }
        } else {
            cartData = {};
        }

        return cartData;
    }

    getCartItem(id) {
        let items = this.getCartItems();

        if (items.hasOwnProperty(id)) {
            return items[id];
        } else {
            return false;
        }
    }

    setCartItems(cartData) {
        cartData = JSON.stringify(cartData);
        localStorage.setItem('cart', cartData);
    }

    clearCartItems() {
        this.setCartItems({});
    }
}

class Orders {
    constructor() {
        this.cart = new Cart();
    }

    placeOrder() {
        let cartItems = this.cart.getCartItems();
        this.cart.clearCartItems();
        // ..... ....
        // ..... ....
        // ..... ....
    }
}

