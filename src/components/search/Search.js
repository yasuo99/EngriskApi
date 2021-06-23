import { useState } from "react";

const Search = ({ queryFunction }) => {
    const [query, setQuery] = useState('')
    function search() {
        queryFunction(query)
    }
    function enterSearch(e){
        if(e.key == 'Enter'){
            search()
        }
    }
    return (
        <div className='form-group'>
            <div className='d-flex'>
                <input onKeyDown={(e) => enterSearch(e)} className='form-control border bg-light' placeholder='Tìm kiếm' onChange={(e) => queryFunction(e.target.value)} />
               
            </div>
        </div>
    )
}
export default Search;