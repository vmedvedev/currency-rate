import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCurrencyInput {
  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
