import get from "axios"
import cheerio from "cheerio"

// https://www.studentenwerk-dresden.de/mensen/speiseplan/

// 

export const getAllMealsToday = async (): Promise<string[]> => {
    const html = (await get("https://www.studentenwerk-dresden.de/mensen/speiseplan/")).data
    // holt den HTML code der unter request.data liegt und lässt in cheetio laden.
    const VDom = await cheerio.load(html)
    // findet alle emente die diese eigenschaft erfüllen
    const mealNodes = VDom("a.swdd-spl-image").toArray()
    // aus allen nodes wird das href attribut geholt und von /mensen/speiseplan/details-252138.html?pni=67 >> details-252151.html gekürzt
    const mealLinks = mealNodes.map(mealNode => { return VDom(mealNode).attr("href")?.split("?")[0].split("/")[3] })
    // map wie for each aber returned eben gleich array der gröse des abarbeitenden arrays
    return mealLinks.filter(x => typeof x === "string") as string[]
}

getAllMealsToday();