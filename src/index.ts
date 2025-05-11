// Project: URL Shortener API
import express from 'express';
import validUrl from "valid-url";
import shortid from "shortid";
import 'dotenv/config';
import { UrlModel } from './Models/UrlModel';
import { UrlHelper } from './Helpers/UrlHelper';
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3001;


app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.post("/url",(req,res)=>{
    const {url} = req.body;
    try{
      if(validUrl.isUri(url))
        {
            const newId = shortid.generate();
            const newURL = `${process.env.BASE_URL}/${newId}`;
            const urlModel = new UrlModel();
            urlModel.originalUrl = url;
            urlModel.shortenedurl = newURL;
            const urlHelper = new UrlHelper();
            urlHelper.addUrl(urlModel);
            res.status(200).json({
              data: {
                urlModel: urlModel
              }
            });
        }else{
          res.status(204).json({
            error: "Wrong URI"
          })
        }
    }catch(error: any){
      console.error(error);
      res.status(400).json({
        error: error
      })
    }
})

app.get("/:shortcode", (req, res) => {
  const { shortcode } = req.params;
  try {
    const urlHelper = new UrlHelper();
    urlHelper.getUrl(shortcode)
    .then((result)=>{
      console.log(result);
      if(!result){
        res.send("done");
        return;
      }
      res.redirect(result);
    })
  } catch (error: any) {
    console.error(error);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});