import { Controller, UseGuards, Post, UsePipes, Request } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';
import { signInSchema } from './schemas/signInSchema';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authSerivce: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(signInSchema))
  async login(@Request() req) {
    return this.authSerivce.login(req.user);
  }
}
