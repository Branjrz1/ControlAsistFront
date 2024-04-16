import { useState } from 'react';
import PropTypes from 'prop-types';

Form.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export default function Form({ data, onClose, onUpdate}) {

    const [formData, setFormData] = useState(data)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center'>
            <section className="flex flex-col w-2/4 bg-white border-gray-200 dark:bg-gray-900 px-7 py-5">
                    <div onClick={onClose} className=' flex justify-end w-full text-red-700 border-slate-900 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                <form className="w-full grid grid-cols-2 justify-items-stretch items-center mx-auto px-2 py-4 gap-3">
                    <label className="block col-start-1 row-start-2 mb-2 ptext-sm font-medium text-gray-900 dark:text-white">
                        Nombre:
                        <input type="text" name="nombre" onChange={handleChange} value={formData.nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </label>
                    <label className="block col-start-2 row-start-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Apellido Paterno:
                        <input type="text" name="apellidoPat" onChange={handleChange} value={formData.apellidoPat} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </label>
                    <label className="block col-start-1 row-start-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Apellido Materno:
                        <input type="text" name="apellidoMat" onChange={handleChange} value={formData.apellidoMat} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </label>
                    <label className="block col-start-2 row-start-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Estado:
                        <input type="text" name="estado" onChange={handleChange} value={formData.estado} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </label>
                    <label className="block col-start-1 row-start-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ministerio:
                        <input type="text" name="ministerio" onChange={handleChange} value={formData.ministerio} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </label>
                    <label className="block col-start-2 row-start-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Edad:
                        <input type="number" name="edad" onChange={handleChange} value={formData.edad} pattern="[0-9]{2}" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </label>
                    <label className="block col-start-1 row-start-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Iglesia:
                        <input type="text" name="iglesia" onChange={handleChange} value={formData.iglesia} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </label>
                    <label className="block col-start-2 row-start-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Celular:
                        <input type="tel" name="celular" onChange={handleChange} value={formData.celular} pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}" placeholder="XX-XXXX-XXXX" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </label>
                </form>
                    <div className='w-full flex justify-end'>
                        <button className="w-1/3 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center mb-2" type="button" onClick={()=>onUpdate(formData)} >Asistio</button>
                    </div>
            </section>
        </div>

    );
}