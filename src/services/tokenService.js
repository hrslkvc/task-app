const saveToken = token => {
    localStorage.setItem('task_app_token', token);
};

const retrieveToken = () => {
    return localStorage.getItem('task_app_token');
};

export { saveToken, retrieveToken };
