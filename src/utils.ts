import contacts from './assets/contacts.json';

export const convertPlaceHolderByPhoneNum = (content: string, phone: string) => {
  const selectedContact = contacts.find((c) => c.phone === phone);
  return content
    .replaceAll('[first_name]', selectedContact?.first_name || '')
    .replaceAll('[last_name]', selectedContact?.last_name || '')
    .replaceAll('[city]', selectedContact?.city || '')
    .replaceAll('[phone]', selectedContact?.phone || '');
};

export const availableTags = ['[first_name]', '[last_name]', '[phone]', '[city]'] as const;
