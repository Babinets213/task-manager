// src/components/LoginForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
  // Для навігації
import { authService } from "../../services/authService";  // Імпортуємо сервіс для логіну

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");  // Стан для збереження помилки
  const [loading, setLoading] = useState(false);  // Стан для завантаження
  const history =  useNavigate();  // Для переходу після успішного логіну

  // Обробник зміни значень у формі
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Обробник відправки форми
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");  // Очищаємо попередні помилки

    try {
      // Викликаємо API для логіну
      const data = await authService.loginUser(form.email, form.password);
      
      // Збереження токену в localStorage або sessionStorage
      localStorage.setItem("authToken", data.token);
      
      // Переходимо на сторінку дашборду
      history("/dashboard");
    } catch (error: any) {
      setError(error.message);  // Виводимо помилку, якщо щось пішло не так
    } finally {
      setLoading(false);  // Вимикаємо завантаження
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-6 max-w-md w-full bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Вхід</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}  {/* Виведення помилки */}

        <input
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
          type="submit"
          disabled={loading}  // Блокуємо кнопку під час завантаження
        >
          {loading ? "Завантаження..." : "Увійти"}
        </button>

        <div className="text-center mt-4">
          <a href="/register" className="text-sm text-blue-500 hover:text-blue-600">
            Немає акаунту? Зареєструйтесь!
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
