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
export const signup = (newUser) => API.post('/auth/signup', newUser);

export const login = (existUser) => API.post('/auth/login', existUser);

// get current user's credentials
export const getMyProfile = (id) => API.get(`/user/${id}`);

// update user password
export const updateUserPassword = (id, userPassword) => API.patch(`/user/${id}`, userPassword);

// update user profile
export const updateUser = (id, user) => API.patch(`/user/${id}`, user);

// visitor API
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
export const createVisit = (newVisit) => API.post(`/visits`, newVisit);

// set visit end time
export const updateVisit = (id, timeHolder) => API.patch(`/visits/${id}`, timeHolder);

// get all visits from the server
export const getAllVisits = () => API.get('/visits');