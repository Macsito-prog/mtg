

const tablaUsuarios = document.getElementById('tabla-usuarios');
const filtroPartidas = document.getElementById('filtro-partidas');

// Función para renderizar los usuarios en la tabla
// Función para obtener los usuarios de la API y renderizar la tabla
async function obtenerYRenderizarUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (response.ok) {
            const usuarios = await response.json();
            // Llamar a renderUsuarios con los usuarios obtenidos
            renderUsuarios(usuarios);
        } else {
            console.error('Error al obtener usuarios:', response.statusText);
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}

// Función para renderizar los usuarios en la tabla
function renderUsuarios(usuarios) {
    // Limpiar la tabla antes de renderizar de nuevo
    tablaUsuarios.innerHTML = `
    <tr>
        <th>Nombre de Usuario</th>
        <th>Correo</th>
        <th>Partidas Ganadas</th>
        <th>Puntaje</th>
        <th>Acciones</th>
    </tr>
    `;

    // Renderizar cada usuario en la tabla
    usuarios.forEach(usuario => {
        // Calcular el puntaje como la cantidad de partidas ganadas multiplicado por 3
        const puntaje = usuario.partidasGanadas * 3;

        // Crear fila para cada usuario con un botón de eliminar
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.partidasGanadas}</td>
        <td>${puntaje}</td>
        <td><button onclick="eliminarUsuario(${usuario.id})">Eliminar</button></td>
        `;
        tablaUsuarios.appendChild(fila);
    });
}
// Función para eliminar un usuario
async function eliminarUsuario(id) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            // Vuelve a renderizar la tabla de usuarios después de eliminar
            obtenerUsuarios();
        } else {
            console.error('Error al eliminar el usuario:', response.statusText);
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}

// Función para obtener la lista de usuarios y renderizarla
async function obtenerUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (response.ok) {
            const usuarios = await response.json();
            renderUsuarios(usuarios);
        } else {
            console.error('Error al obtener la lista de usuarios:', response.statusText);
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}

// Llamar a obtenerUsuarios al cargar la página para mostrar la lista inicial de usuarios
window.onload = obtenerUsuarios;
