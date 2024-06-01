import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camisa } from "../../modelos/Camisa";
import noFoto from "../../../assets/img/noDisponible.png";
import { CamisaGenero } from "../../modelos/CamisaGenero";
import { ARREGLO_CAMISA } from "../../mocks/Camisa-mocks";
import { useFormulario } from "../../utilidades/misHooks/useFormulario";
import { ConvertirBase64 } from "../../utilidades/funciones/ConvertirBase64";
import { ARREGLO_CAMISA_GENERO } from "../../utilidades/dominios/DomGenero";

export const PeliCrear = () => {
  const irsePara = useNavigate();

  type formHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [imgBase64, setImgBase64] = useState<any>();
  const [imgMiniatura, setimgMiniatura] = useState<any>(noFoto);

  const [arrCamisas] = useState<Camisa[]>(ARREGLO_CAMISA);
  const [arrGeneros] = useState<CamisaGenero[]>(ARREGLO_CAMISA_GENERO);

  let {
    nombreCamisa,
    protagonistaCamisa,
    codGeneroCamisa,
    imagenCamisa,
    precioCamisa,
    referenciaCamisa,
    dobleEnlace,
    objeto,
  } = useFormulario<Camisa>(new Camisa(0, "", "", "", "", "", 0, ""));

  const enviarForm = (objForm: formHtml) => {
    objForm.preventDefault();
    const formulario = objForm.currentTarget;

    if (formulario.checkValidity() === false) {
      objForm.preventDefault();
      objForm.stopPropagation();
      setEnProceso(true);
    } else {
      const ultimaPeli = arrCamisas[arrCamisas.length - 1];
      const nuevoCod = ultimaPeli.codCamisa + 1;
      objeto.codCamisa = nuevoCod;
      objeto.imagenCamisa = imagenCamisa.substring(
        imagenCamisa.lastIndexOf("\\") + 1
      );
      objeto.imagenCamisaBase64 = imgBase64;
      arrCamisas.push(objeto);
      setEnProceso(false);
      irsePara("/plistar");
    }
  };

  const cargarImagen = async (e: any) => {
    const archivos = e.target.files;
    const imagen = archivos[0];
    setimgMiniatura(URL.createObjectURL(imagen));
    dobleEnlace(e);
    const base64 = await ConvertirBase64(imagen);
    setImgBase64(base64);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-6 mt-5 pb-4">
        <Form noValidate validated={enProceso} onSubmit={enviarForm}>
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h5>Formulario creación</h5>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <Form.Group controlId="nom">
                  <Form.Label>
                    <span className="text-danger">*</span> Marca de la camisa
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    required
                    type="text"
                    name="nombreCamisa"
                    value={nombreCamisa}
                    onChange={dobleEnlace}
                    className="form-control"
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="pro">
                  <Form.Label>
                    <span className="text-danger">*</span> Color
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    required
                    type="text"
                    name="protagonistaCamisa"
                    value={protagonistaCamisa}
                    onChange={dobleEnlace}
                    className="form-control"
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="gen">
                  <Form.Label>
                    <span className="text-danger">*</span> Talla
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    required
                    name="codGeneroCamisa"
                    value={codGeneroCamisa}
                    onChange={dobleEnlace}
                    className="form-select"
                  >
                    <option value="">Seleccione una talla</option>
                    {arrGeneros.map((miGenero: CamisaGenero) => (
                      <option
                        value={miGenero.codGenero}
                        key={miGenero.codGenero}
                      >
                        {miGenero.nombreGenero}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="precio">
                  <Form.Label>
                    <span className="text-danger">*</span> Precio
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    required
                    type="number"
                    name="precioCamisa"
                    value={precioCamisa}
                    onChange={dobleEnlace}
                    className="form-control"
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="referencia">
                  <Form.Label>
                    <span className="text-danger">*</span> Referencia
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    required
                    type="text"
                    name="referenciaCamisa"
                    value={referenciaCamisa}
                    onChange={dobleEnlace}
                    className="form-control"
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="fot">
                  <Form.Label>
                    <span className="text-danger">*</span> Imagen
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    required
                    type="file"
                    name="imagenCamisa"
                    value={imagenCamisa}
                    onChange={cargarImagen}
                    className="form-control"
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-center">
                  <img
                    src={imgMiniatura}
                    alt="no foto"
                    className="img-thumbnail"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Crear Camisa
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
