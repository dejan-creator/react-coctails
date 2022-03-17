function Cocktails({ cocktails }) {
    const { strDrink } = cocktails;
    return(
        <div>
            <h2 style={{backgroundColor: "lightblue",
        color: "blue"}}>
                Cocktail: {strDrink}
            </h2>
        </div>
    )
}

export default Cocktails; 