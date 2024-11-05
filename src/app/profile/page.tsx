'use client';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importar Bootstrap
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    username: ''
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const router = useRouter(); // Obtén el objeto router

  const handleLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    Cookies.remove('token');
    router.push('/'); // Cambia la URL según sea necesario
  };

  const handleUpdate = async () => {
    const token = Cookies.get('token');
  
    try {
      const response = await fetch('http://127.0.0.1:8000/update/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          username: user.username,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar los datos del usuario');
      }
  
      const data = await response.json();
      alert('Datos actualizados exitosamente');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Hubo un error al actualizar los datos');
    }
  };

  const handlePasswordUpdate = async () => {
    const token = Cookies.get('token');

    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert('Las nuevas contraseñas no coinciden');
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/update_password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: passwords.currentPassword,
          new_password: passwords.newPassword,
          confirm_password: passwords.confirmPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la contraseña');
      }

      alert('Contraseña actualizada exitosamente');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Hubo un error al actualizar la contraseña');
    }
  };

  const fetchUserData = async () => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login'); // Redirige a login si no hay token
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login'); // Redirige a login si el token es inválido
        }
        throw new Error('Error al obtener los datos del usuario');
      }

      const data = await response.json();
      setUser({
        name: data.name,
        email: data.email,
        username: data.username
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); 
  }, []);

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f3f1ef', padding: '20px' }}>
      <div className="row">
        <div className="col-12 col-md-3 d-flex flex-column justify-content-start align-items-center" style={{ borderRight: '1px solid #ccc', paddingTop: '250px' }}>
          <ul className="list-unstyled text-start">
            <li className="mb-3" style={{ marginTop: '100px' }}>
              <a href="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                Perfil
              </a>
            </li>
            <li className="mb-3">
              <a href="#" style={{ textDecoration: 'none', color: 'black' }}>
                Suscripciones
              </a>
            </li>
            <li className="mb-3">
              <a href="#" style={{ textDecoration: 'none', color: 'black' }}>
                Métodos de pago
              </a>
            </li>
            <hr style={{ borderTop: '2px solid black', width: '200%', marginLeft: '-50%' }} />
            <li style={{ marginTop: '20px' }}>
              <a href="/" onClick={handleLogout} style={{ textDecoration: 'none', color: '#999' }}>
                Salir
              </a>
            </li>
          </ul>
        </div>

        <div className="col-12 col-md-9 d-flex flex-column align-items-center">
          <form className="w-75">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                style={{ width: '100%' }} 
                value={user.name} 
                onChange={(e) => setUser({ ...user, name: e.target.value })} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                style={{ width: '100%' }} 
                value={user.email} 
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                style={{ width: '100%' }} 
                value={user.username} 
                onChange={(e) => setUser({ ...user, username: e.target.value })} 
              />
            </div>

            <div className="text-center">
              <button type="button" className="btn btn-dark mt-3 px-4" style={{ fontFamily: 'shawkind', color: '#39FF14' }} onClick={handleUpdate}>
                Actualizar Datos
              </button>
            </div>

            {/* Cambiar Contraseña */}
            <div className="mt-5">
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Contraseña Actual</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="currentPassword" 
                  style={{ width: '100%' }} 
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="newPassword" 
                  style={{ width: '100%' }} 
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmPassword" 
                  style={{ width: '100%' }} 
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} 
                />
              </div>

              <div className="text-center">
                <button type="button" className="btn btn-dark mt-3 px-4" style={{ fontFamily: 'shawkind', color: '#39FF14' }} onClick={handlePasswordUpdate}>
                  Actualizar Contraseña
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage
