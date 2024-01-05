import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
	try {
		await db.user.upsert({
			where: { id: 1 },
			update: {},
			create: {
				id: 1,
				email: process.env.ADMIN_EMAIL ?? 'admin@localhost',
				admin: true,
			},
		});
	} catch (err) {
		console.log('Error seeding database:', err);
	} finally {
		await db.$disconnect();
	}
}

main();
