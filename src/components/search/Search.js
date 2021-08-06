import { useState } from "react";

const Search = ({ queryFunction, placeholder }) => {
    const [query, setQuery] = useState('')
    function search() {
        queryFunction(query)
    }
    function enterSearch(e) {
        if (e.key == 'Enter') {
            search()
        }
    }
    return (
        <div className='form-group'>
            <div className='d-flex'>
                {/* <input onKeyDown={(e) => enterSearch(e)} className='form-control' style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}} placeholder='Tìm kiếm' onChange={(e) => {if(e.target.value != ''){setQuery(e.target.value)} else queryFunction(e.target.value)}} />
                <button className='btn btn-primary rounded' onClick={() => search()}><i className='fa fa-search'></i></button> */}
                <div class="input-group">
                    <input style={{width: '50vw'}} type="search" onKeyDown={(e) => enterSearch(e)} placeholder={placeholder || 'Nội dung tìm kiếm...?'} aria-describedby="button-addon1" class="form-control border-0 bg-light" onChange={(e) => {if(e.target.value != ''){setQuery(e.target.value)} else queryFunction(e.target.value)}}/>
                    <div class="input-group-append">
                        <button id="button-addon1" type="submit" class="btn btn-link text-primary" onClick={() => search()}><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Search;