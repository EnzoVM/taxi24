import { IsIn, IsNumber, IsPositive } from 'class-validator';
import { CURRENCIES } from '../../../shared/constants/app.constants';

export class CreateInvoiceDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @IsIn(CURRENCIES, {
    message: `Currency must be one of: ${CURRENCIES.join(', ')}`,
  })
  currency: string;
}
