

const ItemCard =({card,onCardClick})=>{
    const {name,imageUrl} = card
    const onClick = () => {
        onCardClick(card);
      };
       return(
           <div className="item-container" style={{backgroundImage:`url(${imageUrl})`}} onClick={onClick}>
               <h2 className='item-name'>{name}</h2>
           </div>
       )
   }
   
   export default ItemCard