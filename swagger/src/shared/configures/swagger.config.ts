import { registerAs } from '@nestjs/config';
import { ISwaggerConfigInterface } from '../interfaces/swagger-config.interface';

export default registerAs(
  'swaggerConfig',
  (): ISwaggerConfigInterface => ({
    path: process.env.SWAGGER_PATH,
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
    scheme: process.env.SWAGGER_SCHEME,
  }),
);
