import axios from "axios";

export default axios.create({
    baseURL: "https://search.wb.ru",
    headers: {
        "Content-type": "application/json"
    }
});