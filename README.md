# 🍕 Pizza Hut Menu Web App

A modern, responsive food menu web app for Pizza Hut built with **Next.js 14 App Router**, **Tailwind CSS**, **Redux Toolkit**, **Supabase**, and **Swiper.js**. Users can browse, search, favorite, and add items to a cart with smooth UI interactions and real-time database integration.

🔗 **Live Website**: [https://pizzahut-kappa.vercel.app/](https://pizzahut-kappa.vercel.app/)

---

![Home](https://raw.githubusercontent.com/Abuhamida/pizzahut/main/puplic/home.jpg)

![About](https://raw.githubusercontent.com/Abuhamida/pizzahut/main/puplic/about.jpg)

![menu](https://raw.githubusercontent.com/Abuhamida/pizzahut/main/puplic/menu.jpg)

![contact](https://raw.githubusercontent.com/Abuhamida/pizzahut/main/puplic/contact.jpg)

![cart](https://raw.githubusercontent.com/Abuhamida/pizzahut/main/puplic/cart.jpg)

![Home](https://raw.githubusercontent.com/Abuhamida/pizzahut/main/puplic/checkout.jpg)

![Home](https://raw.githubusercontent.com/Abuhamida/pizzahut/main/puplic/profile.jpg)

![Home](https://raw.githubusercontent.com/Abuhamida/pizzahut/main/puplic/mobile%20view.png)

---

## 🚀 Features

* 🍽️ Fully categorized food menu (Pizza, Pasta, Drinks, Deals, etc.)
* ⭐ Favorite items (stored per user in Supabase)
* 🛒 Add to Cart with quantity controls
* 🔍 Modal-based Search with real-time filtering
* 👤 Supabase Auth (Login / Signup)
* 📊 Global state management using Redux Toolkit
* 🌟 Beautiful transitions using Swiper.js for best sellers
* 📲 Fully responsive for all devices
* ⛓ Error and Not Found pages

---

## 🛠️ Tech Stack

* **Frontend**: [Next.js 15.3 (App Router)](https://nextjs.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Database & Auth**: [Supabase](https://supabase.com/)
* **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
* **Slider**: [Swiper.js](https://swiperjs.com/)
* **Hosting**: [Vercel](https://vercel.com/)

---

## 🏢 Folder Structure

```
src/
├── app/
│   ├── about/           # About page
│   ├── api/             # API route handlers
│   ├── auth/            # Authentication logic (login/signup)
│   ├── cart/            # Cart page and logic
│   ├── checkout/        # Checkout component (for future use)
│   ├── contact/         # Contact page
│   ├── error/           # Error handling UI
│   ├── location/        # Branch locator (static page)
│   ├── menu/            # Main menu with Swiper & filters
│   ├── orders/          # Order history
│   ├── private/         # Protected routes logic
│   ├── profile/         # User profile page
│   ├── store/           # Redux store setup
│   ├── layout.tsx       # App layout wrapper
│   ├── not-found.tsx    # 404 page
│   └── page.tsx          # Root landing page
├── assets/                  # Static assets (images/icons)
├── components/              # Reusable components (Navbar, Cards, etc.)
├── lib/                      # Utility functions and Supabase client
├── types/                    # TypeScript interfaces and types
├── middleware.ts             # Middleware for auth protection
├── globals.css               # Tailwind global styles
```

---

## 📅 Getting Started

```bash
# Clone the repository
$ git clone https://github.com/your-username/pizzahut-menu-app.git
$ cd pizzahut-menu-app

# Install dependencies
$ npm install

# Add environment variables
$ cp .env.example .env.local
# Fill in Supabase keys and URLs

# Run the app
$ npm run dev
```

---

## 🔐 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
NEXTAUTH_SECRET= any secret ket 
NEXTAUTH_URL= your url (http://localhost:3000)
```

---

## 📚 Future Enhancements

* 💳 Payment Integration with Stripe
* ✉️ Email confirmations after order
* 📖 Multi-language support
* ♻️ Dark mode toggle
* 📊 Admin dashboard to manage menu items

---

## 👨‍💼 Author

**Mohamed Ramdan AbuHamida**
📄 [Portfolio](https://mohamed-abuhamida.vercel.app/)
💻 [GitHub](https://github.com/Abuhamida)
💼 [LinkedIn](https://www.linkedin.com/in/mohammed-abuhamida)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
