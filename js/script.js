$(document).ready(function() {
	//CHECKBOX
	$.each($('.checkbox'), function(index, val) {
		if($(this).find('input').prop('checked')==true) {
			$(this).addClass('active');
		}
	});
	$(document).on('click', '.checkbox', function(event) {
		if($(this).hasClass('active')){
			$(this).find('input').prop('checked', false);
		}else{
			$(this).find('input').prop('checked', true);
		}
		$(this).toggleClass('active');
		return false;
	});



	//SLIDER
	$('.slider').slick({
		slidesToShow:2,
		speed:1500,
		easing: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
		autoplay:true,
		autoplaySpeed:1500,
		draggable:false,
		responsive:[
			{
				breakpoint: 769,
				settings: {
					slidesToShow:1,
					arrows:false,
				}
			},
	]
	});
});




"use strict"

const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
	initRatings();
}

//Основная функция
function initRatings() {
	let ratingActive, ratingValue;
	// "Бегаем" по всем рейтингам на странице
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];
		initRating(rating);
	}
	// Инициализируем конкретный рейтинг
	function initRating(rating) {
		initRatingVars(rating);

		setRatingActiveWidth();

		if (rating.classList.contains('rating_set')) {
			setRating(rating);
		}
	}
	
	// Инициализация переменных
	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.rating__active');
		ratingValue = rating.querySelector('.rating__value');
	}

	// Именяем ширину активных звезд
	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}


	//Возможность указать оценку
	function setRating(rating) {
		const ratingItems = rating.querySelectorAll('.rating__item');
		for (let index = 0; index < ratingItems.length; index++) {
			const ratingItem = ratingItems[index];
			ratingItem.addEventListener("mouseenter", function(e) {
				// Обновление переменных
				initRatingVars(rating);
				// Обновление активных звезд
				setRatingActiveWidth(ratingItem.value);
			});
			ratingItem.addEventListener("mouseleave", function(e) {
				// Обновление активных звезд
				setRatingActiveWidth();
			});
			ratingItem.addEventListener("click", function(e) {
				// Обновление переменных
				initRatingVars(rating);

				if (rating.dataset.ajax) {
					// Отправить на сервер
					setRatingValue(ratingItem.value, rating);
				} else {
					//Отобразить указанную оценку
					ratingValue.innerHTML = index + 1;
					setRatingActiveWidth();
				}
			});
		}
	}
}