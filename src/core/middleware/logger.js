import { createLogger } from 'redux-logger';

const logger = createLogger({
  duration:  true,
  timestamp: true,
  collapsed: true,
  diff:      true,
});

export default logger;
