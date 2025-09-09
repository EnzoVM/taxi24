import { IsInt, IsPositive, IsNumber, IsIn } from 'class-validator';
import { CURRENCIES } from '../../../shared/constants/app.constants';

export class CreateInvoiceDto {
  @IsInt()
  @IsPositive()
  tripId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @IsIn(CURRENCIES, {
    message: `Currency must be one of: ${CURRENCIES.join(', ')}`,
  })
  currency: string;
}
