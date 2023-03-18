import { Injectable } from '@nestjs/common'
import { PrismaService } from './../prisma.service'
import { UserService } from './../user/user.service'

@Injectable()
export class StatisticsService {
	constructor(private prisma: PrismaService, private UserService: UserService) {}

	async getMain(userId: number) {
		const user = await this.UserService.byId(userId, {
			orders: {
				select: {
					items: true
				}
			},
			reviews: true
		})

		// TO DO
		// get total price of each order

		return [
			{
				name: 'Orders',
				value: user.orders.length
			},
			{
				name: 'Reviews',
				value: user.reviews.length
			},
			{
				name: 'Favorites',
				value: user.favorites.length
			},
			{
				name: 'Total amount',
				value: 1000
			}
		]
	}
}
