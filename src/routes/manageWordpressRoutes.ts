import { Router } from 'express';
import { handleAction } from '../controllers/manageWordpressController';

const router = Router();

// @TODO
// - create-site
// - disable-site
// - scan-site
// - check-failed-plugin-updates
// - get-plugins-installed
//   - active 
//   - inactive
//   - paid
// - 
router.post('/handle-action', handleAction);

export default router;
