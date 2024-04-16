import { useState } from "react";
import TableRegist from "./TableRegist"
import PropTypes from 'prop-types';
import { toast } from "react-toastify";


Formulario.propTypes = {
    optionMenu: PropTypes.any,
};

export default function Formulario({ optionMenu }) {
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellidoPat: '',
        apellidoMat: '',
        estado: '',
        ministerio: '',
        edad: '',
        iglesia: '',
        celular: '',
    });

    const [usekey, setUseKey] = useState(0);
    const [historicFormData, setHistoricFormData] = useState([]);
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(false)
    const [formularioModificado, setFormularioModificado] = useState(false);

    const handleSent = async (e) => {
        setBotonDeshabilitado(true);
        e.preventDefault();

        if (!formularioModificado) {
            toast.error('Por favor, modifique al menos un valor antes de enviar el formulario.');
            setBotonDeshabilitado(false);
            return;
        }

        if (!formData.nombre.trim() || !formData.apellidoPat.trim() || !formData.apellidoMat.trim()) {
            toast.error('Por favor, ingrese al menos el nombre y los apellidos.');
            setBotonDeshabilitado(false); // Habilitar el botón
            return;
        }

        if (formData.ministerio.toLowerCase() === 'ministro de culto') {
            toast.error('No se puede ingresar "Ministro de Culto" como ministerio.');
            return; // Evitar el envío del formulario si el ministerio es "Ministro de Culto"
        }
        try {
            formData.id = '';
            const formDataToSend = { ...formData }; // Hacer una copia independiente del formData
            const response = await fetch('https://ministrosdecultoapi.onrender.com/main_api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSend)
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }

            const responseData = await response.json();
            handleAsist(responseData.id, responseData.edad)

            setHistoricFormData([...historicFormData, responseData]);

            limpiarForm();
        } catch {
            console.log("Envio fallido");
        }
        setBotonDeshabilitado(false);
    }

    const handleAsist = async (id, edad) => {

        if (edad < 14) {
            toast.error("Es un niño")
            return;
        }
        const responseAsist = await fetch('https://ministrosdecultoapi.onrender.com/main_api/addAsistencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                "evento": 1,
                "persona": id,
            })
        });

        if (!responseAsist.ok) {
            throw new Error('Error al enviar los datos');
        }

        const responseData = await responseAsist.json();
        const asistenciaId = responseData.id; // Obtener el ID de la asistencia de la respuesta
        // Mostrar el ID de la asistencia en un alerta
        toast.info(`ID de la asistencia: ${asistenciaId}`);
    
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setFormularioModificado(true);
    }

    function handleTableClic(key) {
        setFormData(historicFormData[key])
        setUseKey(key)
        setFormularioModificado(false);
    }

    function limpiarForm() {
        setFormData({
            id: '',
            nombre: '',
            apellidoPat: '',
            apellidoMat: '',
            estado: '',
            ministerio: '',
            edad: '',
            iglesia: '',
            celular: '',
        });
    }

    const actualizarData = async () => {
        try {
            const response = await fetch(`https://ministrosdecultoapi.onrender.com/main_api/update/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar los datos');
            }
            const responseData = await response.json();
            const copyHistory = [...historicFormData];
            copyHistory[usekey] = responseData;

            setHistoricFormData(copyHistory);
            toast.info("Datos enviados correctamente");
            limpiarForm();
        } catch {
            console.log("Envio fallido");
        }
    }

    return (
        <>
            {optionMenu === 1 ?
                <section className="w-3/4 bg-white border-gray-200 dark:bg-gray-900 px-12 py-5" >
                    <form className="grid grid-cols-2 justify-between items-center mx-auto p-4 gap-3">
                        <label className="block col-start-1 row-start-1 mb-2 ptext-sm font-medium text-gray-900 dark:text-white">
                            Nombre:
                            <input type="text" name="nombre" onChange={handleChange} value={formData.nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </label>
                        <label className="block col-start-2 row-start-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Apellido Paterno:
                            <input type="text" name="apellidoPat" onChange={handleChange} value={formData.apellidoPat} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </label>
                        <label className="block col-start-1 row-start-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Apellido Materno:
                            <input type="text" name="apellidoMat" onChange={handleChange} value={formData.apellidoMat} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </label>
                        <label className="block col-start-2 row-start-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Estado:
                            <input type="text" name="estado" onChange={handleChange} value={formData.estado} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </label>
                        <label className="block col-start-1 row-start-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ministerio:
                            <input type="text" name="ministerio" onChange={handleChange} value={formData.ministerio} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </label>
                        <label className="block col-start-2 row-start-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Edad:
                            <input type="number" name="edad" onChange={handleChange} value={formData.edad} pattern="[0-9]{2}" required className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </label>
                        <label className="block col-start-1 row-start-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Iglesia:
                            <input type="text" name="iglesia" onChange={handleChange} value={formData.iglesia} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </label>
                        <label className="block col-start-2 row-start-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Celular:
                            <input type="tel" name="celular" onChange={handleChange} value={formData.celular} placeholder="XX-XXXX-XXXX" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </label>
                        <button disabled={botonDeshabilitado} className="col-span-2 row-start-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2.5 text-center mb-2" type="button" onClick={handleSent}>Agregar</button>
                        <button className="col-start-1 row-start-6 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center mb-2" type="button" onClick={actualizarData} >Actualizar</button>
                        <button className="col-start-2 row-start-6 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center mb-2" type="button" onClick={limpiarForm}>Limpiar</button>
                    </form>
                    <TableRegist history={historicFormData} onTableClick={handleTableClic} />
                </section> : <></>
            }
        </>

    );
}