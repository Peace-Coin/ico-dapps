//ヘッダーセレクター アクション
$(".selector__item--now").on('click', function(event) {//セレクターボタンクリック時
	$(this).toggleClass("showList");
	$(this).parents('.l-selector').siblings().children('.selector__item--now').removeClass("showList");
	$(this).siblings('.selector__item-list').toggleClass("is-hidden");
	$(this).parents('.l-selector').siblings().children('.selector__item-list').addClass("is-hidden");
});
$(window).on('click touchend', function(event) {//セレクター範囲外クリック時
	if (!$(event.target).closest('.l-selector').length) {
		$('.selector__item-list').addClass("is-hidden");
		$('.selector__item--now').removeClass("showList");
	}
});

//カウントダウン
$(function() {
	var liftoffTime = new Date('2018-06-24');
	$('#timeCount').countdown({until: liftoffTime, layout: '{d<}<div class="timer__item timer__item-day"><span class="num">{dn}</span><span class="unit">{dl}</span></div><div class="timer__item timer__item-connect"><span class="num">:</span></div>{d>}'+
	'{h<}<div class="timer__item timer__item-h"><span class="num">{hnn}</span><span class="unit cl_themeA-2">{hl}</span></div><div class="timer__item timer__item-connect"><span class="num">:</span></div>{h>}' +
	'{m<}<div class="timer__item timer__item-m"><span class="num">{mnn}</span><span class="unit cl_themeA-2">{ml}</span></div><div class="timer__item timer__item-connect"><span class="num">:</span></div>{m>}'+
	'{s<}<div class="timer__item timer__item-s"><span class="num">{snn}</span><span class="unit cl_themeA-2">{sl}</span></div>{s>}'});
});

//modal
$('.modallink-smartContract').modaal({
	custom_class: 'l-content_modal--smartContract themeB'
});

$('.modallink-register').modaal({
	custom_class: 'l-content l-content--form l-content--form-register l-content--form-modal themeB',
	animation: 'none',
	before_open: function() {
		$('.modallink-login').modaal('close');
	}
});

$('.modallink-login').modaal({
	custom_class: 'l-content l-content--form l-content--form-login l-content--form-modal themeB',
	animation: 'none',
	before_open: function() {
		$('.modallink-register').modaal('close');
	}
});

$('.modallink-buyEth').modaal({
	custom_class: 'l-content_modal--buyCoin l-content_modal--buyCoin-buyEth l-content--form themeB'
});

$('.modallink-resetPw').modaal({
	custom_class: 'l-content l-content--form l-content--form-resetPw l-content--form-modal themeB',
	animation: 'none',
	before_open: function() {
		$('.modallink-login').modaal('close');
	}
});

$('.modallink-newPw').modaal({
	custom_class: 'l-content l-content--form l-content--form-newPw l-content--form-modal themeB'
});