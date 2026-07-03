import axios from "axios";

const API =
"http://localhost:5000/api/dashboard";

const config = () => ({

    headers:{

        Authorization:
        `Bearer ${localStorage.getItem("token")}`

    }

});

export const getStats = async()=>{

    const res =
    await axios.get(

        `${API}/stats`,

        config()

    );

    return res.data;

};