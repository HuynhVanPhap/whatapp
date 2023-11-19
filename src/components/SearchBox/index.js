import { useState } from 'react';
import { SearchIcon } from '@/icons';
import './styles.scss';

function SearchBox({ placeholder = 'Search...', handleFilter }) {
    const [userName, setUserName] = useState('');

    const handleOnChange = (e) => {
        setUserName(e.target.value);
    }

    const handleOnKeyUp = () => {
        handleFilter(userName);
    }

    return (
        <div className='searchBox'>
            <div className='searchBox-inner'>
                <div className='searchText-wrap'>
                    <input
                        className='searchText'
                        type='text'
                        name='textSearch'
                        placeholder={placeholder}
                        value={userName}
                        onChange={handleOnChange}
                        onKeyUp={handleOnKeyUp}
                    />
                    <span className='searchIcon-wrap'>
                        <SearchIcon />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SearchBox;