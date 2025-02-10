import type { PersistenceKey } from '@/shared/models/PersistenceKey.ts'

class PersistenceService {
  getItem<T>(key: PersistenceKey, defaultValue: T | null = null): T | null {
    const rawValue: unknown = localStorage.getItem(key);
    if (!rawValue) {
      return defaultValue;
    }
    return <T>rawValue;
  }

  setItem(key: PersistenceKey, value: any) {
    if (value != null) {
      localStorage.setItem(key, value as string);
    } else {
      localStorage.removeItem(key);
    }
  }
}

const persistenceService = new PersistenceService();
export default persistenceService;
