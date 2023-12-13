const CardPfp = ({ dataPfp, classType }: { dataPfp: string; classType: string }) => {
  const regex = /\.\w\w\w/g;
  const webreg = /^(http(s):\/\/.)/;
  const img = webreg.test(dataPfp)
  ? { backgroundImage: `url(${dataPfp})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat' }
  : { backgroundImage: `url(/images/${dataPfp.length && regex.test(dataPfp) ? dataPfp : 'default.png'})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat' };

  return <div className={classType} style={img}></div>;
};
export default CardPfp;