import { User } from '../model/user.js';
import bcrypt from 'bcryptjs';

export async function signUp(req, res) {
  const { email, password } = req.body;
  if (!email || !password) res.send('No Email or Password provided');

  const userExist = await User.find({ email: { $eq: email } });
  if (userExist.length) res.send('User with email already exists');
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = new User({ email, password: hashedPassword });
  const newUser = await userData.save();
  res.json(newUser);
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) res.send('No Email or Password provided');

  const user = await User.findOne({ email: { $eq: email } });
  if (!user) res.send(`Couldn't find user with provided email.`);
  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) res.send(`Password didn't match`);
  res.json({ success: true });
}
