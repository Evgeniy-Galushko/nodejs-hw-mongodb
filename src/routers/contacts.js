import { Router } from 'express';
import {
  additionContactController,
  contactsByIdController,
  contactsController,
  deleteContactController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validationContactShema } from '../validation/contacts.js';
import { validationUpdateContactShema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(contactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(contactsByIdController),
);

router.post(
  '/contacts',
  validateBody(validationContactShema),
  ctrlWrapper(additionContactController),
);
// Образец!: {
// "name": "Lexis",
// "phoneNumber":"889897977777",
// "email": "tyurtu@ghj.com",
// "isFavourite":"false",
// "contactType":"work"
// }

router.put(
  '/contacts/:contactId',
  isValidId,
  validateBody(validationContactShema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(validationUpdateContactShema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
