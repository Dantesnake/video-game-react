import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { authFirebase, provider } from "../firebase/firebase";

const NavbarPage = () => {

  const history = useHistory()

  var usuario
  const IniciarSesion = () => {

    if (localStorage.getItem('usuario')) {

      history.push('/addGames')

    } else {
      authFirebase.auth().signInWithPopup(provider)
        .then((result) => {
          console.log(usuario)
          usuario = result.user
          console.log(usuario)
          console.log(usuario.email.slice(0, -10))
          localStorage.setItem('usuario', usuario.email.slice(0, -10))
          history.push('/addGames');
          // ..
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
        });

    }
  }

  const CerrarSesion = () => {
    authFirebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('usuario')
        history.push('/home')
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });

  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item"  >
              <Link class="nav-link" to="/home" class="navbar-brand">Home</Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Usuario
        </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" onClick={IniciarSesion}>Iniciar Sesion</a>
                <a class="dropdown-item" onClick={CerrarSesion}>Cerrar Sesion</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/addGames">Agregar Video Juegos</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarPage;