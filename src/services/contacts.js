import { СontactsCollection } from '../db/models/contact.js';

export const allContacts = async () => {
  const contacts = await СontactsCollection.find();
  return contacts;
};

export const contactById = async (contactId) => {
  const contact = await СontactsCollection.findById(contactId);
  return contact;
};
