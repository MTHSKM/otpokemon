import { asClass, AwilixContainer } from 'awilix';
import { SyncMallService } from '../../../modules/catalog/services/SyncMallService';
import { SyncPokemonsService } from '../../../modules/catalog/services/SyncPokemonsService';
import { RegisterAttemptService } from '../../../modules/analytics/services/RegisterCatchAttempService';
import { GetBulkSuggestionService } from '../../../modules/intelligence/services/GetBulkSuggestionService';
import { GetSingleSuggestionService } from '../../../modules/intelligence/services/GetSingleSuggestionService';
import { RegisterBulkCatchAttemptService } from '../../../modules/analytics/services/RegisterBulkCatchAttemptService';

export function registerServices(container: AwilixContainer): void {
  container.register(
    'syncMallService',
    asClass(SyncMallService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'syncPokemonsService',
    asClass(SyncPokemonsService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'registerAttemptService',
    asClass(RegisterAttemptService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'getBulkSuggestionService',
    asClass(GetBulkSuggestionService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'getSingleSuggestionService',
    asClass(GetSingleSuggestionService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'registerBulkCatchAttemptService',
    asClass(RegisterBulkCatchAttemptService, { lifetime: 'SINGLETON' }),
  );
}
