import axios from 'axios'

export const fetchData = async(page: number) => {
    const fields = [
    'id',
    'title',
    'place_of_origin',
    'artist_display',
    'inscriptions',
    'date_start',
    'date_end'
    ].join(',');

    const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${page}&fields=${fields}`);
    // console.log(response.data.data)
    return response.data
}