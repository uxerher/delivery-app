// Shared cart count across screens (kept in this browser only).
(function () {
  function readCart() {
    try { return JSON.parse(localStorage.getItem('delivery-cart') || '{}'); } catch (e) { return {}; }
  }
  function writeCart(cart) {
    try { localStorage.setItem('delivery-cart', JSON.stringify(cart)); } catch (e) { /* storage unavailable */ }
  }
  function updateBadge(cart) {
    var count = Object.keys(cart).filter(function (k) { return cart[k]; }).length;
    var badge = document.querySelector('.badge');
    var tab = document.querySelector('.tab-cart');
    if (badge) { badge.textContent = count; badge.hidden = count === 0; }
    if (tab) { tab.setAttribute('aria-label', count ? 'Cart, ' + count + ' items' : 'Cart'); }
  }
  window.DeliveryApp = { readCart: readCart, writeCart: writeCart, updateBadge: updateBadge };
  document.addEventListener('DOMContentLoaded', function () { updateBadge(readCart()); });
})();
