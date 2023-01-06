export const AlertaUsuarioDuplicado = () => {
    return(
        <div className="alert alert-danger alert-dismissible" role="alert">
            <div>Ya hay un usuario registrado con este nombre</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-aria-label="Close"></button>

        </div>
    )
}