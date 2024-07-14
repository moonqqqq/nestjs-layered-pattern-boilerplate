import { Module } from '@nestjs/common';
import { StickerService } from './sticker.service';
import { StickerController } from './sticker.controller';
import { StickerRepository } from './sticker.repository';

@Module({
  controllers: [StickerController],
  providers: [StickerService, StickerRepository],
})
export class StickerModule {}
