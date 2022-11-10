import express, {Application} from 'express'
import cors from "cors";
import axios from "axios";
const collectionRunner = process.env.COLLECTION_RUNNER

const app: Application = express()
app.use(cors())
app.use(express.json())

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/run-collection/:collectionId", async (req, res) => {
  console.log("run collection");
  const collectionId = Number(req.params.collectionId);

  if (!collectionId) {
    return res.status(404).json({ error: "no collection id" });
  }

  try {
    console.log(
      "execution entering the try catch block for sending post request to collection runner"
    );
    await axios.post(`${collectionRunner}/${collectionId}`);
    res.json({ ok: true });
  } catch (e: unknown) {
    const error = e as Error;
    console.log(error.message);
    res
      .status(400)
      .json({ error: `collection runner refused with error: ${error.message}` });
  }
});

export default app
