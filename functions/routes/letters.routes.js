const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");

const db = admin.firestore();

router.post("/api/letters", async (req, res) => {
  try {
    await db
      .collection("letters")
      .doc("/" + req.body.id + "/")
      .create({
        emisor: req.body.emisor,
        receptor: req.body.receptor,
        contenido: req.body.contenido,
      });
    return res.status(204).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/api/letters/:letter_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("letters").doc(req.params.letter_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

router.get("/api/letters", async (req, res) => {
  try {
    const query = db.collection("letters");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      emisor: doc.data().emisor,
      receptor: doc.data().receptor,
      contenido: doc.data().contenido,
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/api/letters/:letter_id", async (req, res) => {
  try {
    const document = db.collection("letters").doc(req.params.letter_id);
    await document.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/api/letters/:letter_id", async (req, res) => {
  try {
    const document = db.collection("letters").doc(req.params.letter_id);
    await document.update({
      emisor: req.body.emisor,
      receptor: req.body.receptor,
      contenido: req.body.contenido,
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
