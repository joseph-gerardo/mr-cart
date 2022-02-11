if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}

function ready() {
	let carts = document.querySelectorAll('.cart-btn');

	for (let i = 0; i < carts.length; i++) {
		carts[i].addEventListener('click', () => {
			itemQuantity(products[i]);
			totalCost(products[i]);
			displayCart();
			displayCartMobile();
		})
	}
}


function sizeSelect() {
	var sizeRadio = document.getElementsByClassName('size-radio');
	for (var i = 0; i < sizeRadio.length; i++) {
		if(sizeRadio[i].checked) {
			console.log(sizeRadio[i].value);
			document.getElementById('numbers1').innerText = sizeRadio[i].value;
			window.width = sizeRadio[i].value;
		} 
	}
}

function errorTrigger() {
	alert('Please select a size.')
}

let products = [
	{
		name: 'Classic Tee',
		tag: 'classicteesmall',
		size: 'S',
		price: 75,
		inCart: 0
	},
	{
		name: 'Classic Tee',
		tag: 'classicteemedium',
		size: 'M',
		price: 75,
		inCart: 0
	},
	{
		name: 'Classic Tee',
		tag: 'classicteelarge',
		size: 'L',
		price: 75,
		inCart: 0
	}
];

function onLoadItemQuantity() {
	 let itemNumbers = localStorage.getItem('itemQuantity');

	 if(itemNumbers) {
	 	document.querySelector('.cart-quantity').innerText = itemNumbers;
	 	document.querySelector('.cart-quantity-mobile').innerText = itemNumbers;
	 }
}

function itemQuantity(product) {
	let itemNumbers = localStorage.getItem('itemQuantity');
	
	itemNumbers = parseInt(itemNumbers);

	if ( itemNumbers ) {
		localStorage.setItem('itemQuantity', itemNumbers + 1);
		document.querySelector('.cart-quantity').innerText = itemNumbers + 1;
		document.querySelector('.cart-quantity-mobile').innerText = itemNumbers + 1;
	} else {
		localStorage.setItem('itemQuantity', 1);
		document.querySelector('.cart-quantity').innerText = 1;
		document.querySelector('.cart-quantity-mobile').innerText = 1;
	}

	setItems(product);

	// var cartMobile = document.getElementsByClassName('cart-quantity-mobile');
}

function setItems(product) {
	let cartItems = localStorage.getItem('itemsInCart');
	cartItems = JSON.parse(cartItems);

	if(cartItems != null) {
		if(cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		}
	}
	localStorage.setItem('itemsInCart', JSON.stringify(cartItems));
}

function totalCost(item) {
	let cartCost = localStorage.getItem('totalCost');
	console.log('My cart cost is', cartCost);
	console.log(typeof cartCost);

	if(cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem('totalCost', cartCost + item.price);
	} else {
		localStorage.setItem('totalCost', item.price);
	}

}

function displayCart() {
	let cartItems = localStorage.getItem('itemsInCart');
	cartItems = JSON.parse(cartItems);
	let miniCart = document.querySelector('.mini-cart-container')

	if(cartItems && miniCart) {
		miniCart.innerHTML = '';
		Object.values(cartItems).map(item => {
			miniCart.innerHTML += `
			<div class="mini-cart bottom30">
				<div class="row">
					<div class="col-4">
						<div class="product-wrap-mobile">
							<div class="image-wrap">
								<img src="img/${item.tag}.jpg" alt="" class="img-responsive shop-item-img">
							</div>
						</div>
					</div>
					<div class="col-8">
						<div class="product-wrap-mobile">
							<div class="product-name bottom10">
								<div class="header-wrap">
									<p class="bottom0 shop-item-name">${item.name}</p>
								</div>
							</div>
							<div class="price-wrap bottom10">
								<div class="text-wrap">
									<p class="bottom0"><span class="item-quantity">${item.inCart}x</span> <span class="text-bold shop-item-price">$${item.price}.00</span></p>
								</div>
							</div>
							<div class="product-size">
								<div class="size-title">
									<p class="ls1 bottom0">Size: <span id="numbers2" class="shop-item-size bottom0 text-bold">${item.size}</span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`
		});
	}
}

function displayCartMobile() {
	let cartItems = localStorage.getItem('itemsInCart');
	cartItems = JSON.parse(cartItems);
	let miniCart = document.querySelector('.mobile-cart-container')

	if(cartItems && miniCart) {
		miniCart.innerHTML = '';
		Object.values(cartItems).map(item => {
			miniCart.innerHTML += `
			<div class="mini-cart bottom30">
				<div class="row">
					<div class="col-4">
						<div class="product-wrap-mobile">
							<div class="image-wrap">
								<img src="img/${item.tag}.jpg" alt="" class="img-responsive shop-item-img">
							</div>
						</div>
					</div>
					<div class="col-8">
						<div class="product-wrap-mobile">
							<div class="product-name bottom10">
								<div class="header-wrap">
									<p class="bottom0 shop-item-name">${item.name}</p>
								</div>
							</div>
							<div class="price-wrap bottom10">
								<div class="text-wrap">
									<p class="bottom0"><span class="item-quantity">${item.inCart}x</span> <span class="text-bold shop-item-price">$${item.price}.00</span></p>
								</div>
							</div>
							<div class="product-size">
								<div class="size-title">
									<p class="ls1 bottom0">Size: <span id="numbers2" class="shop-item-size bottom0 text-bold">${item.size}</span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`
		});
	}
}


$(document).ready(function() {
	$("#size-s").click(function() {
		$(".s-btn").show(), 
		$(".m-btn").hide(), 
		$(".l-btn").hide(), 
		$(".def-btn").hide()
	}), 
	$("#size-m").click(function() {
		$(".s-btn").hide(), 
		$(".m-btn").show(), 
		$(".l-btn").hide(), 
		$(".def-btn").hide()
	}), 
	$("#size-l").click(function() {
		$(".s-btn").hide(), 
		$(".m-btn").hide(), 
		$(".l-btn").show(), 
		$(".def-btn").hide()
	})
});






onLoadItemQuantity()
displayCart()
displayCartMobile()


























































































































































