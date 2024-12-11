import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';

<<<<<<< HEAD
=======

>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
@Controller('historique')
export class HistoriqueController {
  constructor(private readonly historiqueService: HistoriqueService) {}

  @Post()
  create(@Body() createHistoriqueDto: CreateHistoriqueDto) {
    return this.historiqueService.create(createHistoriqueDto);
  }

  @Get()
  findAll() {
    return this.historiqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
<<<<<<< HEAD
    return this.historiqueService.findOne(+id);
=======
    return this.historiqueService.findOne(id);
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoriqueDto: UpdateHistoriqueDto) {
<<<<<<< HEAD
    return this.historiqueService.update(+id, updateHistoriqueDto);
=======
    return this.historiqueService.update(id, updateHistoriqueDto);
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
<<<<<<< HEAD
    return this.historiqueService.remove(+id);
=======
    return this.historiqueService.remove(id);
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }
}
