import axios from 'axios';
import { useContext, useState } from 'react';
import { COLLEGE_SCORECARD_API_KEY, COLLEGE_SCORECARD_API_URL } from '../common';
import CollegeDataContext from '../context/CollegeDataContext';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const { collegeData, setCollegeData } = useContext(CollegeDataContext)

    const processRawCollegeData = (data) => {
        const result = []
        for (let entry of data ) {
            let processedEntry = {
                name: entry['school.name'],
                lat: entry['location.lat'],
                lng: entry['location.lon']
            };

            result.push(processedEntry);
        }
        return result;
    }

    const handleSearch = async () => {
        const params = {
            api_key: COLLEGE_SCORECARD_API_KEY,
            fields: 'school.name,location',
            'school.name': `${encodeURI(searchQuery)}`
        }
        axios.get( COLLEGE_SCORECARD_API_URL, { params })
            .then((resp) => {
                const processedData = processRawCollegeData(resp.data.results);
                setCollegeData(processedData);
            })
    }

    const handleUpdateSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div>
            <input
                className = "search-input"
                placeholder = "Search for Colleges"
                onChange = {handleUpdateSearchQuery}
            />
            <button
                className = "search-button"
                onClick = {handleSearch}
                disabled = {!searchQuery}
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar;