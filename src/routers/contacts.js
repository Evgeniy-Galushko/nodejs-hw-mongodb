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

const router = Router();

router.get('/contacts', ctrlWrapper(contactsController));

router.get('/contacts/:contactId', ctrlWrapper(contactsByIdController));

router.post('/contacts', ctrlWrapper(additionContactController));
// Образец!: {
// "name": "Lexis",
// "phoneNumber":"889897977777",
// "email": "tyurtu@ghj.com",
// "isFavourite":"false",
// "contactType":"work"
// }

router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
