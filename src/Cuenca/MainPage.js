import { DashboardC } from "../Dashboard/DashboardCuenca"

export const MainPageC = () => {
    
    return (
        <>
            <DashboardC />
            <div className="container mt-5 pt-2">
                <h2>Asistencia del día </h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="row">Nombre</th>
                            <th scope="row">Primera Asistencia</th>
                            <th scope="row">Segunda Asistencia</th>
                        </tr>
                    </thead>

                </table>

            </div>

        </>
    )
}