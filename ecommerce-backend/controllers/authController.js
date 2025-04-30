exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;
    console.log('authController Registering user:', { name, email, password });
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Fake user creation for testing
    const user = {
      _id: 'mock123',
      name,
      email,
      token: 'fake-jwt-token-abc123'
    };
  
    res.status(201).json(user);
  };
  
  exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    console.log('authController Login user:', { email, password });
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    // Fake login (no validation for demo)
    const user = {
      _id: 'mock123',
      name: 'MockUser',
      email,
      token: 'fake-jwt-token-abc123'
    };
  
    res.status(200).json(user);
  };

  exports.checkState = (req, res) => {
    console.log('authController Check state ok');
    
    res.status(200).json({ message: 'Auth controller service is running' });;
  };
  