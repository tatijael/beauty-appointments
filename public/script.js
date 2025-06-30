const URL = '/appointments';
const container = document.getElementById('appointments');
const form = document.getElementById('appointmentForm');

async function fetchAppointments() {
  const token = localStorage.getItem('token');
  const res = await fetch(URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await res.json();

  if (!Array.isArray(data)) {
    container.innerHTML = '<p class="error">No se pudo cargar la lista de turnos.</p>';
    return;
  }

  container.innerHTML = '';
  data.forEach(app => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div class="card-content">
        <p><strong>Cliente:</strong> ${app.cliente}</p>
        <p><strong>Fecha:</strong> ${app.fecha}</p>
        <p><strong>Hora:</strong> ${app.hora}</p>
        <p><strong>Servicio:</strong> ${app.servicio}</p>
        <div class="actions">
          <button onclick="editAppointment(${app.id})">Editar</button>
          <button onclick="deleteAppointment(${app.id})">Eliminar</button>
        </div>
      </div>
    `;
    container.prepend(div);
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const cliente = document.getElementById('cliente').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const servicio = document.getElementById('servicio').value;

  const token = localStorage.getItem('token');
  await fetch(URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ cliente, fecha, hora, servicio })
  });

  form.reset();
  fetchAppointments();
});

async function deleteAppointment(id) {
  const token = localStorage.getItem('token');
  await fetch(`${URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  fetchAppointments();
}

let currentEditId = null;

async function editAppointment(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${URL}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const app = data.find(item => item.id === id);
  if (!app) return;

  currentEditId = id;

  // Evitar duplicado del modal
  if (!document.getElementById('editModal')) {
    const modalHTML = await fetch('modal.html').then(res => res.text());
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = modalHTML;
    document.body.appendChild(tempDiv.firstElementChild);
  }

  document.getElementById('edit-cliente').value = app.cliente;
  document.getElementById('edit-fecha').value = app.fecha;
  document.getElementById('edit-hora').value = app.hora;
  document.getElementById('edit-servicio').value = app.servicio;
  document.getElementById('editModal').style.display = 'flex';

  const editForm = document.getElementById('editForm');
  const submitHandler = async function (e) {
    e.preventDefault();
    const updatedAppointment = {
      cliente: document.getElementById('edit-cliente').value,
      fecha: document.getElementById('edit-fecha').value,
      hora: document.getElementById('edit-hora').value,
      servicio: document.getElementById('edit-servicio').value
    };
    await fetch(`${URL}/${currentEditId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedAppointment)
    });
    document.getElementById('editModal').remove();
    fetchAppointments();
  };

  // Quita eventos anteriores para evitar duplicados
  editForm.removeEventListener('submit', submitHandler);
  editForm.addEventListener('submit', submitHandler);

  document.getElementById('cancelEdit').addEventListener('click', () => {
    document.getElementById('editModal').remove();
  });
}

fetchAppointments();