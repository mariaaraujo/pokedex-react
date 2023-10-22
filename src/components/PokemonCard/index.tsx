import { useState } from 'react'
import { Pokemon } from "../../types";
import { PokemonType } from "../../enums/type";
import { AddOrEditPokemon } from "..";
import { Box, Button, Card, CardContent, Modal, Typography } from "@mui/material";
import axios from 'axios';

interface PokemonCardProps {
  pokemon: Pokemon;
  refresh: () => Promise<void>
}

export default function PokemonCard({ pokemon, refresh }: PokemonCardProps) {
  const { _id, name, description, type } = pokemon;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  const deletePokemon = async () => {
    const { status } = await axios.delete(`https://localhost:7026/api/pokemon/${_id}?_id=${_id}`);

      if (status === 204)
      {
        refresh()
        setOpenDeleteModal(false)
      }
  };

  return (
    <>
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Box display='flex' flexDirection='column' gap='0.5rem'>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">
          Descrição: {description}
          </Typography>
          <Typography variant="body2">
          Tipo:
          </Typography>
          <Box display='flex' gap='0.3rem'>
            {type.map((item, index) => 
            <Box key={index} display='flex' padding='0.4rem' border='1px solid black' borderRadius='0.5rem'>
              <Typography sx={{fontSize: '0.8rem'}}>
              {PokemonType[item as keyof typeof PokemonType]}
              </Typography>
            </Box>
            )}
            </Box>
        </Box>
        <Box width='100%' display='flex' gap='1rem' paddingTop='1rem'>
          <Button variant="contained" onClick={() => setOpenEditModal(true)}>Editar</Button>
          <Button variant="contained" sx={{backgroundColor: '#FF1919', ':hover': {backgroundColor: '#FF3232'}}} onClick={() => setOpenDeleteModal(true)}>Deletar</Button>
        </Box>
      </CardContent>
    </Card>
 
    {openEditModal && 
      <AddOrEditPokemon 
      openModal={openEditModal}
      setOpenModal={setOpenEditModal}
      pokemonId={_id}
      refresh={refresh}
      />
    }

    {openDeleteModal && 
    <Modal
    open={openDeleteModal}
    onClose={() => setOpenDeleteModal(false)}
    >
      <>
      <Box sx={{ ...style, width: 400 }}>
        <Box display='flex' width='100%' justifyContent='center' padding='1rem 0 2rem 0'><Typography variant='h4'> Deletar Pokémon</Typography></Box>
        <Box width='100%' display='flex' flexDirection='column' justifyContent='center'>
          <Typography>Deseja realmente deletar este Pokémon?</Typography>
          <Typography>Está ação é irreversível.</Typography>
        </Box>
        <Box paddingTop='2rem' width='100%' display='flex' justifyContent='center' gap='0.7rem'>
          <Button variant='outlined' sx={{borderColor: '#FF1919', color: 'red', ':hover': {borderColor: '#FF3232'}}} onClick={() => setOpenDeleteModal(false)}>Cancelar</Button>
          <Button variant='contained' sx={{backgroundColor: '#FF1919', ':hover': {backgroundColor: '#FF3232'}}} onClick={() => deletePokemon()}>Deletar</Button>
        </Box>
      </Box>
      </>
    </Modal>
    }
    </>
  );
}