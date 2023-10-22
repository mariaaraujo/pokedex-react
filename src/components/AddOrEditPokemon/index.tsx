import { Dispatch, SetStateAction } from "react";

import { PokemonType } from "../../enums/type";
import { Autocomplete, Box, Button, Input, Modal, TextField, Typography } from "@mui/material";

interface AddOrEditPokemonProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;

  pokemonId?: string;

  refresh: () => Promise<void>;
} 

export function AddOrEditPokemon({openModal, setOpenModal, pokemonId, refresh}: AddOrEditPokemonProps)
{
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const objKeyPokemonType = Object.keys(PokemonType) as (keyof typeof PokemonType)[];

  return(<>
    <Modal
    open={openModal}
    onClose={() => setOpenModal(false)}
    >
    <>
      <Box sx={{ ...style, width: 400 }}>
      <Box display='flex' width='100%' justifyContent='center' padding='1rem 0 2rem 0'><Typography variant='h4'> {pokemonId ? 'Adicionar' : 'Editar'} Pokémon</Typography></Box>
        <form>
          <Box display='flex' flexDirection='column' gap='1rem'>
            <Box display='flex' gap='3.5rem' alignItems='center'>
              <Typography variant="body2">Nome: </Typography>
              <Input placeholder="Nome"  />
            </Box>
            <Box display='flex' gap='2rem' alignItems='center'>
              <Typography variant="body2">Descrição: </Typography>
              <Input placeholder="Descrição"  />
            </Box>
            <Box width='100%' display='flex' gap='4.2rem' alignItems='center'>
              <Typography variant="body2">Tipo: </Typography>
              <Autocomplete
                sx={{width: '50%'}}
                multiple
                id="tags-outlined"
                options={objKeyPokemonType}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
                    placeholder="Tipo"
                  />
                )}
              />
            </Box>
            <Box display='flex' gap='3.5rem' alignItems='center'>
              <Button></Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  </Modal>
  </>
  )
}