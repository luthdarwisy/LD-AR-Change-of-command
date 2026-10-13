const tabs = document.querySelectorAll('.tab-button');
const panels = document.querySelectorAll('.tab-panel');
const nav = document.querySelector('.tab-nav');
const menuToggle = document.querySelector('.menu-toggle');

function activateTab(tabName, updateHash = true) {
  tabs.forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
    tab.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    const active = panel.id === tabName;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
  });

  if (updateHash) {
    history.replaceState(null, '', `#${tabName}`);
  }

  if (window.innerWidth <= 860) {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const list = [...tabs];
    const current = list.indexOf(tab);
    const nextIndex = event.key === 'ArrowRight'
      ? (current + 1) % list.length
      : (current - 1 + list.length) % list.length;
    list[nextIndex].focus();
    activateTab(list[nextIndex].dataset.tab);
  });
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

const initialTab = location.hash.replace('#', '');
if ([...panels].some((panel) => panel.id === initialTab)) {
  activateTab(initialTab, false);
} else {
  activateTab('invitation', false);
}
