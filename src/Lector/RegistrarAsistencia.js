export const RegistrarAsistencia = () => {
    let Datos = new FormData();

    Datos.append("id_estudiante", 2);

    fetch(encodeURI('https://transportesflores.info/api-transporte/asistencias'), {
        method: 'POST',
        body: Datos
    }).then(ResponseRaw => ResponseRaw.json())
    .then(Respuesta => {
        console.log(Respuesta);
    })
}