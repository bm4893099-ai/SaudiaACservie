import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const readEnvFile = () => {
  const envPath = join(process.cwd(), '.env');

  if (!existsSync(envPath)) {
    return {} as Record<string, string>;
  }

  return readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .reduce<Record<string, string>>((accumulator, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return accumulator;
      }

      const separatorIndex = trimmedLine.indexOf('=');

      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();

      if (key) {
        accumulator[key] = value;
      }

      return accumulator;
    }, {});
};

const envFileValues = readEnvFile();

export const databaseUri = process.env.MONGODB_URI || envFileValues.MONGODB_URI || '';
export const databaseEnabled = Boolean(databaseUri);
