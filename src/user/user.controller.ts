import { Controller } from '@nestjs/common'
import {
	Body,
	Get,
	HttpCode,
	Put,
	Patch,
	Param,
	UsePipes
} from '@nestjs/common/decorators'
import { ValidationPipe } from '@nestjs/common/pipes'

import { CurrentUser } from './../auth/decorators/user.decorator'
import { Auth } from './../auth/decorators/auth.decorator'
import { UserService } from './user.service'
import { UserDto } from './user.dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('profile')
	async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Patch('profile/favorites/:productId')
	async toggleFavorite(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string
	) {
		return this.userService.toggleFavorite(id, +productId)
	}
}
