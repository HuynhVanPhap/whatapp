import { SearchIcon } from '@/icons';
import './styles.scss';

function SearchBox({ placeholder = 'Search...' }) {
    return (
        <div className='searchBox'>
            <div className='searchBox-inner'>
                <div className='searchText-wrap'>
                    <input
                        className='searchText'
                        type='text'
                        name='textSearch'
                        placeholder={placeholder}
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