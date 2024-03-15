// User registration
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({ name, email, password });
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      const savedUser = await user.save();
  
      // Generate JWT token
      const payload = {
        user: {
          id: savedUser.id
        }
      };
      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  