import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import Form from './componentes/Form'
// import Buscar from './componentes/Buscar'
// import BuscarAp from './componentes/BuscarAp'
import Formulario from './componentes/Formulario'
import Form from './componentes/Form';
import Header from './componentes/Header'
import Aside from './componentes/Aside'
import TableRegist from './componentes/TableRegist';
import TableAsist from './componentes/TableAsist';
import Metrics from './componentes/Metrics';
import InDevelopMent from './componentes/InDevelopMent';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    const [historicFormData, setHistoricFormData] = useState([]);
    const [optionMenu, setOptionMenu] = useState(1);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredAsist, setFilteredAsist] = useState([]);
    const [filterData, setFilterData] = useState("");
    const [originalUsers, setOriginalUsers] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellidoPat: '',
        apellidoMat: '',
        estado: '',
        ministerio: '',
        edad: '',
        iglesia: '',
        celular: ''
    });
    const [statusForm, setStatusForm] = useState(false);
    const [keyForm, setKeyForm] = useState(0)
    const [asist, setAsist] = useState([]);
    const [MetricData, setMetricData] = useState([]);
    const [isWindowActive, setIsWindowActive] = useState(true)
    // Estado para controlar el modo (true para modo oscuro, false para modo claro)
    const [darkMode, setDarkMode] = useState(false);

    // Función para alternar entre modo claro y modo oscuro
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const element = document.documentElement;
        const appClasses = darkMode ? 'dark' : 'light';
        element.className = appClasses;
    }, [darkMode])

    useEffect(() => {
        // Cargar todos los usuarios al inicio
        const fetchAllUsers = async () => {
            try {
                const response = await fetch('https://ministrosdecultoapi.onrender.com/main_api/ola');
                if (!response.ok) {
                    throw new Error('Error al buscar usuarios');
                }
                const userData = await response.json();
                setAllUsers(userData); // Actualizar los usuarios filtrados
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al buscar usuarios');
            }
        };

        // Ejecutar fetchAllUsers siempre que cambie optionMenu
        fetchAllUsers();
    }, []);

    const handleAll = async () => {
        try {
            const response = await fetch('https://ministrosdecultoapi.onrender.com/main_api/ola');
            if (!response.ok) {
                throw new Error('Error al buscar usuarios');
            }
            const searchData = await response.json();
            console.log(searchData);

            setAllUsers(searchData);
            setFilteredUsers(searchData);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al buscar usuarios');
        }
    };

    const handleFilterChange = (e) => {
        const keyword = e.target.value ? e.target.value.toLowerCase() : ''; // Convertir a minúsculas solo si e.target.value no es nulo
        setFilterData(keyword);
        if (optionMenu !== 4) {
            // Filtrar usuarios
            const currentData = optionMenu === 3 ? originalUsers : allUsers;
            const filteredUsers = currentData.filter(user => {
                const apellidoPat = user.apellidoPat ? user.apellidoPat.toLowerCase() : '';
                const apellidoMat = user.apellidoMat ? user.apellidoMat.toLowerCase() : '';
                return (
                    user.nombre.toLowerCase().includes(keyword) ||
                    apellidoPat.includes(keyword) ||
                    apellidoMat.includes(keyword)
                );
            });
            setFilteredUsers(filteredUsers);
        } else {
            // Filtrar asistentes
            const filteredAsist = asist.filter(asistente => {
                const { nombre, apellidoPat, apellidoMat } = asistente.persona;
                const nombreLower = nombre ? nombre.toLowerCase() : ''; // Manejar el nombre null
                const apellidoPatLower = apellidoPat ? apellidoPat.toLowerCase() : ''; // Manejar el apellidoPat null
                const apellidoMatLower = apellidoMat ? apellidoMat.toLowerCase() : ''; // Manejar el apellidoMat null
                return (
                    nombreLower.includes(keyword) ||
                    apellidoPatLower.includes(keyword) ||
                    apellidoMatLower.includes(keyword)
                );
            });
            setFilteredAsist(filteredAsist);
        }
    };

    const handleSearchMinisterio = async () => {
        try {
            const response = await fetch('https://ministrosdecultoapi.onrender.com/main_api/ministro');
            if (!response.ok) {
                throw new Error('Error al buscar usuarios');
            }
            const searchData = await response.json();
            console.log(searchData);
            setOriginalUsers(searchData);
            setFilteredUsers(searchData);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al buscar usuarios');
        }
    };

    function handleMenuSelect(i) {
        setOptionMenu(i);
        if (i === 1) {
            setFilterData(""); // Reiniciar el filtro al cambiar de menú
        } if (i === 2) {
            handleAll();
        } if (i === 3) {
            setFilterData(""); // Reiniciar el filtro al cambiar de menú
            handleSearchMinisterio();
        } if (i === 4) {
            setAsist([])
            handleShowAllAist();
        } if (i === 5) {
            handleGetMetrics();
        } if (i === 6) {
            setIsWindowActive(true);
        } if (i === 7) {
            setIsWindowActive(true)
        }
    }

    function updateAllUsers(...data) {
        setHistoricFormData(...data)
        console.log(data)
        console.log(historicFormData)
    }


    function handleTableClic(key) {
        setStatusForm(true);
        setKeyForm(key)
        setFormData(filteredUsers[key])
        console.log(key)
        console.log(statusForm)
    }

    function closeForm() {
        setStatusForm(false)
    }

    const actualizarData = async (data) => {
        try {
            const response = await fetch(`https://ministrosdecultoapi.onrender.com/main_api/update/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar los datos');
            }
            const responseData = await response.json();
            const dataActu = [...filteredUsers];
            dataActu[keyForm] = responseData;
            if (optionMenu !== 2) {
                handleAsist(data.id)
            }
            setFilteredUsers(dataActu);
            console.log(responseData)
            closeForm();

        } catch {
            console.log("Envio fallido");
        }
    }

    const handleAsist = async (id) => {
        // Verificar si el ID ya está registrado
        const checkResponse = await fetch(`https://ministrosdecultoapi.onrender.com/main_api/checkAsistencia/${id}`);
        if (!checkResponse.ok) {
            throw new Error('Error al verificar el ID');
        }

        const isIdRegistered = await checkResponse.json();
        if (isIdRegistered) {
            // Si el ID ya está registrado, mostrar un mensaje de error o tomar la acción correspondiente
            console.error('El ID ya está registrado');
            toast.error("El ID ya esta registrado")
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

    const handleShowAllAist = async () => {
        try {
            const response = await fetch('https://ministrosdecultoapi.onrender.com/main_api/asistentes');
            if (!response.ok) {
                throw new Error('Error al buscar usuarios');
            }
            const searchData = await response.json();
            console.log(searchData);
            setAsist(searchData);
            setFilteredAsist(searchData);
            console.log(...asist);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al buscar usuarios');
        }
    };

    const handleGetMetrics = async () => {
        try {
            const response = await fetch('https://ministrosdecultoapi.onrender.com/main_api/metrics/all');
            if (!response.ok) {
                throw new Error('Error al buscar usuarios');
            }
            const searchData = await response.json();
            console.log(searchData);
            setMetricData(searchData);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al buscar usuarios');
        }


    };

    function handleColoseWindow() {
        setIsWindowActive(false)
        setOptionMenu(1);
    }


    return (
        <>
            <Header filterData={filterData} handleFilterChange={handleFilterChange} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <main className='flex flex-row'>
                <Aside handleMenuSelect={handleMenuSelect} optionMenu={optionMenu} useKey={keyForm} />
                <Formulario optionMenu={optionMenu} updateAllUsers={updateAllUsers} />
                {optionMenu === 2 &&
                    <section className="w-3/4 bg-white border-gray-200 dark:bg-gray-900 px-12 py-5" >
                        <TableRegist history={filteredUsers} onTableClick={handleTableClic} />
                        {statusForm ? <Form data={formData} onClose={closeForm} onUpdate={actualizarData} /> : <></>}
                    </section>}
                {optionMenu === 3 ?
                    <section className="w-3/4 bg-white border-gray-200 dark:bg-gray-900 px-12 py-5" >
                        <TableRegist history={filteredUsers} onTableClick={handleTableClic} onClose={closeForm} />
                        {statusForm ? <Form data={formData} onClose={closeForm} onUpdate={actualizarData} /> : <></>}
                    </section> : <></>}
                {optionMenu === 4 ?
                    <section className="w-3/4 bg-white border-gray-200 dark:bg-gray-900 px-12 py-5" >
                        <TableAsist history={filteredAsist} onTableClick={() => { }} />
                    </section> : <></>}
                {optionMenu === 5 ?
                    <section className="w-3/4 bg-white border-gray-200 dark:bg-gray-900 px-12 py-5" >
                        <Metrics metricData={MetricData} />
                    </section> : <></>}
                {optionMenu === 6 ?
                    <section className="w-3/4 bg-white border-gray-200 dark:bg-gray-900 px-12 py-5" >
                        <InDevelopMent handeCloseWindow={handleColoseWindow} isWindowActive={isWindowActive} />
                    </section> : <></>}
                {optionMenu === 7 ?
                    <section className="w-3/4 bg-white border-gray-200 dark:bg-gray-900 px-12 py-5" >
                        <InDevelopMent handeCloseWindow={handleColoseWindow} isWindowActive={isWindowActive} />
                    </section> : <></>}
            </main>
            <ToastContainer />
        </>
    );
}
export default App