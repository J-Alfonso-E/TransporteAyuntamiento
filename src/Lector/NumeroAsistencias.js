export const NumeroAsitencias = async () => {

    const RespuestaRaw = await fetch(encodeURI(`https://becatransportecuitzeo2021-2024.com/api-transporte/asistencias?linkTo=id_estudiante&equalTo=2&linkToRange=fecha&between1=2022-11-02 00:00:00&between2=2022-11-02 23:59:59`), {
        method: 'GET'
    })

    const Respuesta = await RespuestaRaw.json();

    return RespuestaRaw;
}