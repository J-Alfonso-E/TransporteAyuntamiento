
export const RegistroListaBecarios = (Info)  => {

    if(Info.value.status =="200"){

        return (
            Info.value.results.map(info =>
                    <>
                        <tr>
                            <th scope="row">{info.nombre} {info.apellido_paterno} {info.apellido_materno}</th>
                            <td>{info.escuela}</td>
                            <td>{info.correo}</td>
                            <td>"Sin Asignar"</td>
                            <td>{info.telefono}</td>
                            <td>
                                <i className="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#ModalEjemplo" aria-hidden="true"></i>
                            </td>
                        </tr>
                    </>
                )
        )

        
    }
}

