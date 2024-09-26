const express = require('express');
const router = express.Router();
const empruntController = require('../controllers/empruntController');

/**
 * @swagger
 * /api/emprunts/create:
 *   post:
 *     summary: Create a new Emprunt (borrow a Jutsu Scroll)
 *     tags:
 *       - Emprunt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ninjaId:
 *                 type: string
 *                 description: The ID of the Ninja borrowing the Jutsu Scroll
 *               jutsuScrollId:
 *                 type: string
 *                 description: The ID of the Jutsu Scroll being borrowed
 *               dateRetourPrévue:
 *                 type: string
 *                 format: date
 *                 description: Expected return date for the Jutsu Scroll
 *     responses:
 *       201:
 *         description: Emprunt created successfully
 *       400:
 *         description: Bad request, validation error or Jutsu Scroll already borrowed
 */
router.post('/create', empruntController.createEmprunt);

/**
 * @swagger
 * /api/emprunts:
 *   get:
 *     summary: Get all Emprunts (borrow records)
 *     tags:
 *       - Emprunt
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
 *     responses:
 *       200:
 *         description: List of Emprunts
 */
router.get('/', empruntController.getAllEmprunts);

/**
 * @swagger
 * /api/emprunts/return/{id}:
 *   put:
 *     summary: Return a Jutsu Scroll (update an Emprunt's status)
 *     tags:
 *       - Emprunt
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Emprunt to update (return the Jutsu Scroll)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jutsu Scroll returned successfully
 *       404:
 *         description: Emprunt not found
 */
router.put('/return/:id', empruntController.returnEmprunt);

module.exports = router;
