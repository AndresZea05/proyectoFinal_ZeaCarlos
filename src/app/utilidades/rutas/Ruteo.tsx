import { Route, Routes } from "react-router-dom";

import { AcercaDe } from "../../componentes/otros/AcercaDe";

import { Inicio } from "../../componentes/contenedor/Inicio";
import { PeliCrear } from "../../componentes/Camisas/CamiCrear";
import { PeliAdmin } from "../../componentes/Camisas/CamiAdmin";
import { PeliListado } from "../../componentes/Camisas/CamiListado";
import { PeliActualizar } from "../../componentes/Camisas/CamiActualizar";

import { NoEncontrado } from "../../componentes/contenedor/NoEncontrado";

export const Ruteo = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
	  
      <Route path="/pcrear" element={<PeliCrear />} />
      <Route path="/padmin" element={<PeliAdmin />} />
      <Route path="/plistar" element={<PeliListado />} />
      <Route path="/pactual/:codigo" element={<PeliActualizar />} />

      <Route path="/acerca" element={<AcercaDe />} />

      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  );
};
