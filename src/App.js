import logo from './logo.svg';
import './App.css';
import { SearchBox } from './components/searchBox';
import { ListBox } from './components/searchBox/listbox';


function App() {

  const transformData = (data) => data.results
  const dataPromise = async (query, signal) => await fetch(`https://swapi.dev/api/people/?search=${query}`, {signal})
  

  return (
    <div className="wrapper">
     <SearchBox 
      id="personName" 
      label="Enter Person Name" 
      name="personName" 
      placeholder="Enter your fav star war char"
      autocomplete={true}
      maxItems={5}
      styles={{
        label: "",
        input: ""
      }}
      debounceWait={400}
      listBox={(items) => <ListBox items={items}/>}
      noItemMessage={()=> <div>Sorry No person found</div>}
      errorMessage={()=> <div>Something went wrong</div>}
      transformData={transformData}
      promise = {dataPromise}
    />
    </div>
  );
}

export default App;
