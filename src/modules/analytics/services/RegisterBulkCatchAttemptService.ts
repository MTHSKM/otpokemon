import { RegisterAttemptService } from './RegisterCatchAttempService';

interface IRequest {
  pokemon_slug: string;
  pokeball_slug: string;
  throws: number;
  catches: number;
}

export class RegisterBulkCatchAttemptService {
  constructor(private registerAttemptService: RegisterAttemptService) {}

  async execute(requests: IRequest[]): Promise<void> {
    await Promise.all(
      requests.map(request => this.registerAttemptService.execute(request)),
    );
  }
}
