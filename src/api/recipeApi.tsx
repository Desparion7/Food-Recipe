import axios from 'axios';
import type { FormValues } from '../interface/form-interface';

const recipeApi = axios.create({
  baseURL: 'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes',
});

const postRecipe = async (body: FormValues) => {
  const response = await recipeApi.post('/', body);
  return response.data;
};

export default postRecipe;
