import { AuthRefreshGuard } from './auth-refresh.guard';

describe('AuthRefreshGuard', () => {
  it('should be defined', () => {
    expect(new AuthRefreshGuard()).toBeDefined();
  });
});
