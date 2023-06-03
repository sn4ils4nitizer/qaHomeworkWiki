import { Google } from "./2.8.2googleWBP";
const google = new Google();

const fs = require("fs");

test("search for my favorite warhammer 40k army", async ()=> {
    await google.navigate();
    await google.search("Wordbearers");
    let text = await google.getResults();
    expect(text).toContain("Word Bearers");

    fs.writeFile(`${__dirname}/test.txt`, text, (e) => {
        if(e) console.log(e);
        else console.log("Save Succesful");
    });
});