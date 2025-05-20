import { Experience } from '../models/experience.model.js';

/* ------------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------*/
const isOwner = (req, exp) => exp.userId.toString() === req.user.id;
const isAdmin = (req)       => req.user.role === 'admin';
const isEmployer = (req)    => req.user.role === 'employer';

/* ------------------------------------------------------------------
 * GET /api/users/:uid/experiences            (liste par utilisateur)
 * GET /api/users/me/experiences              (alias dans la route)
 * ----------------------------------------------------------------*/
export const listByUser = async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const exps = await Experience
      .find({ userId })
      .sort({ startDate: -1 });
    res.json(exps);
  } catch (err) { next(err); }
};

/* ------------------------------------------------------------------
 * GET /api/experiences/:id                   (détail)
 * ----------------------------------------------------------------*/
export const getExp = async (req, res, next) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.sendStatus(404);

    /* seule la/le propriétaire ou un·e admin peut la consulter */
    if (!isOwner(req, exp) && !isAdmin(req)) return res.sendStatus(403);

    res.json(exp);
  } catch (err) { next(err); }
};

/* ------------------------------------------------------------------
 * POST /api/users/:uid/experiences           (création)
 * POST /api/users/me/experiences             (alias)
 * ----------------------------------------------------------------*/
export const createExp = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.uid) return res.sendStatus(403);

    const exp = await Experience.create({
      ...req.body,
      userId : req.user.id,
      status : 'draft',       // toujours « brouillon » à la création
    });

    res.status(201).json(exp);
  } catch (err) { next(err); }
};

/* ------------------------------------------------------------------
 * PUT /api/experiences/:id                   (mise à jour)
 * ----------------------------------------------------------------*/
export const updateExp = async (req, res, next) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.sendStatus(404);

    /* droits */
    if (!isOwner(req, exp) && !isAdmin(req)) return res.sendStatus(403);
    if (['validated', 'rejected'].includes(exp.status) && !isAdmin(req))
      return res.status(409).json({ message: 'Impossible après validation / refus.' });

    Object.assign(exp, req.body);
    await exp.save();

    res.json(exp);
  } catch (err) { next(err); }
};

/* ------------------------------------------------------------------
 * DELETE /api/experiences/:id                (suppression)
 * ----------------------------------------------------------------*/
export const deleteExp = async (req, res, next) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.sendStatus(404);
    if (!isOwner(req, exp) && !isAdmin(req)) return res.sendStatus(403);

    await exp.deleteOne();
    res.sendStatus(204);
  } catch (err) { next(err); }
};

/* ------------------------------------------------------------------
 * POST /api/experiences/:id/validate         (validation employeur)
 * ----------------------------------------------------------------*/
export const validateExp = async (req, res, next) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.sendStatus(404);
    if (!isEmployer(req) && !isAdmin(req)) return res.sendStatus(403);

    exp.status      = 'validated';
    exp.validatedBy = req.user.id;
    exp.validatedAt = new Date();
    await exp.save();

    // TODO : notifier le/la propriétaire par email

    res.json(exp);
  } catch (err) { next(err); }
};
