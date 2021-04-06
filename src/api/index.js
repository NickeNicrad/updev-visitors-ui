import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});
API.interceptors.request.use((req) =>
{
    if (localStorage.getItem('profile'))
    {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

// creating a new system user
export const signup = (newUser) => API.post('/auth/signup', newUser)
    .then((res) =>
    {
        localStorage.setItem('profile', JSON.stringify({...res.data}));
    })
    .catch((err) =>
    {
        console.log(err.message)
    });

export const login = (existUser) => API.post('/auth/login', existUser).then((res) =>
    {
        localStorage.setItem('profile', JSON.stringify({...res.data}));
    })
    .catch((err) =>
    {
        console.log(err.message)
    });

// getMyProfile
export const getMyProfile = (id) => API.get(`/${id}`);

// get all visitors from the database
export const getAllVisitors = () => API.get('/visitors');

// get a selected visitor from the database
export const getVisitor = (id) => API.get(`/visitors/${id}`);

// creating a new visitor
export const createVisitor = (newVisitor) => API.post('/visitors', newVisitor);

// update an existing visitor in the database
export const updateVisitor = (id, upVisitor) => API.patch(`/visitors/${id}`, upVisitor);

// delete an existing visitor in the database
export const deleteVisitor = (id) => API.delete(`/visitors/${id}`);

// visit API

// create new visit
export const createVisit = (newVisit) => API.create(`/visits`, newVisit);

// set visit end time
export const updateVisit = (id, a_time, d_time, duration) => API.patch(`/visits/${id}`, a_time, d_time, duration);

// get all visits from the server
export const getAllVisits = () => API.get('/visits');