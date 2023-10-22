import * as yup from "yup";

export type AddPokemon = {
  name: string;
  description: string;
  type: string[]
};

export const AddPokemonFormValidationsSchema = yup.object({
  name: yup.string().required("Este campo é obrigatório"),
  description: yup.string().required("Este campo é obrigatório"),
  type: yup.array().of(yup.string())
});
