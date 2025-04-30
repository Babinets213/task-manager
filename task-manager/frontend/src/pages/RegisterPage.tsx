import React, { useState } from "react";
import { authService } from "../services/authService"; 
import { Link } from "react-router-dom"; 
import Button from "../components/ui/Button";  
import Input from "../components/ui/Input";  
import Loader from "../components/ui/Loader";  

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setError(""); 

    try {

      const data = await authService.registerUser(form.name, form.email, form.password);
      
  
      localStorage.setItem("authToken", data.token);


      alert("Реєстрація успішна! Перейдіть на сторінку входу.");
      

    } catch (error: any) {
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-6 max-w-md w-full bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Реєстрація</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>} 

        <Input
          type="text"
          name="name"
          placeholder="Ім'я"
          value={form.name}
          onChange={handleChange}
          required
          className="focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
          className="focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <Button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
          disabled={loading}
        >
          {loading ? <Loader /> : "Зареєструватися"}
        </Button>
        
        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-blue-500 hover:text-blue-600">
            Уже є акаунт? Увійти!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
