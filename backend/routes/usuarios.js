const express = require('express');
const router = express.Router();

// Importar controladores
const readUsers = require('../controllers/readUser');
const readUserById = require('../controllers/readUserById');
const createUser = require('../controllers/createUser');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');

// Asignar rutas a los controladores
router.get('/', readUsers);
router.get('/:id', readUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
