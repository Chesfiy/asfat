'use strict'

const dotenv = require('dotenv');
const assert = require('assert');
const { accessSync } = require('fs');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    EMAIL,
    EMAIL_PASS,
    EMAIL_SMTP,
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    email: EMAIL,
    email_pass:EMAIL_PASS,
    email_smtp: EMAIL_SMTP,
}