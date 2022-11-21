
export const AsistenciaporBecario = async () => {

    //const fechahora = new Date().getMinutes();

    const Temp = new Date();
    let Dia = "";

    if(Temp.getDate() <10){
        Dia += "0" + Temp.getDate();
    }
    else{
        Dia += Temp.getDate();
    }

    const FechaActual = Temp.getFullYear() +"-" + (Temp.getMonth()+1) +"-" + Dia;

    const RespuestaRaw = await fetch(`http://localhost/api-transporte/asistencias?linkTo=id_estudiante&equalTo=2&linkToRange=fecha&between1=2022-11-02 00:00:00&between2=2022-11-02 23:59:59`, {
        method: 'GET'});
    
    const Datos = await RespuestaRaw.json();
    console.log(Datos);

    return Datos;

    

}