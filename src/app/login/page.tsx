'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '', // Cambiado de 'usuario' a 'username'
    password: '', // Cambiado de 'contraseña' a 'password'
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
      //const response = await fetch('http://127.0.0.1:8000/login', {
      const response = await fetch('https://softwaveapi.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username, // Usando 'username'
          password: formData.password, // Usando 'password'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.detail);
        alert('Error: ' + errorData.detail);
        return;
      }

      const data = await response.json();
      console.log('Login exitoso:', data.message);
      alert('Login exitoso');
      router.push('/datawave');
    } catch (error) {
      console.error('Error iniciando sesión:', error);
      alert('Error iniciando sesión');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#F4F4F2' }}>
      <div className="bg-white shadow-lg rounded-md border border-gray-300 p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4 text-black shawkind" style={{ fontFamily: 'shawkind' }}>Iniciar Sesion</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 NataSans" style={{ fontFamily: 'NataSans' }}>Usuario</label>
            <input
              type="text"
              id="username" // Cambiado de 'usuario' a 'username'
              name="username" // Cambiado de 'usuario' a 'username'
              value={formData.username} // Cambiado de 'usuario' a 'username'
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 NataSans" style={{ fontFamily: 'NataSans' }}>Contraseña</label>
            <input
              type="password"
              id="password" // Cambiado de 'contraseña' a 'password'
              name="password" // Cambiado de 'contraseña' a 'password'
              value={formData.password} // Cambiado de 'contraseña' a 'password'
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-black NataSans hover:bg-gray-500 text-white font-semibold rounded-2xl py-2 px-4 w-full text-center"
            style={{ fontFamily: 'NataSans' }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
