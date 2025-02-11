const Sentence = require("../models/sentence");

module.exports.getSentences = (req, res) => {
  const userId = req.user.id; // Certifique-se de que o middleware de autenticação adiciona `user` ao `req`

  Sentence.find({ owner: userId }) // Filtrar sentenças pelo campo `owner`
    .then((sentences) => {
      res.send({
        data: sentences,
      });
    })
    .catch((err) =>
      res.status(500).send({ message: "Houve um erro no servidor" })
    );
};


module.exports.getSentence = (req, res) => {
  console.log(req.params.id)
  Sentence.findById(req.params.id)
    .then((sentence) => res.send({ data: sentence }))
    .catch((err) =>
      res.status(404).send({ message: "Essa frase não existe no seu servidor" })
    );
}

module.exports.createSentence = (req, res) => {
  const { content, owner } = req.body;

  if (!content || !owner) {
    return res.status(400).send({ message: "Dados inválidos" });
  }

  Sentence.create({ content, owner })
    .then((sentence) => res.send({ data: sentence }))
    .catch((err) =>
      res.status(500).send({ message: "Error by creating a sentence" + err })

    );
};

module.exports.deleteSentence = (req, res) => {

  Sentence.findById(req.params.id)
    .orFail(() => {
      const error = new Error('Essa frase não foi encontrada no seu servidor para ser deletada');
      error.statusCode = 404;
      throw error;
    })
    .then(() => {
      return Sentence.findByIdAndDelete(req.params.id);
    })
    .then((deletedSentence) => {
      res.send({ data: deletedSentence });
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      const message = statusCode === 500
        ? 'Houve um erro no servidor interno'
        : err.message;

      res.status(statusCode).send({ message });
    });
};

module.exports.updateSentence = (req, res) => {
  console.log(req.params.id)
  Sentence.findByIdAndUpdate(
    req.params.id,
    {content: req.body.content},
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  )
  .orFail(()=>{
    const error = new Error('Essa frase não existe no seu servidor para ser atualizada');
    error.statusCode = 404;
    throw error;
  })
  .then(sentence => res.send({ data: sentence }))
  .catch(err =>  {
   const statusCode = err.statusCode || 500;
   const message = statusCode === 500
     ? 'Houve um erro no servidor interno'
     : err.message;

   res.status(statusCode).send({ message });
 });
}
