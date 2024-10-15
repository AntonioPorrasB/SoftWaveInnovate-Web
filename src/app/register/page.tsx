'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    usuario: '',
    contraseña: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //const response = await fetch('http://127.0.0.1:8000/register', {
      const response = await fetch('https://softwaveapi.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,           // Enviamos 'nombre' como 'name'
          email: formData.correo,          // Enviamos 'correo' como 'email'
          username: formData.usuario,      // Enviamos 'usuario' como 'username'
          password: formData.contraseña,   // Enviamos 'contraseña' como 'password'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.detail || 'Error desconocido');
        alert(errorData.detail || 'Error registrando usuario');
        return;
      }

      const data = await response.json();
      console.log('Éxito:', data);
      alert('¡Cuenta creada exitosamente!');
      router.push('/login'); // Redirecciona a la página de login
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('Error registrando usuario');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#F4F4F2' }}>
      <div className="bg-white shadow-lg rounded-md border border-gray-300 p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6 text-black shawkind" style={{ fontFamily: 'shawkind' }}>Crear Cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nombre" className="block text-gray-600 NataSans" style={{ fontFamily: 'NataSans' }}>Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-gray-600 NataSans" style={{ fontFamily: 'NataSans' }}>Correo Electronico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="usuario" className="block text-gray-600 NataSans" style={{ fontFamily: 'NataSans' }}>Usuario</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="contraseña" className="block text-gray-600 NataSans" style={{ fontFamily: 'NataSans' }}>Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-black NataSans hover:bg-gray-800 text-white font-semibold rounded-2xl py-2 px-4 w-full text-center"
            style={{ fontFamily: 'NataSans' }}
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
