import PropTypes from 'prop-types';

InDevelopMent.propTypes = {
    handeCloseWindow: PropTypes.any.isRequired,
    isWindowActive: PropTypes.bool.isRequired,
};

export default function InDevelopMent({ handeCloseWindow, isWindowActive }) {
    console.log(isWindowActive);
    return (
        <>
            {isWindowActive && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center'>
                <section className="flex flex-col w-2/4 bg-white border-gray-200 dark:bg-gray-900 px-7 py-5">
                    <div className='w-full flex flex-col justify-end'>
                        <h3 className='text-2xl font-extrabold font-serif'>A UN NO DISPONOBLE</h3>
                        <p className='m-5 text-pretty '>
                            Esta sección esta actualmente en desarrollo por lo que le pedimos tenga paciencia con estas funcionalidades que estamos preparando para ustedes en un futuro, agradecemos su paciencia y la espera por nuevas bersiones de desarrollo para este programa Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur ipsum facere sequi! Neque, fugiat alias temporibus incidunt iusto ipsum, voluptate maiores consequatur adipisci eum praesentium quidem sunt aut deleniti tempora.
                        </p>
                        <div className='w-full flex justify-end my-9'>
                            <button onClick={handeCloseWindow} className="w-1/3 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center mb-2" type="button"  >De acuerdo</button>
                        </div>
                    </div>
                </section>
            </div>}
        </>
    );
}