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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(contactsController));

router.get('/:contactId', isValidId, ctrlWrapper(contactsByIdController));

router.post(
  '/',
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
  '/:contactId',
  isValidId,
  validateBody(validationContactShema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(validationUpdateContactShema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
