'use strict'

const Joi = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
const question = require('./controllers/question')

module.exports = [
  {
    method: 'GET',
    path: '/',
    options:{
      cache: {
        expiresIn: 1000 * 30,
        privacy: 'private'
      }
    },
    handler: site.home
  },
  {
    method: 'GET',
    path: '/register',
    handler: site.register
  },
  {
    path: '/create-user',
    handler: user.createUser,
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }),
        failAction: user.failValidation
      }
    }
  },
  {
    method: 'GET',
    path: '/login',
    handler: site.login
  },
  {
    method: 'GET',
    path: '/question/{id}',
    handler: site.viewQuestion
  },
  {
    method: 'GET',
    path: '/logout',
    handler: user.logout
  },
  {
    method: 'GET',
    path: '/ask',
    handler: site.ask
  },
  {
    path: '/validate-user',
    handler: user.validateUser,
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }),
        failAction: user.failValidation
      }
    }
  },
  {
    path: '/create-question',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
          image: Joi.any().optional()
        }),
        failAction: user.failValidation
      }
    },
    handler: question.createQuestion
  },
  {
    path: '/answer-question',
    handler: question.answerQuestion,
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          answer: Joi.string().required(),
          id: Joi.string().required()
        }),
        failAction: user.failValidation
      }
    }
  },
  {
    method: 'GET',
    path: '/answer/{questionId}/{answerId}',
    handler: question.setAnswerRight
  },
  {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  },
  {
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler: site.notFound
  }
]
