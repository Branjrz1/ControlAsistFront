import PropTypes from 'prop-types';

TableAsist.propTypes = {
    history: PropTypes.any,
    onTableClick: PropTypes.func,
};

export default function TableAsist({history, onTableClick}) {
    
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full table-auto text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        <th scope="col" className="px-5 py-3">
                                N°
                            </th>
                            <th scope="col" className="px-5 py-3">
                                id
                            </th>
                            <th scope="col" className="px-5 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-5 py-3">
                                Apellido Paterno
                            </th>
                            <th scope="col" className="px-5 py-3">
                                Apellido Materno
                            </th>
                            <th scope="col" className="px-5 py-3">
                                Ministerio
                            </th>
                            <th scope="col" className="px-5 py-3">
                                Edad
                            </th>
                            <th scope="col" className="px-5 py-3">
                                Iglesia
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((asistencia, key) => (
                            <tr key={key} onClick={()=> onTableClick(key)} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600">
                                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {asistencia.id}
                                </th>
                                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {asistencia.persona.id}
                                </th>
                                <td className="px-4 py-4">
                                    {asistencia.persona.nombre}
                                </td>
                                <td className="px-4 py-4">
                                    {asistencia.persona.apellidoPat}
                                </td>
                                <td className="px-4 py-4">
                                    {asistencia.persona.apellidoMat}
                                </td>
                                <td className="px-4 py-4">
                                    {asistencia.persona.ministerio}
                                </td>
                                <td className="px-4 py-4">
                                    {asistencia.persona.edad}
                                </td>
                                <td className="px-4 py-4">
                                    {asistencia.persona.iglesia}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}
