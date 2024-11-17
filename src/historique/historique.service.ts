import { Injectable } from '@nestjs/common';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';

@Injectable()
export class HistoriqueService {
  create(createHistoriqueDto: CreateHistoriqueDto) {
    return 'This action adds a new historique';
  }

  findAll() {
    return `This action returns all historique`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historique`;
  }

  update(id: number, updateHistoriqueDto: UpdateHistoriqueDto) {
    return `This action updates a #${id} historique`;
  }

  remove(id: number) {
    return `This action removes a #${id} historique`;
  }
}
