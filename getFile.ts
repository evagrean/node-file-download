import https from "https";
import fs from "fs-extra";

const feedUrl = ""; // get from separate source
//const testUrl = "https://filesamples.com/samples/document/txt/sample3.txt";

const storageDir = "downloads";

const getReportViaFeedUrl = async (storageDir: string, feedUrl: string) => {
  console.log("about to start getting data from feed");

  try {
    https.get(feedUrl, (response) => {
      console.log("status code: ", response.statusCode);
      console.dir(response.headers, { depth: null });
      const fileInfo = response.headers["content-disposition"];
      const fileNameRaw = fileInfo.split("=")[1];
      const fileName = fileNameRaw.substring(1, fileNameRaw.length - 2);

      // const fileName = `sample${Math.random()}.txt`;
      const fileStream = fs.createWriteStream(`${storageDir}/${fileName}`);
      response.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close();
        console.log("done");
      });
    });
  } catch (error) {
    console.log("Error from https module: " + error);
  }
};

getReportViaFeedUrl(storageDir, feedUrl);
