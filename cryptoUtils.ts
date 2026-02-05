
/**
 * Securely encrypts and decrypts data using a "Wrapped Key" strategy.
 * This allows multiple passwords (e.g., Master Passphrase AND Recovery Key)
 * to unlock the same data.
 */

const ITERATIONS = 100000;
const SALT_SIZE = 16;
const IV_SIZE = 12;

export interface WrappedKey {
  salt: string; // Base64
  iv: string;   // Base64
  blob: string; // Base64 (The Data Key encrypted by the Passphrase/Recovery Key)
}

export interface EncryptedVault {
  encryptedData: string; // Base64 (The actual LegacyData encrypted by the Data Key)
  dataIv: string;        // Base64
  wrappedKeys: {
    primary: WrappedKey;
    recovery?: WrappedKey;
  };
}

async function getKek(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts data with a random Data Key, then wraps that key with the provided passwords.
 */
export async function encryptVault(
  data: string, 
  primaryPass: string, 
  recoveryKey?: string
): Promise<EncryptedVault> {
  const encoder = new TextEncoder();
  
  // 1. Generate a random Data Encryption Key (DEK)
  const dek = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  const exportedDek = await crypto.subtle.exportKey('raw', dek);

  // 2. Encrypt the actual data with the DEK
  const dataIv = crypto.getRandomValues(new Uint8Array(IV_SIZE));
  const encryptedDataBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: dataIv },
    dek,
    encoder.encode(data)
  );

  // 3. Wrap the DEK with the Primary Passphrase
  const wrapPrimary = await wrapKey(exportedDek, primaryPass);

  // 4. Wrap the DEK with the Recovery Key (if provided)
  let wrapRecovery;
  if (recoveryKey) {
    wrapRecovery = await wrapKey(exportedDek, recoveryKey);
  }

  return {
    encryptedData: btoa(String.fromCharCode(...new Uint8Array(encryptedDataBuffer))),
    dataIv: btoa(String.fromCharCode(...dataIv)),
    wrappedKeys: {
      primary: wrapPrimary,
      recovery: wrapRecovery
    }
  };
}

/**
 * Decrypts a vault using either a Passphrase or a Recovery Key.
 */
export async function decryptVault(vault: EncryptedVault, secret: string): Promise<string> {
  const decoder = new TextDecoder();
  
  // Try primary key first, then recovery key
  const keysToTry = [vault.wrappedKeys.primary, vault.wrappedKeys.recovery].filter(Boolean) as WrappedKey[];
  
  let dek: CryptoKey | null = null;
  let lastError = null;

  for (const wrapped of keysToTry) {
    try {
      const salt = new Uint8Array(atob(wrapped.salt).split('').map(c => c.charCodeAt(0)));
      const iv = new Uint8Array(atob(wrapped.iv).split('').map(c => c.charCodeAt(0)));
      const blob = new Uint8Array(atob(wrapped.blob).split('').map(c => c.charCodeAt(0)));
      
      const kek = await getKek(secret, salt);
      const unwrappedDekBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        kek,
        blob
      );
      
      dek = await crypto.subtle.importKey(
        'raw',
        unwrappedDekBuffer,
        'AES-GCM',
        false,
        ['decrypt']
      );
      break; 
    } catch (e) {
      lastError = e;
    }
  }

  if (!dek) throw new Error('Invalid passphrase or recovery key');

  // Use the recovered DEK to decrypt the actual data
  const dataIv = new Uint8Array(atob(vault.dataIv).split('').map(c => c.charCodeAt(0)));
  const encryptedData = new Uint8Array(atob(vault.encryptedData).split('').map(c => c.charCodeAt(0)));
  
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: dataIv },
    dek,
    encryptedData
  );

  return decoder.decode(decryptedBuffer);
}

async function wrapKey(rawKey: ArrayBuffer, password: string): Promise<WrappedKey> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_SIZE));
  const iv = crypto.getRandomValues(new Uint8Array(IV_SIZE));
  const kek = await getKek(password, salt);
  
  const wrappedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    kek,
    rawKey
  );

  return {
    salt: btoa(String.fromCharCode(...salt)),
    iv: btoa(String.fromCharCode(...iv)),
    blob: btoa(String.fromCharCode(...new Uint8Array(wrappedBuffer)))
  };
}

export function generateRecoveryKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars
  let key = '';
  for (let i = 0; i < 20; i++) {
    if (i > 0 && i % 5 === 0) key += '-';
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}
