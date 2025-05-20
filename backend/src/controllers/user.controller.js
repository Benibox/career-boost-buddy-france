import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';

/* GET /api/users -------------------------------------------------- */
export const getUsers = async (_req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/* GET /api/users/:id --------------------------------------------- */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/* POST /api/users ------------------------------------------------ */
export const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role = 'candidate' } = req.body;

    if (await User.findOne({ email }))
      return res.status(409).json({ message: 'Email already taken' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ firstName, lastName, email, passwordHash, role });

    res.status(201).json({
      id: user._id,
      firstName,
      lastName,
      email,
      role,
    });
  } catch (err) {
    next(err);
  }
};


/* PUT /api/users/:id --------------------------------------------- */
export const updateUser = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.firstName) updates.firstName = req.body.firstName;
    if (req.body.lastName)  updates.lastName  = req.body.lastName;
    if (req.body.email)     updates.email     = req.body.email;
    if (req.body.role)      updates.role      = req.body.role;
    if (req.body.password)  updates.passwordHash = await bcrypt.hash(req.body.password, 12);

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-passwordHash');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/users/:id ------------------------------------------ */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
