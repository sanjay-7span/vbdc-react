export const Path = {
    PATH: "https://malaria-api.preview.im/api/admin/v1",
};

export const setUserSession = (token, user) => {
  localStorage.setItem('amc-token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export const setauthenticated = (user) => { 
    return user || false;
}

export const getUser = () => { 
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}
export const removeUserSession = () => { 
    localStorage.removeItem('amc-token');
    localStorage.removeItem('user');
}

export const getToken = () => { 
    return localStorage.getItem('amc-token');
}

