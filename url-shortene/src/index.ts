// Project: URL Shortener API
import express from 'express';
import validUrl from "valid-url";
import shortid from "shortid";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('URL Shortener API');
});

app.post("/url",(req,res)=>{
    const {url} = req.body;
    if(validUrl.isUri(url))
    {
        const newId = shortid.generate();
        res.send(`Right uri ${newId}`);
    }
    else
    {
        res.send(`Not right`);
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});