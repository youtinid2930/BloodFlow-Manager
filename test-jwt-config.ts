import jwtConfig from './src/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

async function testJwtConfig() {
  // Simulate initializing the ConfigModule
  ConfigModule.forRoot({
    isGlobal: true,
    load: [jwtConfig], // Load the jwt.config.ts
  });

  // Access the configuration
  const config = jwtConfig();
  console.log('JWT Secret:', config.secret);
  console.log('JWT Expiration:', config.signOptions?.expiresIn);

  // Ensure values are not undefined
  if (!config.secret) {
    console.error('JWT Secret is missing!');
  }
  if (!config.signOptions?.expiresIn) {
    console.error('JWT Expiration is missing!');
  }
}

testJwtConfig().catch((err) => console.error(err));
