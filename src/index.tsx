import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-whatsapp-contacts-manager' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const WhatsappContactsManager = NativeModules.WhatsappContactsManager
  ? NativeModules.WhatsappContactsManager
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function getAll(): Promise<any> {
  return WhatsappContactsManager.getAll();
}

export interface EmailAddress {
  label: string;
  email: string;
}

export interface PhoneNumber {
  id: string;
  label: string;
  number: string;
}

export interface PostalAddress {
  label: string;
  formattedAddress: string;
  street: string;
  pobox: string;
  neighborhood: string;
  city: string;
  region: string;
  state: string;
  postCode: string;
  country: string;
}

export interface InstantMessageAddress {
  username: string;
  service: string;
}

export interface Birthday {
  day: number;
  month: number;
  year: number;
}

export interface Contact {
  recordID: string;
  backTitle: string;
  company: string | null;
  emailAddresses: EmailAddress[];
  displayName: string;
  familyName: string;
  givenName: string;
  middleName: string;
  jobTitle: string;
  phoneNumbers: PhoneNumber[];
  hasThumbnail: boolean;
  thumbnailPath: string;
  postalAddresses: PostalAddress[];
  prefix: string;
  suffix: string;
  department: string;
  birthday: Birthday;
  imAddresses: InstantMessageAddress[];
  note: string;
}
