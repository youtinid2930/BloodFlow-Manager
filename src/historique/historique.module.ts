import { Historique ,HistoriqueSchema } from './schemas/historique.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { HistoriqueController } from './historique.controller';


@Module({
<<<<<<< HEAD
  imports:[MongooseModule.forFeature([{name: Historique.name, schema:HistoriqueSchema}])],
=======
  imports:[MongooseModule.forFeature([{name: Historique.name, schema:HistoriqueSchema}]), Historique],
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  controllers: [HistoriqueController],
  providers: [HistoriqueService],
})
export class HistoriqueModule {}
