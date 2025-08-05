This project follows this Folder Structure.

```plaintext
my-next-app/
│
├── public/                     # Static files (images, icons, robots.txt, etc.)
│
├── src/
│   ├── app/                    # (Next.js App Router)
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── route.js
│   │   └── (feature-modules)/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── feature-specific/
│   │
│   ├── hooks/
│   │   ├── common/
│   │   ├── pageSpecific/
│   │   └── useAuth.js
│   │
│   ├── lib/
│   │   ├── axiosClient.js
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── store/
│   │   ├── index.js
│   │   └── slices/
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── ...
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── config/
│   │   └── env.js
│   │
│   ├── middleware.js
│   └── utils/
│       └── formatDate.js
│
├── .env.local
├── next.config.mjs
├── package.json
└── jsconfig.json
```
