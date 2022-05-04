import express, { Express, Request, Response } from 'express';

const app: Express = express();
const serverPort = process.env.SERVER_PORT;
app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(serverPort, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${serverPort}`,
  );
});
