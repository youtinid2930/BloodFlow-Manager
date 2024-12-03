import { Test, TestingModule } from '@nestjs/testing';
import { HistoriqueController } from './historique.controller';
import { HistoriqueService } from './historique.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Historique, HistoriqueSchema } from './schemas/historique.schema';

describe('HistoriqueController', () => {
  let controller: HistoriqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriqueController],
      providers: [HistoriqueService],
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'), 
        MongooseModule.forFeature([{ name: Historique.name, schema: HistoriqueSchema }]),

      ],
       



    }).compile();

    controller = module.get<HistoriqueController>(HistoriqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
