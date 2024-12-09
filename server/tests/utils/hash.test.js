import bcrypt from 'bcrypt';
import { expect } from 'chai';

describe('Password Hashing', () => {
  it('should hash a password correctly', async () => {
    const password = 'MySecurePassword';
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // checking the test is to validate the behavior of the hashing mechanism (bcrypt.hash and bcrypt.compare).
    // Check that hashed password is not the same as the plain password
    expect(hashedPassword).to.not.equal(password);
    expect(hashedPassword).to.be.a('string');
  });

  it('should match the password with the hash', async () => {
    const password = 'MySecurePassword123';
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const isMatch = await bcrypt.compare(password, hashedPassword);

    expect(isMatch).to.be.true;
  });
});
