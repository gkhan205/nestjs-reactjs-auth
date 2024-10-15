module.exports = {
  apps: [
    {
      name: "Client",
      script: "cd frontend && npm run dev",
    },
    {
      name: "Server",
      script: "cd backend && npm run start:dev",
    },
  ],
};
