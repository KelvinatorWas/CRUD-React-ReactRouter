import { useParams } from "react-router-dom";
import cardCss from './cardData.module.css';
import CardPfp from "../../components/Card/cardPfp";
import { SERVER_LINK } from "../../components/Main/cardManager";
import { readDataOne } from "../../utils/crud";
import { CardData } from "../../components/Card/card";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const TextBox = (type:string, text = '')=> {
    return(
      <div className={cardCss.text_box}>
        <p className={cardCss.text_box__type}>{type}</p>
        <p className={cardCss.text_box__text}>{text}</p>
      </div>
    );
  };

const MainDataRect = ({idData}:{idData:CardData}) => (
    <div className={cardCss.data_wrapper__main_rect}>
      {TextBox('Name:', idData.name)}
      {TextBox('Species:', idData.species)}
      {TextBox('Sex:', idData.sex)}
      {TextBox('Origin:', idData.origin)}
    </div>
  );
  
const BottomDataRect = ({idData}:{idData:CardData}) => (
    <div className={cardCss.card__data_rect}>
      {TextBox('Occupation:', idData.occupation)}
      {TextBox('Birth Year:', `${idData.birth_year} ${idData.origin}'s Years`)}
      {TextBox('Status:', idData.status)}
    </div>
);

const CardMoreInfo = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Card />
        </QueryClientProvider>
      </>
    )
  }

const Card = () => {
    const { id } = useParams()

    const queryClient = useQueryClient(); 


    const cardById = () => {
        return readDataOne<CardData>(`${SERVER_LINK}/${id}`);
    };

    const {isLoading, isError, data, error, refetch} = useQuery({
        queryKey: ['card'],
        queryFn: cardById
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    if (!data) return;

    return (
        <div className={cardCss.card_box}> 
            <div className={cardCss.card}>
                <div className={cardCss.card__data_wrapper}>
                    <CardPfp dataPfp={data.pfp} classType={cardCss.data_wrapper__pfp}/>
                    <MainDataRect idData={data}/>
                </div>

                <BottomDataRect idData={data}/>

            </div>
        </div>
    );
};

export default CardMoreInfo;