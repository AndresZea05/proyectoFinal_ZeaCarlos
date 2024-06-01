import { useState } from "react";
import { Camisa } from "../../modelos/Camisa";
import { ARREGLO_CAMISA } from "../../mocks/Camisa-mocks";
import { ARREGLO_CAMISA_GENERO } from "../../utilidades/dominios/DomGenero";

export const PeliListado = () => {
  const [arrCamisas] = useState<Camisa[]>(ARREGLO_CAMISA);

  const obtenerNombreGenero = (valor: string) => {
    for (const objGen of ARREGLO_CAMISA_GENERO) {
      if (objGen.codGenero == valor) {
        return objGen.nombreGenero;
      }
    }
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
              </tr>
            </thead>
            <tbody>
              {arrCamisas.map((miCamisa: Camisa) => (
                <tr key={miCamisa.codCamisa}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
