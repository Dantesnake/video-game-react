import React, { useState } from "react";
import { MDBCard, MDBCardTitle, MDBBtn, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardBody } from "mdbreact";
import { database, storage } from "../firebase/firebase";

const CardImagesAdmin = () => {

  const [videojuegos, setvideojuegos] = useState([]);

  var inf = {
    nombre: null,
    descripcion: null,
    imageUrl: null
  }


  const array = [inf];



  function consulta() {
    array.splice(0, array.length)
    setvideojuegos([])
    var dataRef = database.ref('videoJuegos');
    dataRef.once('value', snapshot => {
      snapshot.forEach(element => {
        inf = element.val()
        array.push(inf)


      });
      setvideojuegos(array)
    });

  }
  const borrarDb = (name) => {

    database.ref('videoJuegos/' + name).remove()
    .then(function() {
      console.log("se ha borrardo.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });

  }

  const borrar = (url,name) => {
    let pictureRef = storage.refFromURL(url);
    pictureRef
        .delete()
        .then(() => {
            consulta()
          borrarDb(name)
            alert("Se ha borrado la informacion");
        })
        .catch((err) => {
            console.log(err);
        });
};

  return (
    <div>

      <MDBBtn onClick={consulta} color="primary" size="md">
        Consulta
                    </MDBBtn>

      <div class="container">
        {
          videojuegos.map((elemento) => {
            console.log('hilo');
            console.log(videojuegos);
            return (
              <div >
                <MDBCardGroup>
                  <MDBCard>
                    <MDBCardImage src={elemento.imageUrl} alt="MDBCard image cap" top hover
                      overlay="white-slight" />
                    <MDBCardBody>
                      <MDBCardTitle tag="h5">{elemento.nombre}</MDBCardTitle>
                      <MDBCardText>
                        {elemento.descripcion}
                      </MDBCardText>
                      <MDBBtn onClick={() => borrar(elemento.imageUrl,elemento.nombre)} color="primary" size="md">
                        borrar
                  </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCardGroup>

              </div>
            )
          })
        }
      </div>
    </div >
  );
}

export default CardImagesAdmin;