const formulario = document.getElementById('formulario');
const mensaje = document.getElementById('mensaje');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener datos del formulario
    const formData = new FormData(formulario);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const partidasGanadas = formData.get('partidasGanadas');

    // Enviar los datos al servidor
    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                email,
                partidasGanadas: parseInt(partidasGanadas),
            }),
        });
        if (response.ok) {
            // Limpiar el formulario
            formulario.reset();
            // Mostrar mensaje de éxito
            mensaje.textContent = 'Usuario agregado correctamente.';
        } else {
            mensaje.textContent = 'Error al agregar el usuario.';
        }
    } catch (error) {
        console.error('Error:', error);
        mensaje.textContent = 'Error al conectar con el servidor.';
    }
});
