import React from "react";
import { useState } from "react";

function FilaUsuario(props){
    const { usuario, eliminarUsuario, editarUsuario } = props;

    const [editando, setEditando] = useState(false);
    const [nombre, setNombre] = useState(usuario.nombre);
    const [correo, setCorreo] = useState(usuario.correo);
    const [telefono, setTelefono] = useState(usuario.telefono.replace('+569 ', ''));
    const [actividad, setActividad] = useState(usuario.actividad);

    const guardarCambios = () => {
        editarUsuario(usuario.id, { 
            nombre, 
            correo, 
            telefono: '+569 ' + telefono, 
            actividad
        });
        setEditando(false);
    };

    return(
        <tr>
            <td>
                {editando ? (
                    <input 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        className="form-control"
                        />
                    ) : (
                    usuario.nombre
                )}
            </td>
            <td>
              {editando ? (
                    <input 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} 
                        className="form-control"
                        />
                    ) : (
                    usuario.correo
                )}
            </td>
            <td>
                 {editando ? (
                    <div className="d-flex align-items-center">
                        <span>+569</span>
                    <input 
                        value={telefono} 
                        onChange={(e) => 
                            setTelefono(e.target.value.replace(/\D/g, '').slice(0, 8))}
                        maxLength={8} 
                        type="text"
                        className="form-control ms-2"
                        />
                    </div>
                    ) : (
                    usuario.telefono
                )}
            </td>
            <td>
                 {editando ? (
                    <input 
                        value={actividad} 
                        onChange={(e) => setActividad(e.target.value)}
                        className="form-control ms-2" 
                        />
                    ) : (
                    usuario.actividad
                )}
            </td>
            <td>
                {editando ?(
                    <button onClick={guardarCambios} className="btn btn-primary btn-sm ms-1 rounded-3">
                        <i className="bi bi-check-circle"></i>
                    </button>
                ) : (
                    <button onClick={() => setEditando(true)} className="btn btn-warning btn-sm ms-1 rounded-3">
                        <i className="bi bi-pencil"></i>   
                    </button>
                )}
                <button onClick={() => eliminarUsuario(usuario.id)} className="btn btn-danger btn-sm ms-1 rounded-3">
                    <i className="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    );
}

export default FilaUsuario;
