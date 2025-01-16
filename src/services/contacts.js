import { СontactsCollection } from '../db/models/contact.js';

export const allContacts = async () => {
  const contacts = await СontactsCollection.find();
  return contacts;
};

export const contactById = async (contactId) => {
  try {
    const contact = await СontactsCollection.findById(contactId);
    return contact;
  } catch (error) {
    console.error(error);
  }
};

export const additionContact = async (payload) => {
  const contact = await СontactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  try {
    const contact = await СontactsCollection.findOneAndDelete({
      _id: contactId,
    });
    return contact;
  } catch (error) {
    console.error(error);
  }
};

export const updateContact = async (contactId, payload, options = {}) => {
  const updatedСontact = await СontactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!updatedСontact || !updatedСontact.value) return null;

  return {
    contact: updatedСontact.value,
    isNew: Boolean(updatedСontact?.lastErrorObject.upserted),
  };
};
