const corsConfig = {
  development: {
    origin: [`http://localhost:${process.env.FRONTEND_PORT}`],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
  },
  production: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
  }
};

const morganConfig = {
  development: 'dev',
  production: 'combined'
};

const expressConfig = {
  urlencoded: { extended: true },
  json: {}
}

const jwtConfig = {
  secret: process.env.JWT_SECRET,
  access: {
    expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES) / 1000,
    cookie: {
      name: 'accessToken',
      maxAge: parseInt(process.env.JWT_ACCESS_EXPIRES),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    }
  },
  refresh: {
    expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES) / 1000,
    cookie: {
      name: 'refreshToken',
      maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    }
  }
}

const config = {
  cors: corsConfig[process.env.NODE_ENV || 'development'],
  morgan: morganConfig[process.env.NODE_ENV || 'development'],
  express: expressConfig,
  jwt: jwtConfig
};

module.exports = config;
