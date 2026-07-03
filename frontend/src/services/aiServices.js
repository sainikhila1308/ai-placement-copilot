import axios from "axios";

const API = "http://localhost:5000/api/ai";

const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const getSessions = async () => {
  const res = await axios.get(API, config());
  return res.data;
};

export const getSession = async (id) => {
  const res = await axios.get(`${API}/${id}`, config());
  return res.data;
};

export const createSession = async (data) => {
  const res = await axios.post(API, data, config());
  return res.data;
};

export const deleteSession = async (id) => {
  const res = await axios.delete(`${API}/${id}`, config());
  return res.data;
};

export const analyzeJD = async (id) => {
  const res = await axios.post(
    `${API}/jd-analyze/${id}`,
    {},
    config()
  );

  return res.data;
};
export const analyzeResume = async (id, file) => {

    const formData = new FormData();

    formData.append("resume", file);

    const token = localStorage.getItem("token");

    const res = await axios.post(

        `${API}/resume-analyze/${id}`,

        formData,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data;

};
export const getInterviewPrep = async(id)=>{

    const res = await axios.get(

        `${API}/interview/${id}`,

        config()

    );

    return res.data;

};
export const getCareerFeedback = async (id) => {

    const res = await axios.get(

        `${API}/career/${id}`,

        config()

    );

    return res.data;

};