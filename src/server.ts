import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get("/filteredImage", async (req, res) => {
    const image_url = req.query.image_url.toString();
    if (!image_url) {
      res.status(400).send('image url not found')
    }
    const filtered_image = await filterImageFromURL(image_url)
    res.status(200).sendFile(filtered_image, () => {
      deleteLocalFiles([filtered_image])
    })
  })

  /**************************************************************************** */
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    // const url = 'https://media.istockphoto.com/photos/nairobi-cityscape-capital-city-of-kenya-picture-id637912692?k=20&m=637912692&s=612x612&w=0&h=uHa90J-jGXws6mo7yeOKLI-ta_RYGErtbsqhtPVxBHk='
    res.send("try GET /filteredImage?image_url={{}}")
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
