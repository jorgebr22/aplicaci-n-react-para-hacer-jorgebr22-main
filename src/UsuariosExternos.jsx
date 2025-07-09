import React, { useEffect, useState } from "react";

function UsuariosExternos() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar usuarios externos");
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="mt-4">
      <h2>Usuarios desde API Externa</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Actividad</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.phone}</td>
              <td>{usuario.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosExternos;
