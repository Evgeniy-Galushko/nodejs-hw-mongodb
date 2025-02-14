import {
  additionContact,
  allContacts,
  contactById,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const contactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await allContacts({
    req,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  contacts.data.length === 0
    ? res.json({
        status: 200,
        message: 'You have no contacts',
        data: {
          data: contacts.data,
        },
      })
    : res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: {
          data: contacts.data,
          page: contacts.page,
          perPage: contacts.perPage,
          totalItems: contacts.totalItems,
          totalPages: contacts.totalPages,
          hasPreviousPage: contacts.hasPreviousPage,
          hasNextPage: contacts.hasNextPage,
        },
      });
};

export const contactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactById(contactId, req);

  if (!contact || contact.length === 0) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const additionContactController = async (req, res) => {
  const photo = req.file;

  let photoUrl;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const contact = await additionContact(req, photoUrl);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Сontact deleted.',
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const photo = req.file;

  let photoUrl;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully upserted a contact!',
    data: result.contact,
  });
};
