import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { Response } from 'express'; // Import Response from express
import { HistoriqueService } from './historique.service';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';
import { Historique } from './schemas/historique.schema';
import * as fs from 'fs';

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
    return this.historiqueService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoriqueDto: UpdateHistoriqueDto) {
    return this.historiqueService.update(id, updateHistoriqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiqueService.remove(id);
  }

  @Get('recent')
  async getRecentHistory(@Query('nbre') nbre: number): Promise<Historique[]> {
    const limit = Number(nbre) || 10; // Default value is 10 if 'nbre' is not specified
    return this.historiqueService.getRecentHistory(limit);
  }

  @Get('export-csv')
  async exportHistoryAsCSV(@Res() res: Response): Promise<void> {
    try {
      const csvData = await this.historiqueService.exportHistoryAsCSV();

      // File name to generate
      const fileName = 'Data_Historique.csv';

      // Check if the file already exists
      if (fs.existsSync(fileName)) {
        res.download(fileName, fileName, (err) => {
          if (err) {
            throw err;
          }
        });
      } else {
        // If the file doesn't exist, return CSV data directly
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.send(csvData);
      }
    } catch (error: unknown) {
      // Type assertion or type checking for error
      if (error instanceof Error) {
        res.status(500).send({
          message: 'Failed to export historique data',
          error: error.message,
        });
      } else {
        // Fallback for cases where error is not an instance of Error
        res.status(500).send({
          message: 'Failed to export historique data',
          error: 'An unknown error occurred.',
        });
      }
    }
  }
}
