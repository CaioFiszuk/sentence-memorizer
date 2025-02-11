const router = require('express').Router();
const auth = require('../middleware/auth');
const { createSentence, getSentences, getSentence, deleteSentence, updateSentence, getSentenceByUser } = require('../controllers/sentences');

router.post('/', auth, createSentence);
router.get('/', auth, getSentences);
router.get('/:id', getSentence);
//router.get('/sentences/me', getSentenceByUser);
router.delete('/:id', deleteSentence);
router.patch('/:id', updateSentence);

module.exports = router;
