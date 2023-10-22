import { useState } from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Pokemon } from "../../types";
import { PokemonType } from "../../enums/type";
import { AddOrEditPokemon } from "..";

interface PokemonCardProps {
  pokemon: Pokemon;
  refresh: () => Promise<void>;
}

export default function PokemonCard({pokemon, refresh }: PokemonCardProps) {
  const { _id, name, description, type } = pokemon

  const [openModal, setOpenModal] = useState(false);
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
              {PokemonType[item]}
              </Typography>
            </Box>
            )}
            </Box>
        </Box>
        <Box width='100%' display='flex' gap='1rem' paddingTop='1rem'>
          <Button variant="contained">Editar</Button>
          <Button variant="contained" sx={{backgroundColor: '#FF1919', ':hover': {backgroundColor: '#FF3232'}}}>Excluir</Button>
        </Box>
      </CardContent>
    </Card>

    {openModal && 
      <AddOrEditPokemon 
      openModal={openModal}
      setOpenModal={setOpenModal}
      pokemonId={pokemon._id}
      refresh={refresh}
      />
    }
    </>
  );
}