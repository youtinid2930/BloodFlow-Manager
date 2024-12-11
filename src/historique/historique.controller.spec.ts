import { Test, TestingModule } from '@nestjs/testing';
import { HistoriqueController } from './historique.controller';
import { HistoriqueService } from './historique.service';
<<<<<<< HEAD
=======
import { MongooseModule } from '@nestjs/mongoose';
import { Historique, HistoriqueSchema } from './schemas/historique.schema';

import * as dotenv from 'dotenv';

dotenv.config();
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18

describe('HistoriqueController', () => {
  let controller: HistoriqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriqueController],
      providers: [HistoriqueService],
<<<<<<< HEAD
=======
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI!), 
        MongooseModule.forFeature([{ name: Historique.name, schema: HistoriqueSchema }]),

      ],
       



>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
    }).compile();

    controller = module.get<HistoriqueController>(HistoriqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
