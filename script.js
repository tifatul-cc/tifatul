// script.js — save as script.js
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    const expanded = nav.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if (nav.classList.contains('show')) {
          nav.classList.remove('show');
          navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // simple contact form validation + fake send
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  const clearBtn = document.getElementById('clear-btn');

  clearBtn.addEventListener('click', () => {
    form.reset();
    formMsg.textContent = '';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMsg.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) { formMsg.textContent = 'Nama minimal 2 karakter.'; return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { formMsg.textContent = 'Masukkan email valid.'; return; }
    if (message.length < 10) { formMsg.textContent = 'Pesan minimal 10 karakter.'; return; }

    // Simulate sending (replace with real API call if needed)
    formMsg.textContent = 'Mengirim...';
    setTimeout(() => {
      formMsg.textContent = 'Terima kasih — pesanmu telah dikirim (simulasi).';
      form.reset();
    }, 900);
  });

  // project modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');

  function openModal(title, desc) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('.view-project, .project-thumb').forEach(el => {
    el.addEventListener('click', () => {
      const title = el.dataset.title || el.getAttribute('data-title');
      const desc = el.dataset.desc || el.getAttribute('data-desc');
      openModal(title || 'Proyek', desc || 'Deskripsi belum tersedia.');
    });
    // keyboard support
    el.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        el.click();
      }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
