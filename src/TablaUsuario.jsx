import React from 'react';
import FilaUsuario from "./FilaUsuario";

function TablaUsuarios({ usuarios, eliminarUsuario, editarUsuario }) {
    return(
        <table className="table table-bordered table-responsive">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Actividad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <FilaUsuario
                        key={usuario.id}
                        usuario={usuario}
                        eliminarUsuario={eliminarUsuario}
                        editarUsuario={editarUsuario}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default TablaUsuarios;
