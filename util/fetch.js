export default async function fetcher(url) { 
    console.log(url)
    const r = await fetch(url);
    // console.log(r)
    return await r.json(); 
}
