import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { green, yellow } from 'https://deno.land/std@0.53.0/fmt/colors.ts';
import todoRouter from './routes/todo.ts';
import notFound from './middlewares/notFound.ts';
import logger from './middlewares/logger.ts';

console.log('hshshs')

const app = new Application();
const port: number = 8080;

// app.use((ctx) => {
//   ctx.response.body = 'Hello World';
// })

// const router = new Router();
// router.get("/", ({response}: {response: any}) => {
//   response.body = {
//     message: 'hello world'
//   }
// })
// app.use(router.routes());
// app.use(router.allowedMethods());

todoRouter.get("/", ({response}: {response: any}) => {
  response.body = {
    message: 'hello world'
  }
})

app.use(logger.logger);
app.use(logger.responseTime);
app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());
app.use(notFound);

// console.log('running on port ', port);
// await app.listen({port});
app.addEventListener('listen', ({secure, hostname, port}) => {
  const protocol = secure ? 'https://' : 'http://';
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow('Listening on:')} ${green(url)}`);
});
await app.listen({port});