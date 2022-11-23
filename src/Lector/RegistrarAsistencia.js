export const RegistrarAsistencia = () => {
    let Datos = new FormData();

    Datos.append("id_estudiante", 2);

    fetch('http://transportesflores.info/api-transporte/asistencias', {
        method: 'POST',
        body: Datos
    }).then(ResponseRaw => ResponseRaw.json())
    .then(Respuesta => {
        console.log(Respuesta);
    })
}