import { useState } from "react";
import { Camisa } from "../../modelos/Camisa";
import { ARREGLO_CAMISA } from "../../mocks/Camisa-mocks";
import { ARREGLO_CAMISA_GENERO } from "../../utilidades/dominios/DomGenero";
import { Button, Modal, Form } from "react-bootstrap";

export const PeliAdmin = () => {
  const [arrCamisas, setArrCamisas] = useState<Camisa[]>(ARREGLO_CAMISA);
  const [objPeli, setObjPeli] = useState<Camisa>(
    new Camisa(0, "", "", "", "", "", 0, "")
  );
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const obtenerNombreGenero = (valor: string) => {
    for (const objGen of ARREGLO_CAMISA_GENERO) {
      if (objGen.codGenero == valor) {
        return objGen.nombreGenero;
      }
    }
  };

  const eliminarCamisa = (codigo: number) => {
    setArrCamisas(arrCamisas.filter(camisa => camisa.codCamisa !== codigo));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setObjPeli({ ...objPeli, [name]: value });
  };

  const guardarCambios = () => {
    setArrCamisas(arrCamisas.map(camisa => (camisa.codCamisa === objPeli.codCamisa ? objPeli : camisa)));
    setShowEdit(false);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-md-11 mt-4">
          <table className="table table-bordered table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Marca</th>
                <th scope="col">Talla</th>
                <th scope="col">Color</th>
                <th scope="col">Precio</th>
                <th scope="col">Referencia</th>
                <th scope="col">Imagen</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {arrCamisas.map((miCamisa: Camisa) => (
                <tr className="align-middle" key={miCamisa.codCamisa}>
                  <td>{miCamisa.codCamisa}</td>
                  <td>{miCamisa.nombreCamisa}</td>
                  <td>{obtenerNombreGenero(miCamisa.codGeneroCamisa)}</td>
                  <td>{miCamisa.protagonistaCamisa}</td>
                  <td>{miCamisa.precioCamisa}</td>
                  <td>{miCamisa.referenciaCamisa}</td>
                  <td>
                    <img
                      src={miCamisa.imagenCamisaBase64}
                      alt=""
                      className="img-thumbnail"
                      style={{ maxWidth: "100px" }}
                    />
                    <div className="text-info">{miCamisa.imagenCamisa}</div>
                  </td>
                  <td className="text-center">
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDelete(true);
                        setObjPeli(miCamisa);
                      }}
                    >
                      <i className="fa-solid fa-trash-can text-danger"></i>
                    </a>{" "}
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowEdit(true);
                        setObjPeli(miCamisa);
                      }}
                    >
                      <i className="fa-regular fa-pen-to-square text-success"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            show={showDelete}
            onHide={handleCloseDelete}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Eliminar Camisa</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              ¿Está seguro de eliminar la camisa {objPeli.nombreCamisa}?
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDelete(false);
                }}
              >
                Cancelar
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  eliminarCamisa(objPeli.codCamisa);
                  setShowDelete(false);
                }}
              >
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showEdit}
            onHide={handleCloseEdit}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar Camisa</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formNombreCamisa">
                  <Form.Label>Marca de la camisa</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreCamisa"
                    value={objPeli.nombreCamisa}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formProtagonistaCamisa">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="protagonistaCamisa"
                    value={objPeli.protagonistaCamisa}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCodGeneroCamisa">
                  <Form.Label>Talla</Form.Label>
                  <Form.Select
                    name="codGeneroCamisa"
                    value={objPeli.codGeneroCamisa}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleEditChange(e)}
                  >
                    <option value="">Seleccione una talla</option>
                    {ARREGLO_CAMISA_GENERO.map((miGenero) => (
                      <option key={miGenero.codGenero} value={miGenero.codGenero}>
                        {miGenero.nombreGenero}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrecioCamisa">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precioCamisa"
                    value={objPeli.precioCamisa}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formReferenciaCamisa">
                  <Form.Label>Referencia</Form.Label>
                  <Form.Control
                    type="text"
                    name="referenciaCamisa"
                    value={objPeli.referenciaCamisa}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={guardarCambios}>
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
