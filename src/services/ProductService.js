import { encodeQueryData } from "../utils/queryString";
import axios from "./axios"

const SEARCH_PATH = "/exactmatch/ru/common/v4/search?dest=-1029256,-102269,-2162196,-1257786&regions=80,64,83,4,38,33,70,68,69,86,75,30,40,48,1,66,31,22,71&resultset=catalog&spp=0&suppressSpellcheck=false&sort=popular&";
const FILTERS_PATH = "/exactmatch/ru/common/v4/search?dest=-1029256,-102269,-2162196,-1257786&regions=80,64,83,4,38,33,70,68,69,86,75,30,40,48,1,66,31,22,71&resultset=filters&spp=0&suppressSpellcheck=false&sort=popular&";
/**
 * Search products - brand 18565
 * @param {{query: string, fbrand: number, curr: string, lang: string}} query 
 * @returns 
 */
export const serachProducts = async (query) => {
    const queryString = encodeQueryData(query);
    const data = await axios.get(SEARCH_PATH + queryString);
    return data.data
}

/**
 * Search filters
 * @param {{keyword: string, brand: number, curr: string, lang: string}} query 
 * @returns 
 */
export const searchFilters = async (query) => {
    const queryString = encodeQueryData(query);
    const data = await axios.get(FILTERS_PATH + queryString);
    return data.data
}