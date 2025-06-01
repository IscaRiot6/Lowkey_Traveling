interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface LoginData {
  username: string;
  password: string;
}

const userApi = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const registerUser = async ({ username, email, password, confirmPassword }: RegisterData) => {
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    return await response.json();
  };

  const loginUser = async ({ username, password }: LoginData) => {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    return await response.json();
  };

  return { registerUser, loginUser };
};

export default userApi;
