import React, { useState, useRef, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import TablaUsuarios from "./TablaUsuario";

const KEY = "todolist-usuarios";

function ToDoList() {
    
    const [usuarios, setUsuarios] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(KEY)) || [];
        } catch {
            return [];
        }
    });

    const nombreRef = useRef();
    const correoRef = useRef();
    const telefonoRef = useRef();
    const actividadRef = useRef();

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(usuarios));
    }, [usuarios]);

    const agregarRegistro = () => {
        const nuevoRegistro = {
            id: uuid(),
            nombre: nombreRef.current.value.trim(),
            correo: correoRef.current.value.trim(),
            telefono: '+569 ' + telefonoRef.current.value.trim(),
            actividad: actividadRef.current.value.trim()
        };

        if (!nuevoRegistro.nombre || !nuevoRegistro.correo || !nuevoRegistro.actividad || !telefonoRef.current.value.trim()) {
            return;
        }

        setUsuarios([...usuarios, nuevoRegistro]);
        limpiarCampos();
    };

    const limpiarCampos = () => {
        nombreRef.current.value = '';
        correoRef.current.value = '';
        telefonoRef.current.value = '';
        actividadRef.current.value = '';
    };

    const eliminarRegistros = () => {
        setUsuarios([]);
    };

    return (
        <>
            <h1>Directorio de Contacto</h1>
            <div className="input-group mb-3 mt-4">
                <input ref={nombreRef} placeholder="Nombre" className="form-control" />
                <input ref={correoRef} placeholder="Correo Electrónico" className="form-control ms-2" />
                
                <div className="d-flex align-items-center ms-2">
                    <span>+569</span>
                    <input 
                        ref={telefonoRef} 
                        placeholder="Teléfono" 
                        className="form-control ms-2" 
                        type="text" 
                        maxLength={8} 
                        pattern="[0-9]*"
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 8);
                        }}
                    />
                </div>

                <input ref={actividadRef} placeholder="Actividad" className="form-control ms-2" />

                <button onClick={agregarRegistro} className="btn btn-success ms-2">
                    <i className="bi bi-plus-circle-fill"></i>
                </button>
                <button onClick={limpiarCampos} className="btn btn-danger ms-2">
                    <i className="bi bi-trash"></i>
                </button>
            </div>

            <TablaUsuarios 
                usuarios={usuarios}
                eliminarUsuario={(id) => setUsuarios(usuarios.filter((u) => u.id !== id))}
                editarUsuario={(id, nuevosDatos) => {
                    const nuevosUsuarios = usuarios.map((u) =>
                        u.id === id ? { ...u, ...nuevosDatos } : u
                    );
                    setUsuarios(nuevosUsuarios);
                }}
            />
        </>
    );
}

export default ToDoList;
