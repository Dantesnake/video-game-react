import { MDBBtn } from 'mdbreact';
import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { database, storage } from '../firebase/firebase';
import CardImagesAdmin from './CardImagesAdmin';

const AddJuegos = () => {

  const [nombre, setNombre] = useState('');
  const [descripcion, setdescripcion] = useState('');
  const [image, setImage] = useState(null);

  var inf = {
    nombre: null,
    descripcion: null,
    imageUrl: null
  }
  const array = [inf];

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(file);
          setImage(file);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(null);
    }
  };


  function guardarDb(name, description, url) {
    database.ref('videoJuegos/' + name).set({
      nombre: name,
      descripcion: description,
      imageUrl: url
    });
  }
  const guardar = () => {
    if (image) {
      const storageRef = storage.ref(localStorage.getItem('usuario'));
      const imageRef = storageRef.child(image.name);
      imageRef.put(image).then(() => {
        storage
          .ref(localStorage.getItem('usuario'))
          .child(image.name)
          .getDownloadURL()

          .then((url) => {

            guardarDb(nombre, descripcion, url);
            alert("Se guardo correctamente la informacion");
          });
      });
    } else {
      alert("Guarde primero una imagen");
    }
  };






  return (
    <div>
      {localStorage.getItem('usuario') ?

        <div>
          <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">Nombre</label>
              <input onChange={(e) => { setNombre(e.target.value) }} type="text" class="form-control" id="exampleFormControlInput1" />
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Ingrese una descripcion</label>
                <textarea onChange={(e) => { setdescripcion(e.target.value) }} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFileLang" lang="es" onChange={(e) => { onImageChange(e); }} />
                <label class="custom-file-label" for="customFileLang">Seleccionar Archivo</label>
              </div>
            </div>
            <MDBBtn color="primary" size="md" onClick={guardar} >
              Guardar
          </MDBBtn>
          </form>
          <CardImagesAdmin/>


        </div>


        :

        <Redirect to='/home' />


      }
    </div>
  );
}

export default AddJuegos;
