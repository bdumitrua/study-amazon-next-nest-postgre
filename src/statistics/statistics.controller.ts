import { Controller, Get } from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from './../auth/decorators/auth.decorator'
import { StatisticsService } from './statistics.service'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Get('main')
	@Auth()
	async getMainStatistics(@CurrentUser('id') id: number) {
		return this.statisticsService.getMain(id)
	}
}
