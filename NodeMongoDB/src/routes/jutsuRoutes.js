const express = require('express');
const router = express.Router();
const jutsuController = require('../controllers/jutsuController');

/**
 * @swagger
 * /api/jutsus/create:
 *   post:
 *     summary: Create a new Jutsu Scroll
 *     tags:
 *       - JutsuScroll
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Name of the Jutsu Scroll
 *               createur:
 *                 type: string
 *                 description: Creator of the Jutsu Scroll
 *               rang:
 *                 type: string
 *                 enum: [S, A, B, C, D]
 *                 description: Rank of the Jutsu Scroll
 *               description:
 *                 type: string
 *                 description: Description of the Jutsu Scroll
 *               quantite:
 *                 type: number
 *                 description: Quantity of the Jutsu Scrolls
 *               categorie:
 *                 type: string
 *                 description: Category of the Jutsu Scroll
 *               techniques_associees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Associated techniques of the Jutsu Scroll
 *     responses:
 *       201:
 *         description: Jutsu Scroll created successfully
 *       400:
 *         description: Bad request, validation error
 */
router.post('/create', jutsuController.createJutsu);

/**
 * @swagger
 * /api/jutsus:
 *   get:
 *     summary: Get all Jutsu Scrolls
 *     tags:
 *       - JutsuScroll
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
 *       - name: categorie
 *         in: query
 *         description: Filter by category of Jutsu Scroll
 *         schema:
 *           type: string
 *       - name: rang
 *         in: query
 *         description: Filter by rank of Jutsu Scroll
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Jutsu Scrolls
 */
router.get('/', jutsuController.getAllJutsus);

/**
 * @swagger
 * /api/jutsus/{id}:
 *   get:
 *     summary: Get a Jutsu Scroll by ID
 *     tags:
 *       - JutsuScroll
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Jutsu Scroll to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single Jutsu Scroll
 *       404:
 *         description: Jutsu Scroll not found
 */
router.get('/:id', jutsuController.getJutsuById);

/**
 * @swagger
 * /api/jutsus/{id}:
 *   put:
 *     summary: Update a Jutsu Scroll by ID
 *     tags:
 *       - JutsuScroll
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Jutsu Scroll to update
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
 *               createur:
 *                 type: string
 *               rang:
 *                 type: string
 *               description:
 *                 type: string
 *               quantite:
 *                 type: number
 *               categorie:
 *                 type: string
 *               techniques_associees:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Jutsu Scroll updated successfully
 *       404:
 *         description: Jutsu Scroll not found
 */
router.put('/:id', jutsuController.updateJutsu);

/**
 * @swagger
 * /api/jutsus/{id}:
 *   delete:
 *     summary: Delete a Jutsu Scroll by ID
 *     tags:
 *       - JutsuScroll
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Jutsu Scroll to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jutsu Scroll deleted successfully
 *       404:
 *         description: Jutsu Scroll not found
 */
router.delete('/:id', jutsuController.deleteJutsu);

module.exports = router;
