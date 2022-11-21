
export const RegistrosAsistencias = (Info) => {



    if(Info.value.status =="200"){

        return (
            Info.value.results.map(info =>
                    <>
                        <tr>
                            <th scope="row">{info.nombre} {info.apellido_paterno} {info.apellido_materno}</th>
                            <td>{info.asistencias}</td>
                        </tr>
                    </>
                )
        )

        
    }
}