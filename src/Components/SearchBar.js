// object destructuring, components take as a argument props, to skip one step (const { setSearchValue } = props;) we take the props from props with {} in the argument
function SearchBar({ setSearchValue, fetchData }) {
  return (
    <div>
      <input 
      type="search" 
      id="searchBar" 
      onChange={(e) => { console.log(e) 
      setSearchValue(e.target.value)}} />

      <button onClick={fetchData}>Search</button>
    </div>
  )
}

export default SearchBar;