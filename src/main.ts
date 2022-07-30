import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';


async  function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule) 

  const config = new DocumentBuilder()
    .setTitle('setTitle')
    .setDescription('setDescription')
    .setVersion('setVersion')
    .addTag('addTag')
    .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => {
    console.log('server staring ', +PORT);
  })
}


start()