import PropTypes from 'prop-types';

Metrics.propTypes = {
    metricData: PropTypes.any.isRequired,
};

export default function Metrics({ metricData }) {

    return (
        <>
            <div className="flex flex-col w-full h-screen gap-5 items-center justify-start ">
                <h1 className="dark:text-white text-3xl font-extrabold mb-4">Lista de Datos</h1>
                <div className="flex flex-row columns-3 gap-7 justify-center items-center ">
                    <div className=" flex flex-col justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md min-w-72 min-h-64 text-xl text-pretty">
                        <h2 className="dark:text-white text-xl font-semibold mb-2">Ministros </h2>
                        <p className="dark:text-white text-gray-700 mb-2">Ministros de culto: <strong>{metricData.ministros}</strong></p>
                        <p className="dark:text-white text-gray-700 mb-2">Ministros de cultoX: <strong>{metricData.ministrosX}</strong></p>
                        <p className="dark:text-white text-gray-700">Ministros de culto: <strong>{metricData.ministrosX + metricData.ministros}</strong></p>
                        <p className="dark:text-white text-gray-700 mt-4"><span className='font-extrabold text-2xl '>TOTAL: </span></p>
                        <p className="dark:text-white text-gray-700">Ministros asistentes: <strong>{metricData.ministrosAsistX + metricData.ministrosAsist}</strong></p>
                    </div>

                    <div className=" flex flex-col justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md min-w-72 min-h-64 text-xl text-pretty">
                        <h2 className="dark:text-white text-xl font-semibold mb-2">Asistentes </h2>
                        
                        <p className="dark:text-white text-gray-700 mb-2">Asistentes +14: <strong>{metricData.asistentes}</strong></p>
                        <p className="dark:text-white text-gray-700 mb-2">ministros norm asistentes: <strong>{metricData.ministrosAsist}</strong></p>
                        <p className="dark:text-white text-gray-700 mb-2">ministros X asistentes: <strong>{metricData.ministrosAsistX}</strong></p>
                        <p className="dark:text-white text-gray-700 mb-2">ministros asistentes: <strong>{metricData.ministrosAsistX + metricData.ministrosAsist}</strong></p>
                        <p className="dark:text-white text-gray-700 mt-4"><span className='font-extrabold text-2xl '>TOTAL: </span></p>
                        <p className="dark:text-white text-gray-700">Asistentes Totales: <strong>{metricData.asistentes + metricData.niños}</strong></p>
                    </div>

                    <div className=" flex flex-col justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg min-w-72 min-h-64 text-xl text-pretty">
                        <h2 className="dark:text-white text-xl font-semibold mb-2">Niños</h2>
                        <p className="dark:text-white text-gray-700 mb-2">Niños: <strong>{metricData.niños}</strong></p>

                        <p className="dark:text-white text-gray-700 mt-4"><span className='font-extrabold text-2xl '>TOTAL: </span></p>
                        <p className="dark:text-white text-gray-700">Niños: <strong>{metricData.niños}</strong></p>
                    </div>
                </div>
            </div>
        </>
    );
}