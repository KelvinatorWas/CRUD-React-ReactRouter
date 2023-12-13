import axios from 'axios';

// Create Read Update Delete 

export const createData = async<T>(serverLink:string, data:T) =>{
  try {
    await axios.post(serverLink, data);
  } catch (error) {
    throw new Error(`Error at createData: ${error}`);
  }
};

export const readData = async<T>(serverLink:string): Promise<T[]> => {
  try {
    const result = await axios.get<T[]>(serverLink);
    return result.data;
  } catch (error) {
    console.error(`Error fetchData: ${error}`);
    return [];
  }
};

export const readDataOne = async<T>(serverLink:string): Promise<T | undefined> => {
  try {
    const result = await axios.get<T>(serverLink);
    return result.data;
  } catch (error) {
    console.error(`Error fetchData: ${error}`);
    return undefined;
  }
};

export const updateData = async <T>(serverLink:string, id:number, data: T) => {
  try {
    await axios.put(`${serverLink}/${id}`, data);
  } catch (error) {
    throw new Error(`Error updateData: ${error}`);
  }
};

export const deleteData = async (serverLink:string, id:number) => {
  try {
    await axios.delete(`${serverLink}/${id}`);
  } catch (error) {
    throw new Error(`Error deleteData: ${error}`);
  }
};