import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksRepository } from './tasks/tasks.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository]),
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    // connect to the DB
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
        }
      },
    }),
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})

export class AppModule {
}
