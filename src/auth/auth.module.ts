import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { getJwtConfig } from 'src/config/jwt.config'
import { AuthController } from './auth.controller'
import { PrismaService } from 'src/prisma.service'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './auth.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	]
})
export class AuthModule {}
