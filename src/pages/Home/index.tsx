import axios from 'axios';
import { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar';
import PokemonCard from '../../components/PokemonCard';
import { Pokemon } from '../../types';
import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";

export default function Home()
{
  const [pokemonsData, setPokemonsData] = useState<Pokemon[]>([])

  const getPokemons = async () => {
    try {
      const { data } = await axios.get('https://localhost:7026/api/pokemon');
      setPokemonsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPokemons()
  }, [])

  return (
    <div>
    <Navbar refresh={getPokemons} />
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        {pokemonsData.length === 0 ? (
          <></>
        ) : (
          pokemonsData.map((pokemon, key) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
              <Box>
                <PokemonCard 
                pokemon={pokemon}
                refresh={getPokemons}
                />
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  </div>
  )
}