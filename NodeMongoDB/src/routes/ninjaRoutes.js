const express = require('express');
const router = express.Router();
const ninjaController = require('../controllers/ninjaController');

/**
 * @swagger
 * /api/ninjas/create:
 *   post:
 *     summary: Create a new Ninja
 *     tags:
 *       - Ninja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Name of the Ninja
 *               rang:
 *                 type: string
 *                 enum: [Genin, Chunin, Jonin]
 *                 description: Rank of the Ninja
 *               clan:
 *                 type: string
 *                 description: The clan of the Ninja
 *               specialite:
 *                 type: string
 *                 description: The specialty of the Ninja
 *               jutsus_maîtrisés:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of mastered jutsu scroll IDs
 *     responses:
 *       201:
 *         description: Ninja created successfully
 *       400:
 *         description: Bad request, validation error
 */
router.post('/create', ninjaController.createNinja);

/**
 * @swagger
 * /api/ninjas:
 *   get:
 *     summary: Get all Ninjas
 *     tags:
 *       - Ninja
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of results per page
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: rang
 *         in: query
 *         description: Filter by rank of the Ninja (Genin, Chunin, Jonin)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Ninjas
 */
router.get('/', ninjaController.getAllNinjas);

/**
 * @swagger
 * /api/ninjas/{id}:
 *   get:
 *     summary: Get a Ninja by ID
 *     tags:
 *       - Ninja
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Ninja to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single Ninja
 *       404:
 *         description: Ninja not found
 */
router.get('/:id', ninjaController.getNinjaById);

/**
 * @swagger
 * /api/ninjas/{id}:
 *   put:
 *     summary: Update a Ninja by ID
 *     tags:
 *       - Ninja
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Ninja to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               rang:
 *                 type: string
 *                 enum: [Genin, Chunin, Jonin]
 *               clan:
 *                 type: string
 *               specialite:
 *                 type: string
 *               jutsus_maîtrisés:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Ninja updated successfully
 *       404:
 *         description: Ninja not found
 */
router.put('/:id', ninjaController.updateNinja);

/**
 * @swagger
 * /api/ninjas/{id}:
 *   delete:
 *     summary: Delete a Ninja by ID
 *     tags:
 *       - Ninja
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Ninja to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ninja deleted successfully
 *       404:
 *         description: Ninja not found
 */
router.delete('/:id', ninjaController.deleteNinja);

module.exports = router;
