import React from 'react'

function Login() {
  return (
    <form>
        <div className='mb-3'>
            <label htmlFor="inputEmail" className='form-label'>CCorreo electronico</label>
            <input type="email" className='form-control' id='inputEmail' aria-describedby='emailHelp'/>
            <div id='emailHelp' className='form-text'>Nosotros nunca compartiriamos tu correo con nadie</div>
        </div>
        <div className='mb-3'>
            <label htmlFor="InputPassword1" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="InputPassword1"></input>
        </div>
        <button type='submit' className='btn btn-primary'>Iniciar Sesion</button>
    </form>
  )
}

export default Login