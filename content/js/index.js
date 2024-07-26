const loader = document.querySelector('.loader')
document.addEventListener('DOMContentLoaded', () => {
    loader.classList.add('loaded')

    const headerMenu = document.querySelector('.header_menu')
    const headerBurger = document.querySelector('.header_burger')
    const body = document.body

    headerBurger.addEventListener('click', () => {
        headerBurger.classList.toggle('active')
        headerMenu.classList.toggle('active')
        body.classList.toggle('locked')
    })

    //shop items popups more

    const shopItemsPopups = document.getElementsByClassName('shop_item_more')
    const shopItemsFrontButtons = document.getElementsByClassName('shop_items_button')
    const shopItemsClose = document.getElementsByClassName('shop_search_content_close')

    shopItemsFrontButtons[0].addEventListener('click', () => {
        shopItemsPopups[0].classList.toggle('active')
        body.classList.toggle('locked')
    })
    shopItemsClose[0].addEventListener('click', () => {
        shopItemsPopups[0].classList.toggle('active')
        body.classList.toggle('locked')
    })
    // shop items info
    const itemInfoHeadItems = document.getElementsByClassName('item_info_head_item');
        const itemInfoContents = document.getElementsByClassName('item_info_content');

        for (let i = 0; i < itemInfoHeadItems.length; i++) {
            itemInfoHeadItems[i].addEventListener('click', function() {
                // Remove 'active' class from all header items and content tabs
                for (let j = 0; j < itemInfoHeadItems.length; j++) {
                    itemInfoHeadItems[j].classList.remove('active');
                    itemInfoContents[j].classList.remove('active');
                }

                // Add 'active' class to the clicked header item and the corresponding tab
                itemInfoHeadItems[i].classList.add('active');
                itemInfoContents[i].classList.add('active');
            });
        }

    // shop cart
    const shopCart = document.querySelector('.shop_cart')
    const shopCartClose = document.querySelector('.shop_cart_close_button')
    const shopCartOpen = document.querySelector('.shop_cart_button')
    const polotno = document.querySelector('.polotno')

    shopCartOpen.addEventListener('click', () => {
        shopCart.classList.add('active');
        polotno.classList.toggle('active')
        body.classList.toggle('locked')
    })
    shopCartClose.addEventListener('click', () => {
        shopCart.classList.remove('active');
        polotno.classList.toggle('active')
        body.classList.toggle('locked')
    })
})




// Додаємо обробники для кнопок розмірів
const sizeButtons = document.querySelectorAll('.item_overview_text_descr_size_item');
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Додаємо обробники для кнопок кольорів
const colorButtons = document.querySelectorAll('.item_overview_text_descr_color .item_overview_text_descr_size_item');
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        colorButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Обробник для кнопки "Add To Cart"
document.getElementById('addToCartButton').addEventListener('click', () => {
    const selectedSize = document.querySelector('.item_overview_text_descr_size_item.active');
    const selectedColor = document.querySelector('.item_overview_text_descr_color .item_overview_text_descr_size_item.active');
    const itemNumber = document.getElementById('itemsNumber').textContent;

    if (selectedSize && selectedColor) {
        const cartContent = document.querySelector('.shop_cart_content');

        const cartImage = document.querySelector('.cartImage')
        const cartImagePhoto = cartImage.getAttribute('src');

        const itemTitle = document.querySelector('.itemTitle')
        const itemTitleContent = itemTitle.textContent

        const itemPrice = document.querySelector('.itemPrice')
        const itemPriceContent = itemPrice.textContent

        const newItem = document.createElement('div');

        newItem.classList.add('shop_cart_item');
        newItem.innerHTML = `
            <img src="${cartImagePhoto}" alt="">
            <div class="shop_cart_item_text">
                <h3>${itemTitleContent}</h3>
                <p><span class="item_num">${itemNumber}</span>X<span class="item_price">${itemPriceContent}</span></p>
            </div>
            <img src="content/sourcle/media/shop/close_button.png" alt="" class="item_close_button">
        `;
        cartContent.appendChild(newItem);

        updateSubtotal();
    } else {
        alert('Please select size and color.');
    }
});

// Обробники для кнопок збільшення/зменшення кількості предметів
document.getElementById('addItem').addEventListener('click', () => {
    let itemNumber = document.getElementById('itemsNumber');
    itemNumber.textContent = parseInt(itemNumber.textContent) + 1;
});

document.getElementById('removeItem').addEventListener('click', () => {
    let itemNumber = document.getElementById('itemsNumber');
    if (parseInt(itemNumber.textContent) > 1) {
        itemNumber.textContent = parseInt(itemNumber.textContent) - 1;
    }
});

function updateSubtotal() {
    const prices = document.querySelectorAll('.item_price');
    let subtotal = 0;
    prices.forEach(price => {
        const itemPrice = parseFloat(price.textContent.replace('Rs ', '').replace(',', ''));
        const itemNum = parseInt(price.previousElementSibling.textContent);
        subtotal += itemPrice * itemNum;
    });
    document.querySelector('.subtotal_price').textContent = `Rs ${subtotal.toLocaleString()}.00`;
}

// Додаємо обробник для кнопок видалення елементів з кошика
document.querySelector('.shop_cart_content').addEventListener('click', function (event) {
    if (event.target.classList.contains('item_close_button')) {
        const item = event.target.closest('.shop_cart_item');
        item.remove();
        updateSubtotal();
    }
});

// Первинне оновлення загальної вартості при завантаженні сторінки
updateSubtotal()