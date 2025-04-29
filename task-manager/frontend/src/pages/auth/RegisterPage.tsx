// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { authService } from "../../services/authService"; // Імпортуємо сервіс для реєстрації

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); // Стан для помилок
  const [loading, setLoading] = useState(false); // Стан для завантаження

  // Обробник зміни значень у формі
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Обробник відправки форми
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Активуємо завантаження
    setError(""); // Очищаємо попередні помилки

    try {
      // Викликаємо сервіс для реєстрації користувача
      const data = await authService.registerUser(form.name, form.email, form.password);
      
      // Зберігаємо токен у localStorage
      localStorage.setItem("authToken", data.token);

      // Показуємо повідомлення про успішну реєстрацію
      alert("Реєстрація успішна! Перейдіть на сторінку входу.");
      
      // Можна додати редирект на сторінку логіну або дашборду
      // history.push("/login"); // Якщо є доступ до useHistory
    } catch (error: any) {
      setError(error.message); // Виводимо помилку, якщо реєстрація не вдалася
    } finally {
      setLoading(false); // Вимикаємо завантаження
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-6 max-w-md w-full bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Реєстрація</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Виведення помилки */}

        <input
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          name="name"
          placeholder="Ім'я"
          value={form.name}
          onChange={handleChange}
          required
        />

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
          disabled={loading} // Блокуємо кнопку під час завантаження
        >
          {loading ? "Зареєструватися..." : "Зареєструватися"}
        </button>

        {/* Посилання на сторінку входу */}
        <div className="text-center mt-4">
          <a href="/login" className="text-sm text-blue-500 hover:text-blue-600">
            Уже є акаунт? Увійти!
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
