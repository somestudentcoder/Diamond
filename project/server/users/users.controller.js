const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const resultService = require('./result.service');

// routes
router.post('/authenticate', authenticate);
router.post('/adminregister', adminregister);
router.post('/register', register);
router.post('/test/add', addTest);
router.post('/test/get', getTest);
router.post('/test/password', testPassword);
router.post('/test/passwordrequired', passwordRequired);
router.post('/test/edit', editTest);
router.post('/test/delete', deleteTest);
router.post('/test/getbyuserid', getAllTests);
router.post('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/:id', _delete);
router.post('/results/add', saveResults);
router.post('/results/feedback', saveFeedback);
router.post('/results/:id', getResultsById);
router.post('/result/delete', deleteIndividualResult);

module.exports = router;

function getResultsById(req, res, next) {
    userService.getResultsById(req.params.id)
        .then(results => results ? res.json(results) : res.sendStatus(404))
        .catch(err => next(err));
}

function saveResults(req, res, next) {
    userService.saveResults(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function saveFeedback(req, res, next) {
    userService.saveFeedback(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function addTest(req, res, next) { 
    userService.addTest(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getTest(req, res, next) {
    userService.getTest(req.body.id)
        .then((test) => res.json(test[0]))
        .catch(err => next(err));
}

function passwordRequired(req, res, next) {
    userService.passwordRequired(req.body.id)
        .then(bool => res.json(bool))
        .catch(err => next(err));
}

function testPassword(req, res, next) {
    userService.testPassword(req.body)
        .then((test) => res.json(test))
        .catch(err => next(err));
}

function editTest(req, res, next) {
    userService.editTest(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteTest(req, res, next) {
    userService.deleteTest(req.body.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteIndividualResult(req, res, next) {
    userService.deleteIndividualResult(req.body.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllTests(req, res, next) {
    userService.getAllTests(req.body)
        .then((tests) => res.json(tests))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function adminregister(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.body.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}