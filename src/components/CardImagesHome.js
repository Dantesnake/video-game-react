import { MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { database } from '../firebase/firebase';

const CardImagesHome = () => {
  const [videojuegos, setvideojuegos] = useState([]);

  var inf = {
    nombre: null,
    descripcion: null,
    imageUrl: null
  }


  const array = [inf];

  useEffect(() => {
    consulta()
},[]);

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


  return (
    <div>

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

export default CardImagesHome;
