export const ModalActualizarBecario = () => {
    console.log("Modal");
    return ( 
        <div className="modal" tabindex="-1" id="ModalEjemplo">
            
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Actualizar Datos</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <label>Nombre</label>
                                <input type="text" className="form-control" placeholder="Nombre" />

                            </div>

                            <div className="col-12 col-md-4">
                                <label>Apellido Paterno</label>
                                <input type="text" className="form-control" placeholder="Apellido Paterno" />

                            </div>

                            <div className="col-12 col-md-4">
                                <label>Apellido Materno</label>
                                <input type="text" className="form-control" placeholder="Apellido Materno" />

                            </div>
                        </div>

                        <div className="row">

                        <div className="col-12 col-md-4">
                                <label>Carrera</label>
                                <input type="text" className="form-control" placeholder="Carrera" />

                            </div>

                            <div className="col-12 col-md-4">
                                <label>Instituto o Universidad</label>
                                <input type="text" className="form-control" placeholder="Instituto o Universidad" />

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    )
}