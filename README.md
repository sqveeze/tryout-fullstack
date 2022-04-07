#### tryout-fullstack

Start by cd into frontend and backend folder and execute:

```yarn```

For backend you need to set the following env vars in .env in the backend root.

```
# System
NODE_ENV=development or test
HOST=0.0.0.0
PORT=3000

# Exchange
EXCHANGE_API_BASE_URL=https://api.exchangerate.host

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
# Empty needed because pg in localhost has no password.
DATABASE_PASSWORD=
DATABASE_NAME=yourdbname
```

For frontend you need this:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api or whatever is your localhost + port, but the /api is required at the end.
```

