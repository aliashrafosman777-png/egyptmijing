import bcrypt from 'bcryptjs';

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Provide a password containing at least 10 characters.');
  process.exit(1);
}
console.log(await bcrypt.hash(password, 12));
