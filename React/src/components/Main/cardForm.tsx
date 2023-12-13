import { useState } from 'react';
import { CardData } from '../Card/card';
import cardCss from '../Card/card.module.css';
type TypeCardForm = {
  createData: (data: CardData) => void;
};

const defaultData = {
  name: '',
  species: '',
  sex: '',
  occupation: '',
  origin: '',
  pfp: '',
  birth_year: '',
  status: '',
  desc: '',
  createdAt: ''
};

const CardForm = ({ createData }: TypeCardForm) => {
  const [formData, setFormData] = useState<CardData>({...defaultData});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    createData(updatedFormData);

    setFormData({...defaultData});
  };

  // yeah idk
  return (
    <div className={cardCss.input_box}>
      <form id={cardCss.input_form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={cardCss.input_text}>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/><br/>

        <label htmlFor="species" className={cardCss.input_text}>Species:</label>
        <input type="text" name="species" value={formData.species} onChange={handleInputChange} required/><br/>

        <label htmlFor="sex" className={cardCss.input_text}>Sex:</label>
        <input type="text" name="sex" value={formData.sex} onChange={handleInputChange} required/><br/>

        <label htmlFor="origin" className={cardCss.input_text}>Origin:</label>
        <input type="text" name="origin" value={formData.origin} onChange={handleInputChange} required/><br/>

        <label htmlFor="occupation" className={cardCss.input_text}>Occupation:</label>
        <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} required/><br/>

        <label htmlFor="pfp" className={cardCss.input_text}>Pfp:</label>
        <input type="text" value={formData.pfp} onChange={handleInputChange} name="pfp"/><br/>

        <label htmlFor="birth_year" className={cardCss.input_text}>Birth Year:</label>
        <input type="number" name="birth_year" value={formData.birth_year} onChange={handleInputChange} required/><br/>

        <label htmlFor="status" className={cardCss.input_text}>Status:</label>
        <input type="text" name="status" value={formData.status} onChange={handleInputChange} /><br/>

        <button className={cardCss.submit_button} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CardForm;
