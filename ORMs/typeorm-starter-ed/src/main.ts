import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4565, () => {
      console.log(`Server's base URL::::-> ${process.env.EDU_LIVE_VM_URL}`)
  });
}
bootstrap();
