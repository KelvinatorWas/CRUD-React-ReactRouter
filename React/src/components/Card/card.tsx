import { DeleteForever } from '@mui/icons-material';
import cardCss from './card.module.css';
import CardPfp from './cardPfp';

export type CardData = {
  id?: number;
  name: string;
  species: string;
  sex: string;
  occupation: string;
  origin: string;
  pfp: string;
  birth_year: string;
  status: string;
  desc: string;
  createdAt:string;
}

type MiniCardData = {
  id: number;
  pfp: string
  name: string;
  deleteCard: (id:number) => void;
  onClick: (id:number) => void;
};

export const MiniCard = ({id, pfp, name, deleteCard, onClick}:MiniCardData) => {
  return (
    <div className={cardCss.card_box}> 
      <div className={cardCss.mini_card}>
        <div className={cardCss.card__data_wrapper} onClick={() => onClick(id)}>
          <CardPfp dataPfp={pfp} classType={cardCss.data_wrapper__pfp}/>
          <div className={cardCss.mini_card__name}>{name}</div>
        </div>
        <div className={cardCss.card__ud}>
          <DeleteForever className={cardCss.delete_card} aria-hidden='true' onClick={() => deleteCard(id)}></DeleteForever>
        </div>
      </div>
    </div>        
  );
}

const MaxCard = () => {
    
}