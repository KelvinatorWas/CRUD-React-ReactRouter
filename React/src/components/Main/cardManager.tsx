import { InvalidateQueryFilters, QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import { createData, deleteData, readData } from "../../utils/crud";
import { CardData, MiniCard } from "../Card/card";
import CardForm from "./cardForm";
import cardCss from '../Card/card.module.css';
import { useNavigate } from "react-router-dom";

export const SERVER_LINK = "http://localhost:3000/IID";

const fetchCardsData = () => {
  return readData<CardData>(SERVER_LINK);
};

const queryClient = new QueryClient();


const CardManager = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Cards />
      </QueryClientProvider>
    </>
  )
}

const createNewCardData = async (data:CardData) => {
  await createData(SERVER_LINK, data);
  queryClient.invalidateQueries('cards' as InvalidateQueryFilters);
};

const deleteCard = async (id:number) => {
    await deleteData(SERVER_LINK, id)
    queryClient.invalidateQueries('cards' as InvalidateQueryFilters);
};

const Cards = () => {

  const queryClient = useQueryClient(); 
  const navigate = useNavigate();

  const {isLoading, isError, data, error, refetch} = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsData
  })

  const handleClickOnId = (cardId:number) => {
    navigate(`${cardId}`)
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <> 
    <div className={cardCss.card_container}>

      {data?.map((card) => (
        <MiniCard
        key={card.id}
        id={card.id || -1}
        pfp={card.pfp}
        name={card.name}
        deleteCard={deleteCard}
        onClick= {handleClickOnId}
        />
        ))}
      </div>

      <CardForm
        createData={createNewCardData}
      />
    </>
  );
}

export default CardManager