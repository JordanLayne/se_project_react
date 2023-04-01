

const ItemCard =({defaultClothingItems,onSelectCard})=>{
    const {name,link} = defaultClothingItems
       return(
           <div className="item-container" style={{backgroundImage:`url(${link})`}} onClick={onSelectCard}>
               <h2 className='item-name'>{name}</h2>
           </div>
       )
   }
   
   export default ItemCard