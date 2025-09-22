function showRegister() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.remove('hidden');
}

function showLogin() {
  document.getElementById('registerForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
}

// Registrasi user baru
function register() {
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const role = document.getElementById('regRole').value;

  if (username && email && password && role) {
    const userData = { username, email, password, role };
    localStorage.setItem('user_' + username, JSON.stringify(userData));
    alert('Registrasi berhasil! Silakan login.');
    showLogin();
  } else {
    alert('Lengkapi semua data!');
  }
}

// Login user
function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(localStorage.getItem('user_' + username));
  if (user && user.password === password) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'home.html'; // Pastikan file ini ada
  } else {
    alert('Username atau password salah!');
  }
}

// Form input prestasi (untuk guru)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('prestasiForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nama = document.getElementById('namaPrestasi').value;
      const kelas = document.getElementById('kelasPrestasi').value;
      const judul = document.getElementById('judulPrestasi').value;
      const foto = document.getElementById('fotoPrestasi').files[0];

      const reader = new FileReader();
      reader.onloadend = function () {
        const list = document.getElementById('listPrestasi');
        const item = document.createElement('li');
        item.innerHTML = `
          <strong>${nama}</strong> (${kelas}) - ${judul}<br>
          <img src="${reader.result}" alt="${judul}" style="max-width: 100px; margin-top: 10px;">
        `;
        list.appendChild(item);
        form.reset();
      };

      if (foto) {
        reader.readAsDataURL(foto);
      }
    });
  }

});