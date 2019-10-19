import { configure, getLogger } from 'log4js'

import config from './config.js'

configure(config)

const logger = getLogger('console')

module.exports = logger
