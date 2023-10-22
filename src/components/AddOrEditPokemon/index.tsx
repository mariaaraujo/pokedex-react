import { Dispatch, SetStateAction, useEffect } from "react";

import { PokemonType } from "../../enums/type";
import { Autocomplete, Box, Button, Input, Modal, TextField, Typography } from "@mui/material";
import { AddPokemon, AddPokemonFormValidationsSchema } from "./formValidationSchema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import axios from "axios";
import { Pokemon } from "../../types";

interface AddOrEditPokemonProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;

  pokemonId?: string;
  refresh: () => Promise<void>;
} 

export function AddOrEditPokemon({openModal, setOpenModal, pokemonId, refresh }: AddOrEditPokemonProps)
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
  const updateMode = !!pokemonId

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddPokemon>({
    resolver: yupResolver(AddPokemonFormValidationsSchema),
    defaultValues: {
      name: '',
      type: []
    },
  });

  const setPokemonValue = (pokemon: Pokemon) => {
    setValue("name", pokemon.name), 
    setValue("description", pokemon.description), 
    setValue("type", pokemon.type)
  }

  const addPokemon = async (values: AddPokemon) => {
    const { status } = await axios.post("https://localhost:7026/api/pokemon", {
      name: values.name,
      description: values.description,
      type: values.type.length > 0 ? values.type : ['NORMAL']
    });

    if (status == 201) {
      refresh()
      setOpenModal(false)
    }
  };

  const updatePokemon = async (values: AddPokemon) => {
    const { status } = await axios.put(`https://localhost:7026/api/pokemon/${pokemonId}?_id=${pokemonId}`, {
      name: values.name,
      description: values.description,
      type: values.type.length > 0 ? values.type : ['NORMAL']
    });

    if (status == 204) {
      refresh()
      setOpenModal(false)
    }
  };

  const handleSubmitPokemon: SubmitHandler<AddPokemon> = async (values) => {
    try {
      if (updateMode) {
        await updatePokemon(values);
        return;
      } else {
       await addPokemon(values);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonById = async () => {
    try {
      const { data } = await axios.get(`https://localhost:7026/api/pokemon/${pokemonId}`);
        setPokemonValue(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(updateMode)
      getPokemonById()
  }, [])

  return(<>
    <Modal
    open={openModal}
    onClose={() => setOpenModal(false)}
    >
    <>
      <Box sx={{ ...style, width: 400 }}>
      <Box display='flex' width='100%' justifyContent='center' padding='1rem 0 2rem 0'><Typography variant='h4'> {pokemonId ? 'Adicionar' : 'Editar'} Pokémon</Typography></Box>
      <form onSubmit={handleSubmit(handleSubmitPokemon)}>
          <Box display='flex' flexDirection='column' gap='1rem'>
            <Box display='flex' gap='3.5rem' alignItems='center'>
              <Typography variant="body2">Nome: </Typography>
              <Input placeholder="Nome" {...register("name")} />
            </Box>
            <Box width='100%' display='flex' justifyContent='center'>
                <Typography color='red' fontSize='0.7rem'>{errors.name?.message}</Typography>
            </Box>
            <Box display='flex' gap='2rem' alignItems='center'>
              <Typography variant="body2">Descrição: </Typography>
              <Input placeholder="Descrição" {...register("description")} />
            </Box>
            <Box width='100%' display='flex' justifyContent='center'>
                <Typography color='red' fontSize='0.7rem'>{errors.description?.message}</Typography>
            </Box>
            <Box width='100%' display='flex' gap='4.2rem' alignItems='center'>
              <Typography variant="body2">Tipo: </Typography>
              <Controller
              name="type"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Autocomplete
                  sx={{ width: '50%' }}
                  multiple
                  id="tags-outlined"
                  options={objKeyPokemonType}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  {...field}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo"
                      placeholder="Tipo"
                    />
                  )}
                />)}
                />             
            </Box>
            <Box width='100%' display='flex' justifyContent='center'>
                <Typography color='red' fontSize='0.7rem'>{errors.type?.message}</Typography>
            </Box>
            <Box width='100%' display='flex' gap='3.5rem' justifyContent='center'>
              <Button type="submit" variant='contained'>Enviar</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  </Modal>
  </>
  )
}