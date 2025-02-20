import { СontactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const allContacts = async ({
  req,
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = СontactsCollection.find({
    userId: req.user._id,
  });
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  const contactsCount = await СontactsCollection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return { data: contacts, ...paginationData };
};

export const contactById = async (contactId, req) => {
  const contact = await СontactsCollection.findOne({
    userId: req.user._id,
    _id: contactId,
  });
  return contact;
};

export const additionContact = async (payload, url) => {
  const contact = await СontactsCollection.create({
    ...payload.body,
    userId: payload.user._id,
    photo: url,
  });
  return contact;
};

export const deleteContact = async (contactId, req) => {
  const contact = await СontactsCollection.findOneAndDelete({
    userId: req.user._id,
    _id: contactId,
  });
  return contact;
};

export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const updatedСontact = await СontactsCollection.findOneAndUpdate(
    { userId, _id: contactId },
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
