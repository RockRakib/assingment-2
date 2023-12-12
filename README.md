# Assingment-2

## API Reference

### Get all items

```
  GET /api/user

```

| Parameter | Type | Description |
| --- | --- | --- |
| api_key | string | Required. Your API key |

### Get single item

```
  GET /api/user/${userId}

```

## 🔗 Clone This Repository

[REPOSITORY](https://github.com/RockRakib/assignment_2)

## Installation

Install my-project with npm

```bash
    cd my-project
    npm install

```

## Environment Variables

To run this project, Create a .env file in the root of your project and add the necessary environment variables. You can use the provided

`PORT=5000`

`MONGO_URI=mongodb://localhost:27017/your-database`

# Add other environment variables as needed

## Deployment

To deploy this project run

```bash
  npm run dev

```

The application will be accessible at [http://localhost:5000](http://localhost:5000/).

## Production

To build and start the application in production mode

```bash
 npm run build
 npm start

```
