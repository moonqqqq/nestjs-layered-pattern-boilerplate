import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';

// :TODO add extension kinds
@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  maxMb: number;
  constructor(maxMb: number) {
    this.maxMb = maxMb;
  }

  transform(file: File) {
    if (!file) throw new BadRequestException(BadInputErrorBody.NO_FILE_PASSED);
    if (file.size > this.maxMb * 1000 * 1000)
      throw new UnprocessableEntityException({
        errorCode: BadInputErrorBody.EXCEED_MAX_SIZE.errorCode,
        message: `File is exceed max size(${this.maxMb}MB)`,
      });

    return file;
  }
}
