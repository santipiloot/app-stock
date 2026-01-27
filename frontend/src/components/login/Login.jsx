
import {useState} from "react";
import { useAuth } from "../../auth/auth.jsx"; 
import {useNavigate, Link} from "react-router";


function Login() {

  const navigate = useNavigate();

  const {error, login} = useAuth();

  //const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();

    console.log("Usuario: ", user);
    console.log("Contra: ", password);

    const res = await login(user, password);
    
    if (res.success){
      navigate("/");
    }

  }


  return (
    <div className='mb-3'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className='mb-3'>
            <label htmlFor="inputUser" className='form-label'>Nombre de usuario:</label>
            <input value={user} onChange={(e) => setUser(e.target.value)} type="user" className='form-control' id='inputUser' aria-describedby='userHelp'/>
            <div id='userHelp' className='form-text'>Nosotros nunca compartiriamos tus datos con nadie</div>
        </div>
        <div className='mb-3'>
            <label htmlFor="InputPassword1" className="form-label">Contraseña:</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="InputPassword1"/>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
        </fieldset>
        <footer>
          <div>
            <button type='submit' className='btn btn-primary'>Iniciar Sesion</button>
            <Link className="nav-link active" to="/">Cancelar</Link>
          </div>
        </footer>
      
      </form>
        
    
    </div>
    
        
  )
}

export default Login 