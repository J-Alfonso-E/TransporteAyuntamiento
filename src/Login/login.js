
export const Login = () => {

    return (
        <div className="BGImage">
            <div className="container mt-5">
                <div className="BannerLogin d-flex justify-content-center">

                    <div className="row ">
                        <label className="pt-3 text-center">
                            Programa de Becas de Trasnporte para los jovenes del Municipio de Cuitzeo, Michoacan.
                        </label>

                        <label className="pt-3 pb-3 text-center">
                            H. Ayuntamiento 2021-2024
                        </label>
                    </div>


                </div>

                <div className="row mt-5 ">

                    <div className="col-md-5 LoginSection mx-auto">
                        <div className="row">
                            <h4>Ingresar</h4>
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <label>Email</label>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input type="text" className="form-control" placeholder="Email" />
                            </div>

                            <div className="col-md-12 col-sm-12 mt-2">
                                <label>Contraseña</label>
                            </div>
                            <div className="col-md-12 col-sm-12 ">
                                <input type="text" className="form-control" placeholder="Contraseña" />
                            </div>

                            <div className="col-md-5 col-sm-12 mt-2 pb-4">
                                <button type="button" className="btn btn-primary">Ingresar</button>
                            </div>



                        </div>
                    </div>



                </div>
            </div>
        </div>


    )
}