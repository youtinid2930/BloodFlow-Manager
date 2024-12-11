import { Historique ,HistoriqueSchema } from './schemas/historique.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { HistoriqueController } from './historique.controller';


@Module({
  imports:[MongooseModule.forFeature([{name: Historique.name, schema:HistoriqueSchema}]), Historique],
  controllers: [HistoriqueController],
  providers: [HistoriqueService],
})
export class HistoriqueModule {}
