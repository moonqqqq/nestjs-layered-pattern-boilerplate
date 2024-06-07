import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { IUploadService } from './interfaces/upload-service.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileResDTO } from './dtos/upload-file-res.dto';

import { FileUploadDTO } from './dtos/upload-file-req.dto';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { BODY_INPUT_TYPE } from '../../common/constants/swagger';
import { ApiCreatedDataWrapResponse } from '../../nestjs-utils/decorators/custom-api-res/created/api-created-res.decorator';
import { FileSizeValidationPipe } from '../../nestjs-utils/pipe/file-size-validation.pipe';
import ResWrapper from '../../custom-utils/res-wrapper/res-wrapper.static';

@ApiTags(`${API_ENDPOINT.UPLOAD}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.UPLOAD}`)
export class UploadController {
  constructor(private readonly uploadService: IUploadService) {}

  @Post('certificate/image')
  @ApiConsumes(BODY_INPUT_TYPE.MULTIPART_FORMDATA)
  @ApiBody({
    description: 'A image cretificate file',
    type: FileUploadDTO,
  })
  @ApiCreatedDataWrapResponse(UploadFileResDTO)
  @UsePipes(new FileSizeValidationPipe(3))
  @UseInterceptors(FileInterceptor('file'))
  // :TODO set the rate limit
  async uploadCertificateImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.uploadFile(file);

    return ResWrapper.single(result);
  }

  @Post('proof')
  @ApiConsumes(BODY_INPUT_TYPE.MULTIPART_FORMDATA)
  @ApiBody({
    description: 'A proof file',
    type: FileUploadDTO,
  })
  @ApiCreatedDataWrapResponse(UploadFileResDTO)
  @UsePipes(new FileSizeValidationPipe(3))
  @UseInterceptors(FileInterceptor('file'))
  // :TODO set the rate limit
  async uploadProof(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.uploadFile(file);

    return ResWrapper.single(result);
  }
}
