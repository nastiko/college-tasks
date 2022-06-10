class MiniCart {
    initialize() {
        this.stopPropagation();
        this.addItemClick();
        this.removeItemClick();
        this.cart = new Cart();
    }

    stopPropagation() {
        $('ul.dropdown-menu.bg-menu').click(function (e) {
            e.stopPropagation();
        });
    }

    addItemClick() {
        let miniCartSelf = this;
        $('.cart-plus').on('click', function () {
            let amountEl   = $(this).siblings('.amount-items');
            let productQty = parseInt(amountEl.html());

            productQty = productQty + 1;
            amountEl.html(`${productQty}`);

            let cartItem = miniCartSelf.getCartItemObject(this);
            this.cart.addCartItem(cartItem);
        });
    }

    getCartItemObject(element) {
        let productEl = $(element).parents('li.position-item');
        return {
            id: productEl.data('id'),
            title: productEl.data('title'),
            price: productEl.data('price'),
            image: productEl.data('image'),
        };
    }

    removeItemClick() {
        $('.cart-minus').on('click', function () {
            let amountEl   = $(this).siblings('.amount-items');
            let productQty = parseInt(amountEl.html());

            productQty = productQty - 1;
            if (productQty <= 0) {
                $(this).parents('.position-item').next('.cart-item-divider').fadeOut(500);
                $(this).parents('.position-item').slideUp(500, function () {
                    $(this).next('.cart-item-divider').remove();
                    $(this).remove();
                });
            } else {
                amountEl.html(`${productQty}`);
            }
        });
    }
}

class Cart {
    updateItem(data) {
        let items = this.getCartItems();
        //...
        this.setCartItems(items);
    }

    decreaseQty(itemId) {
        let items = this.getCartItems();

        items[itemId].qty--;
        if (items[itemId].qty === 0) {
            this.removeCartItem(itemId);
        }

        this.setCartItems(items);
    }

    removeCartItem(itemId) {
        let items = this.getCartItems();
        delete items[itemId];
        this.setCartItems(items);
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


let cartData = {
    1: {name: 'Pizza', id: 1, price: 7.99, qty: 5},
    2: {name: 'Soup', id: 2, price: 17.99, qty: 1},
    3: {name: 'Soup3', id: 3, price: 17.99, qty: 2},
    9: {name: 'Soup9', id: 9, price: 17.99, qty: 1},
    10: {name: 'Soup10', id: 10, price: 17.99, qty: 4},
};


class Car {
    brand = 'Mazda';
    color = 'red';

    constructor(brand, color) {
        this.brand = brand;
        this.color = color;
    }

    getCarModel() {
        console.log(this.brand + ' ' + this.color);
    }
}

let car1 = new Car('Ferrari', 'white');
let car2 = new Car('Audi', 'black');

car1.getCarModel();
car2.getCarModel();

