// Aurelia Noir Online Store 2.0 Client Script
document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('cart-drawer');
  const trigger = document.getElementById('cart-drawer-trigger');
  const close = document.getElementById('cart-drawer-close');
  const backdrop = document.getElementById('cart-drawer-backdrop');

  function openDrawer() {
    if (drawer) drawer.classList.remove('hidden');
  }

  function closeDrawer() {
    if (drawer) drawer.classList.add('hidden');
  }

  if (trigger) trigger.addEventListener('click', openDrawer);
  if (close) close.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
});
