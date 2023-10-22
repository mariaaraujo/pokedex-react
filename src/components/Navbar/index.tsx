import { useState } from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import pokemonLogo from '../../assets/pokemon.png'
import { AddOrEditPokemon } from '../AddOrEditPokemon';

interface NavbarProps {
  refresh: () => Promise<void>
}

export function Navbar({ refresh }:NavbarProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: "2em" }}>
        <AppBar position="static" sx={{ backgroundColor: "#424242" }}>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box component="img" src={pokemonLogo} height="3em" sx={{ cursor: "pointer" }} />
                <Box display='flex' gap='1rem'>
                <Button variant="contained" onClick={() => {setOpenModal(true)}}>Adicionar Novo</Button>
                </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {openModal && 
      <AddOrEditPokemon 
      openModal={openModal}
      setOpenModal={setOpenModal}
      pokemonId=''
      refresh={refresh}
      />}
    </>
  );
}